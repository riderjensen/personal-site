---
  title: "Code Implications"
  date: "2023-11-24"
  excerpt:
    "I set a trap for myself a few months ago and only sprung it while getting this website up and running. Code we write can have implications and unintended consequences if we are not careful."
  img: "posts/half-open-laptop.jpg"
  alt: "Laptop with a half open lid. Photo by Ales Nesetril on Unsplash"
---

![Laptop with a half open lid](/images/posts/half-open-laptop.jpg)

I am not much for introductions and even though this is the first post (perhaps that holds some significance?), I don't have much content prepared though I do have a few articles in the works. Normally I would just publish the updated site with a message under the `blog` section saying "No posts available" and write one next week but I ran into an issue while trying do this which I have decided to make the subject of my first blog post.

## The issue forcing me to write this post

### Background

I originally created this entire website revamp for a project I had envisioned earlier this year, which I named "Neutral Stack," centered around DotA 2's [creep stacking mechanic](https://dota2.fandom.com/wiki/Creep_Stacking). While I'm currently working on a more detailed blog post about "Neutral Stack," I want to offer a brief background for this post. The concept behind "Neutral Stack" aimed to establish a platform empowering the community to collectively own a professional e-sports team. Contributors would receive voting power proportionate to their donation amounts, allowing each community member to use their weighted votes in influencing decisions about the team's future. Essentially, the influence level aligns with the contributed amount, similar to the role of a shareholder in a company. I am still enthusiastic about this idea, believing that the model could be broadly applied to e-sports and beyond, offering substantial support to players, fostering community engagement opportunities, and enhancing viewer investment in games.

