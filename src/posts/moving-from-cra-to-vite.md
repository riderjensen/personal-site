---
  title: "Migrating Create React App with Jest to Vite with Vitest"
  date: "2024-06-23"
  excerpt: "Migrating from Create React App to Vite. I identify why Vite was good for us to switch to and the process that I went through along with some snags I hit that you can avoid."
  img: "posts/cra-to-vite/cra-to-vite.png"
  alt: "Create React App icon on the left with a right arrow and the Vite logo on the right"
---

![Create React App icon on the left with a right arrow and the Vite logo on the right](/images/posts/cra-to-vite/cra-to-vite.png)
*Photo created on [Photopea](https://www.photopea.com/).*

I have an application bootstrapped with [Create React App](https://github.com/facebook/create-react-app) (CRA). CRA isn't actively maintained anymore with the most recent useful commit being in early 2022. The only warning I saw about it was on a semi-related package during an install process:

![Screenshot of console output informing users that the create-react-app project is no longer maintained](/images/posts/cra-to-vite/cra-unmaintained.png)

The CRA README.md doesn't really hint to it no longer being actively maintained and while I do think it probably still has its' uses for starter projects, I don't think its a good fit for any software you plan to maintain over a long period of time. Like the CRA team points out themselves, Create React App is a great fit for:

- Learning React in a comfortable and feature-rich development environment.
- Starting new single-page React applications.
- Creating examples with React for your libraries and components.

## Issues with CRA

### Testing

One of the main issues that got me wanting to move away from CRA to something else was how the testing was set up. You can see in the [CRA package.json](https://github.com/facebook/create-react-app/blob/main/package.json#L36) file that Jest is pinned to an older version of 27.4.3 which at the time of writing is two major versions behind the current version of [29.7](https://www.npmjs.com/package/jest?activeTab=readme). Because the version in CRA is pinned to an older version, actually trying to update it causes a series of incompatible dependency issues between `jest`, `@testing-library/jest-dom`, and `@testing-library/react`. But sticking with the pinned version had its' own challenges:

- As newer versions of Jest are released, it is harder to find answers to the edge cases I continued to run into.
- There were no longer bug patches which meant that any issues I did run into just became the default behavior moving forward.
- As I tried to keep other packages updated, for example bumping react to version 18, there were unexpected warnings in the testing outputs
- I started running into pipeline issues which forced me to run tests back-to-back and not concurrently which slowed the pipelines

### Ejecting

CRA has an option to eject from the hidden configuration it has under the hood. By running `npm run eject`, CRA will do a one time ejection from the `react-scripts` and write out all the configuration to files you can see and customize. Its actually a great idea by the CRA project, allowing people to start in a highly configured environment and move to something they can control once they find that they need the customization. But I don't actually want the customization control right now. The whole benefit of having CRA was because it handles the build process, I can spend more time writing code instead of maintaining configuration files. If I eject, I just get those configuration files. So ejecting isn't actually what I need, instead I just need another tool that can manage my application while allowing me a little bit more room to manage my environment and dependencies.

### Why Vite?

I am not going to spend a lot of time on what Vite does well, there are tons of articles out there discussing the pros and cons, I wont rehash it. But the specific reasons that Vite felt like a good replacement for CRA to me were:

- Low configuration requirements
- Fast dev server
- High popularity

Like CRA, Vite has really low configuration requirements which makes my life a lot easier. As the application continuously grows, the dev server gets slower to start up and reload with changes. With Vite, updates feel instant which is just a better dev experience overall. 

Vite is also highly popular right now. Some people balk at this idea of following trends too closely but I hold pretty firm to "use new, cutting edge tech on hobby projects and use popular tech in production". I want highly used solutions because the community support is better, the software is usually more stable which means I don't have to worry about user edge cases, and new hires have a better chance of having used it before and thus, using it well within the organization.

## The Process

Once I decided on Vite, I also made the decision to move from Jest to [Vitest](https://vitest.dev/), the Vite-native testing framework. I wanted to try Vitest because a lot of people recommended it to use along Vite. It was another low configuration option since Vitest uses the application configuration. It essentially reduces the amount of environments you have to manage and as someone who didn't even use Jest to its' fullest extent, I found the configuration difficult to setup and manage. But I will say my decision to switch to Vitest at the same time as switching to Vite was a major complicating factor in my migration so I want to make a note here: **When migrating, first move to Vite and then you can slowly piecemeal your Vitest changes from Jest.** I had thought that the migration from Jest to Vitest was going to be as easy as moving to Vite was but that was definitely not the case.

### CRA to Vite

First, I followed this [Free Code Camp](https://www.freecodecamp.org/news/how-to-migrate-from-create-react-app-to-vite/) guide to install Vite and remove the CRA react-scripts which was really easy to follow. I can't speak to the last half of the article's steps but everything before that went off without a hitch for me except for one part.

On Step 2: Create a Vite config file, within the code snippet of the configuration file, they have a comment saying "// depending on your application, base can also be "/"" referring to the `base` property in the configuration file. While the article does direct you to read more about the configuration, it never explained why you might want your `base: "/"`.

This issue manifested itself in a strange way: when my application was built and running in the cloud, it worked perfectly until you clicked a link that opened in a new tab at which point, the page would appear blank. The issue turned out to be related to that comment about setting `base: "/"`. If you don't have this configuration set, your application will try and serve all your resources from the current url.

For example, if you were on [riderjensen.com](https://riderjensen.com/), your main javascript file would try and serve from `riderjensen.com/index.js` but if you went to [riderjensen.com/about](https://riderjensen.com/about), it would try and serve it from `riderjensen.com/about/index.js`. The result is that if your first application request is to any other route other than `/`, then the main javascript file that loads everything and is mentioned in your application index.html will 404. That means your router, auth, everything doesn't work and instead your application just looks like a blank HTML page.

### Jest to Vitest

Originally I thought to Vitest from Jest would go smoothly because Vitest is "Jest Compatible". For reference, I was on `jest@27.4.3` and moved to `vitest@1.6.0`. In my hubris, I thought maybe a simple find and replace `jest.fn()` to `v.fn()` would do the trick; and while that did get me a good chunk of the way there, the biggest issue was that my tests would pass on my local environment with some warnings but my pipeline would fail. Here are a few of the big issues I saw:


#### Remove destructuring and using findBy

I had written my old tests like this

```javascript
import { render } from "@testing-library/react";


it("renders <Component /> without crashing", () => {
  const { getByText } = render(<Component />);

  expect(getByText("Hello World")).toBeInTheDocument();
});
```
This isn't the recommended way for writing tests so I had to refactor to no longer destructure from render method and instead, use the `screen` imported from the react testing library. I also changed all the selectors from `getByX` to `findByX` in order to leverage the asynchronous nature of real life testing.

```javascript
import { render, screen } from "@testing-library/react";

it("renders <Component /> without crashing", async () => {
  render(<Component />);

  const selector = await screen.findByText("Hello World");
  expect(selector).toBeInTheDocument();
});
```

#### Removing waitFor and act

With the old tests, I had used used `waitFor` and `act` extensively when dealing with errors and warnings coming out of Jest. 

```javascript
  await waitFor(async () => {
    const title = await screen.findByText("* Required Fields");
    expect(title).toBeInTheDocument();
  });
```
This is a snippet of a test I wrote for a large component that had a lot of nested components. These nested components do large state updates and various api calls before they are ready so I used the above pattern to make sure the component I actually wanted to test was ready. 

When I moved to Vitest, I started getting warnings saying `Warning: The current testing environment is not configured to support act(...)`. This actually lead me down quite a rabbit hole trying to figure out what that output meant. There were a lot of different ways various people on the internet recommended to fix this issue like adding `globalThis.IS_REACT_ACT_ENVIRONMENT = true;` in the setup file or setting `globals: true` in your `vite.config.ts`. But after trying most of the conventional wisdom, the real fix was to just remove both the `act` and `waitFor` from all my tests. Afterwards, all the warnings about act not being supported disappeared. This also changed all my code testing user actions, for example this

```javascript
  await act(async () => {
    await userEvent.click(selector);
  });
```
turns into this
```javascript
  await userEvent.click(selector);
```

It was a simple fix in concept but having to go through each test manually and remove all the code was a lot of work.


#### Changing mocks

Mocking jest always felt really complex to me and its possible that I just didn't learn it correctly. In my current tests, I saw a pattern that looked like this

```javascript
import { useHook } from "hooks/useHook";
jest.mock("hooks/useHook");
const mockUseHook = useHook as jest.MockedFunction<typeof useHook>;
mockUseHook.mockReturnValue(mockData);
```
With Vitest, this changes to
```javascript
import { useHook } from "hooks/useHook";
jest.mock("hooks/useHook");
vi.mocked(useAuth).mockReturnValue(mockData);
```
To me it is much easier to read and makes more sense in my head. I like the `vi.mocked` function and how it reads within my test, it feels very separate and easily understandable at a glance.

#### No spreading props with keys

Another warning I had not seen before: `Warning: A props object containing a "key" prop is being spread into JSX:`. On some of the components, large objects were spread with a lot of generated props; these generated props included a generated key from a library. I still wanted all the contents of the props to be passed but I had to specify the key instead of spreading it and at the same time, I also had to remove it from the spread object so I could still pass the other items without having to enumerate them all. I found great idea on how to do it which moved us from this
```javascript
  {row.cells.map(cell => (
    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
  ))}

```
to this
```javascript
  {row.cells.map(cell => {
    const { key, ...props } = cell.getCellProps();
    return (
      <td key={key} {...props}>
        {cell.render("Cell")}
      </td>
    );
  })}

```
And with that final warning removed, all the tests passed and the migration was complete.

## Conclusion

Moving build tools was both easier and harder than I had imagined. CRA did a really great job while it was being maintained and I only have love for the project since I first learned React with it. But now that it is no longer maintained, Vite is a great tool to consider as an alternative. The change from CRA to Vite was basically five steps that can be done in just as many minutes and its worked perfectly so far. The low level of configuration meant that getting it working was a breeze and the tool really delivers on what it promises.

The real complexity of the migration was my fault; the transition from Jest to Vitest took 98% of the time due to how my previous test were written. I highly recommend both Vite and Vitest but if you are going to make the switch, start with just doing Vite and then slowly migrating your tests over to Vitest when you have the time.