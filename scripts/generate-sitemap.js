const fs = require('fs');
const path = require('path');

// Import the posts data (we need to replicate the logic)
const matter = require('gray-matter');
const postsDirectory = path.join(process.cwd(), 'src/posts');

function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        id,
        date: matterResult.data.date || '',
      };
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://riderjensen.com</loc>
     </url>
     <url>
       <loc>https://riderjensen.com/about</loc>
     </url>
     <url>
      <loc>https://riderjensen.com/blog</loc>
    </url>
     ${posts
       .map(({ id, date }) => {
         return `
       <url>
           <loc>${`https://riderjensen.com/blog/${id}`}</loc>
           <lastmod>${date}</lastmod>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

// Generate sitemap
const posts = getSortedPostsData();
const sitemap = generateSiteMap(posts);

// Write to out directory (Next.js static export output)
const outDir = path.join(process.cwd(), 'out');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap);
console.log('Sitemap generated successfully at out/sitemap.xml');