I have had a few "business" ideas like this over the years and, I think like most developers, they usually die between 40-70% of development. Its a [well](https://www.reddit.com/r/gamedev/comments/10wvojn/how_common_is_the_issue_of_developers_abandoning/) [documented](https://www.quora.com/Is-it-normal-to-quit-projects-without-fully-completing-them-I-m-a-junior-developer-and-I-have-this-habit-of-starting-projects-and-not-fully-finishing-them-before-moving-on-Is-this-a-bad-idea) [phenomenon](https://dev.to/inspirezone/are-you-guilty-of-abandoning-your-side-projects-170f) and there is plenty of [reassurance](https://medium.com/the-tiny-wisdom/its-okay-to-leave-side-projects-unfinished-5570a06495b) and [advice](https://news.ycombinator.com/item?id=16820478) online, I don't feel the need to revisit it. Suffice to say I worked a good chunk on it, decided to table it, and now it sits in my [Github](https://github.com/riderjensen). 


However, during a recent portfolio revamp, I decided to repurpose the [Next.js frontend]((https://github.com/riderjensen/voting-nextjs)) I had originally created for the Neutral Stack project. Given that the project had essentially come to a standstill, it made sense to recycle my previous work. Having already developed numerous components and a blog section, all it took was removing the authentication and a few packages to get things back on track.


### Why would creating an empty directory break my code

The problem came near the end of the project. As part of my blog, I write markdown files in a `/posts` directory and parse them at build time to create posts on my website. By using this workflow, I can keep my work in git, there is no need for a database, and I can dynamically build my sitemap for SEO still. But I had a problem: where could I put in progress posts that I was slowly working on? Storing them locally seemed like the easiest solution without any bells and whistles and keeping them within the project kept all my related content grouped together. I decided to create a directory within my `/posts` directory that was for drafts and then by ignoring the draft directory in my `.gitignore`, I could easily move files up a directory to publish them when I was ready. You can view the source of the project on [github](https://github.com/riderjensen/personal-site) but I will include examples. 

As I mentioned before, the list of blog posts is built at build time in Next.js using the `getStaticProps` method. The function to get the posts has a section that looks like this:

```javascript
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData: PostPreview[] = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

  ...
```
After creating the `/drafts` subdirectory, this function started throwing an error: 
```
Error: EISDIR: illegal operation on a directory, read
```
I thought this was an intriguing and nebulous error, why wouldn't you be able to read the contents of a directory? Not that I wanted to read the `/drafts` subdirectory nestled inside of `/posts` but I wasn't looking recursively anyways so it shouldn't be looking in `/posts/drafts` anyways. And of course I could just move that directory outside of `/posts` and would work fine. But the error was intriguing me and I was already attached to my directory structure so I wanted to look into it. As it turned out, when I worked on this project so many months ago as "Neutral Stack", I had created a condition for a bug to appear that I had not accounted for.

```javascript
const fileNames = fs.readdirSync(postsDirectory);
```
This line utilizes [Node.js' filesystem utility](https://nodejs.org/api/fs.html#fsreaddirsyncpath-options). You pass `readdirSync` a string which is a path to a directory and that function returns an array of strings of the directory contains. The language I used in that last sentence is very important in that it returns what is in that directory, not just files. Lets say the my directory looks like this (it does):

```
/posts
-- drafts/
-- code-implications.md
```
What `fileNames` actually contains is `["drafts", "code-implications.md"]`. 
```javascript
const id = fileName.replace(/\.md$/, "");
```
After reading the directory and getting `fileNames`, I loop through the array in a `.map` operation and take each `fileName`, store it in a new variable with the markdown extension removed so I can use it as an ID later. This doesn't throw an error since the string `.replace` doesn't error if it doesn't find the condition, it simply continues which makes sense. If I have a string "Hello World" and I want to replace all the instances of the letter "S" then it is already done. From there, I create a full path for Node.js to read the file
```javascript
const fullPath = path.join(postsDirectory, file.name);
```
But wait! `/drafts` isn't a file, its a directory. So instead of 
```javascript
const fileContents = fs.readFileSync(fullPath, "utf8");
```
we can read this line as 
```javascript
const fileContents = fs.readFileSync("src/posts/drafts", "utf8");
```
Of course this would break, passing a directory path to a `readFileSync` utility would never work because it is expecting a file. But how can I differentiate between a directory and a file? Check the file name for the presence of `.md` on the end and return early? I could do that but I would have to change even more code since `.map` is expecting a return value of `PostPreview[]` and not a mixed return of both `PostPreview` and `null` or `undefined`. I could change that to a `for` loop and construct the array manually by pushing in values but thats all getting a bit too much. Thankfully, I can modify a few smaller things to make it easier on myself.

### The Solution

The first step in the solution is that the `readdirSync` has a second optional parameter that you can pass a configuration object. The configuration object has a property, set to false by default, called `withFileTypes` which changes the return type of the function altogether. Instead of an array of strings, we receive an array of what is called a [Directory Entry](https://nodejs.org/api/fs.html#class-fsdirent). There are a bunch of great utilities returned on these entries but the most important one for our case is the `isFile()` method which returns a boolean value as to whether a directory entry is a file or not. And therefore our code now becomes:

```javascript
const entries = fs.readdirSync(postsDirectory, {
    withFileTypes: true,
  });
  const allPostsData: PostPreview[] = entries
    .filter((entry) => entry.isFile())
    .map((file) => {
      // Remove ".md" from file name to get id
      const id = file.name.replace(/\.md$/, "");

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, file.name);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      ...
```
Notice the `.filter` method added before the `.map` method which calls the `isFile()` and only returns if its a true value.

I also renamed the `fileNames` array returned from `readdirSync` to simply `entries` which, after filtering, then becomes `file` in the map function since its more representative of the data it now holds. I firmly believe this is super critical, especially when you're refactoring code at a large scale or within a team. Reexamining what is in your variable when you make changes and making it true to its' name is an important step towards future bug prevention and code readability/maintainability. Perhaps in a week or a year or longer I might revisit this code for another reason; if I keep the variable name the same, the name implies that all the array contains is file names when in fact they are directory entries which infinitely more useful than just strings.

## Conclusion

The fix wasn't too difficult, but it took me a bit because of a few unrelated quirks with my development setup. Initially, I couldn't get my console logging working with Next.js, so I couldn't see what 'fileNames' contained and why it was breaking. Plus, the error message wasn't very clear from Node.js when I first read it which stalled me for a bit. But this whole issue is an example of what I like to call **code implication**, something we all do. It is not necessarily a bad thing because it can save time and it is a bit abstract, but it is worth developing an eye for.

When I wrote the original function, the code I wrote implied that the only thing I would ever store in that directory was files. And it worked like that for a long time because I only stored files in the `/posts` directory. **I implied that files would be the only thing in the directory when I used a utility that could return more than just file names without including safety checks inside my code for these other possibilities**. 

This error was part of the struggle to get the site migrated to this new format, and I'm happy to share it in my first blog post. When I finally figured out the problem, it felt like I'd set a trap for myself months and was just tripping it now which was pretty funny. It is a solid lesson in dealing with utilities and being explicit about expected return values.
