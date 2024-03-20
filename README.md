<p align="center">
  <img alt="Example Page" src="https://github.com/alex-guoba/next-blogger/blob/main/assets/2872637/5d23c303-6031-47aa-beec-7aad56357337.png?raw=true" width="689">
</p>

Next-Blogger built on [Next.js 14+](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/), use [Notion](https://www.notion.so]) to manage your content. 

[简体中文](./README.zh-CN.md)

## Features

1. Built using Next.js(14+ with App Router ), Typescript, Tailwind CSS, and other plugins (Shiki, React-pdf, and more).
2. Utilizes the [Notion Public API](https://developers.notion.com/).
3. Supports caching Notion data using Prisma to reduce API calls and improve overall performance.
4. Includes a dark mode option.
5. SEO friendly with RSS feed, sitemaps and more!
6. Includes load testing scripts, see [load-testing](./scripts/load-testing/).
7. Supports [Server Rendering](https://nextjs.org/docs/app/building-your-application/rendering/server-components#static-rendering-default) and [Dynamic Rendering](https://nextjs.org/docs/app/building-your-application/rendering/server-components#static-rendering-default).

## Tech Stack

### Frameworks

1. [Next.js](https://nextjs.org/)
2. [Notion](https://www.notion.so/)
3. [Tailwind CSS](https://tailwindcss.com/) and [shadcn](https://ui.shadcn.com/)
4. [Prisma](https://www.prisma.io/)

### Components

1. [Shiki](https://shiki.style/): Renders `code` blocks.
2. [React-pdf](https://react-pdf.org/): Renders `pdf` blocks.
3. [iframely](https://iframely.com/) / [unfurl](https://github.com/jacktuck/unfurl): Renders `bookmark`, `link-preview`, and `video` blocks (Notion only returns URLs without Open Graph infos).
4. [Katex](https://katex.org/): Renders `equation` blocks.

### Platforms

(To be added)

## ✨ Getting Started

### Prerequisites

1. Duplicate [this Notion template](https://gelco.notion.site/577a7365a3d3442aa3cddb18b4458c88?v=c0455cd1391e41a2b05d9b1536398d13) and edit your blog.
2. Follow Notion's [getting started guide](https://developers.notion.com/docs/getting-started) to get a `NOTION_TOKEN` and a `NOTION_DATABASE_ID`.

### Development

1. Set up: Star and Fork the repository.
2. Install the dependencies:

```bash
npm install
```

3. Set up your `.env` file with `NOTION_TOKEN` and `NOTION_DATABASE_ID`:

```ini
NOTION_TOKEN=
NOTION_DATABASE_ID=
```
4. (Optional) For performance considerations, it is recommended to configure database caching. See the Prisma documentation for various database [Connection URLs](https://www.prisma.io/docs/orm/reference/connection-urls). The default in the code is [postgresql](/prisma/schema.prisma):

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

```ini
DATABASE_URL="postgres://xxxx"
```

The first time you run it, you need to create the relevant table structure.

```shell
npm run db:init
```

5. Run locally:

```bash
# Locally
npm run dev

# Production
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### deploy

Follow the deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.


## Supported Blocks

Most common block types are supported. But some blocks information not supported in Public API, So we give an abbreviated rendering.

| Block Type             | Supported | Notes                                                   |
|------------------------|-----------|---------------------------------------------------------|
| Paragraph              | ✅ Yes     |                                                         |
| Headings               | ✅ Yes     |                                                         |
| Bookmark               | ✅ Yes     | Use unfurl.js                                           |
| Bulleted List          | ✅ Yes     |                                                         |
| Callout                | ✅ Yes     |                                                         |
| Child Databases        | ✅ Yes     | Use [tanstack/table](https://tanstack.com/table/latest) |
| Child page             | ✅ Yes     |                                                         |
| Code                   | ✅ Yes     | Use [shiki](https://shiki.style/)                       |
| Column list and column | ✅ Yes     |                                                         |
| Embed                  | ✅ Yes     |                                                         |
| Equation               | ✅ Yes     | Use [katex ](https://katex.org/)                        |
| File                   | ✅ Yes     |                                                         |
| Image                  | ✅ Yes     | No position、size info in API                            |
| Link Preview           | ✅ Yes     | Use unfurl.js                                           |
| Mention                | ✅ Yes     | Only Date                                               |
| Numbered List          | ✅ Yes     |                                                         |
| PDF                    | ✅ Yes     |                                                         |
| Quote                  | ✅ Yes     |                                                         |
| Synced block           | ✅ Yes     |                                                         |
| Table                  | ✅ Yes     |                                                         |
| To do                  | ✅ Yes     |                                                         |
| Toggle blocks          | ✅ Yes     |                                                         |
| Video                  | ✅ Yes     | Use [iframely](https://iframely.com/)                   |
| Breadcrumb             | ❌ Missing | Not planned                                             |
| Template               | ❌ Missing | Not planned.                                            |
| Divider                | ❌ Missing | API Unsupported.                                        |
| Table Of Contents      | ❌ Missing | API Unsupported.                                        |


## Performance

1. [Dynamic Routes](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic)

Disabling `dynamic routes` can reduce redundant rendering and significantly improve performance. Below is a performance comparison between enabling and disabling this feature:

- `force-dynamic`:

| Bucket          | #    | %!|(MISSING) Histogram                                                           |
|-----------------|------|--------|---------------------------------------------------------------------|
| [0s,     10ms]  | 0    | 0.00%!|(MISSING)                                                                     |
| [10ms,   40ms]  | 1    | 0.01%!|(MISSING)                                                                     |
| [40ms,   80ms]  | 0    | 0.00%!|(MISSING)                                                                     |
| [80ms,   200ms] | 1    | 0.01%!|(MISSING)                                                                     |
| [200ms,  500ms] | 906  | 10.30%!|(MISSING) #######                                                             |
| [500ms,  1s]    | 7885 | 89.67%!|(MISSING) ################################################################### |
| [1s,     +Inf]  | 0    | 0.00%!|(MISSING)                                                                     |

- `auto` (default):

| Bucket          | #    | %!|(MISSING) Histogram                                                          |
|-----------------|------|--------|------------------------------------------------------------------|
| [0s,     10ms]  | 0    | 0.00%!|(MISSING)                                                                  |
| [10ms,   40ms]  | 7727 | 80.49%!|(MISSING) ############################################################ |
| [40ms,   80ms]  | 1816 | 18.92%!|(MISSING) ##############                                               |
| [80ms,   200ms] | 54   | 0.56%!|(MISSING)                                                              |
| [200ms,  500ms] | 3    | 0.03%!|(MISSING)                                                              |
| [500ms,  1s]    | 0    | 0.00%!|(MISSING)                                                              |
| [1s,     +Inf]  | 0    | 0.00%!|(MISSING)                                                              |

## Learn More

### Why Notion?

1. Why choose Notion as the content editor?
I have been using Notion for many years. In the past, when creating blogs, I would write content in Notion, copy it to editors like Markdown, and then publish it using hexo. This process was cumbersome and required converting the format to Markdown, which was inconvenient. By using Notion as a CMS, I can directly publish content written in Notion without the need for frequent synchronization after making changes.

2. Why reinvent the wheel instead of using existing solutions like `react-notion-x`?
The main reason is that most implementations on GitHub are based on Notion's unofficial API, which has several drawbacks:
- The unofficial API does not have official documentation, so one has to figure out the data structure on their own.
- The unofficial API requires publishing Notion data to the internet, which may compromise data privacy.
- The unofficial API may be deprecated or changed in the future, making it unstable.
- During testing, I found that the unofficial API sometimes fails to fetch large pages. In contrast, the public API supports pagination and is more stable.
In summary, while the Public API lacks some advanced features like Database View support, it meets the basic requirements. Therefore, I chose to implement it using the Notion Public API.

3. Why Use `Prisma` to Cache Notion Data

The Notion API has frequency limitations, and for some deeply nested pages, multiple accesses can easily exceed these limitations. Additionally, API access can be unstable in certain regions, significantly impacting page performance. To address these issues, caching is used. Furthermore, some data returned by the Notion API, such as image URLs, have a limited validity period, necessitating cache invalidation. By default, the cache expires after one hour. For more details on expiration strategies, refer to the official documentation on [notion-hosted-files](https://developers.notion.com/reference/file-object#notion-hosted-files).

`Prisma` is chosen as the caching component due to its flexibility and support for various databases, including MySQL, MongoDB, and others. For more information, refer to the official [Doc](https://www.prisma.io/docs/orm/overview/databases).

### Why iframely?

1. For block types such as `image`, `video`, `bookmark`, and `link-preview`, the Notion API only returns URLs without rendering the relevant data structures (e.g., title, description, icon, etc.). Therefore, an alternative solution is needed, and iframely is chosen for this purpose. Notion officially also uses [iframely](https://www.notion.so/help/embed-and-connect-other-apps#embeds-in-notion).

2. Since iframely requires payment, unfurl.js is used as a fallback option, although there may be some differences in effectiveness.

## TODO


## Reference

1. [Notion Public API](https://developers.notion.com/reference/intro)
