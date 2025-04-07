
Based on Next.js and Notion Public API, this blog system supports embedding MDX code in Notion to achieve more enriched effects.

[简体中文](./README.zh-CN.md)

## Features

1. Built using Next.js, TS, Tailwind CSS, and other plugins (Shiki, React-pdf, and more).
2. Uses Notion as the CMS, supporting embedding MDX code in Notion.
3. Utilizes the Notion Public API, supporting cached data to improve overall performance.
4. Supports dark mode and multi-language support.
5. Supports [Next SSG](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation).
6. SEO-friendly.
7. Uses umami as the website analytics tool.
8. Use supabase to manage user siginup/signin

## Quick Start
1. Clone the repository.
2. Prepare your Notion API key and database ID. See [Prerequisites](#prerequisites)
3. Prepare `.env` file.
4. Run `docker compose up -d` to start the container.
5. Visit `http://localhost:3010` to see the website.

## Tech Stack

### Frameworks

1. [Next.js](https://nextjs.org/)
2. [Notion](https://www.notion.so/)
3. [Tailwind CSS](https://tailwindcss.com/) and [shadcn](https://ui.shadcn.com/)
4. [Supabase](https://supabase.com/)

### Components

1. [Shiki](https://shiki.style/): Renders `code` blocks.
2. [React-pdf](https://react-pdf.org/): Renders `pdf` blocks.
3. [iframely](https://iframely.com/) / [unfurl](https://github.com/jacktuck/unfurl): Renders `bookmark`, `link-preview`, and `video` blocks (Notion only returns URLs without Open Graph infos).
4. [Katex](https://katex.org/): Renders `equation` blocks.
5. [MDX](https://mdxjs.com/): Renders mdx

## Live Demo

- https://goroutine.cn/
- https://next-blogger-inky.vercel.app/


## ✨ Getting Started

### Prerequisites

1. Duplicate [this Notion template](https://www.notion.so/gelco/577a7365a3d3442aa3cddb18b4458c88?v=c0455cd1391e41a2b05d9b1536398d13) and edit your blog.
2. Follow Notion's [getting started guide](https://developers.notion.com/docs/getting-started) to get a `NOTION_TOKEN` and a `NOTION_DATABASE_ID`.

### Development and Deployment
 
1. Set up: Star and Fork the repository.
2. Install the dependencies:

```bash
npm install
```

3. Set up your `.env` file with `NOTION_TOKEN` and `NOTION_DATABASE_ID`:

```ini
NOTION_TOKEN=
NOTION_DATABASE_ID=

# for supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

4. Run locally:

```bash
# Locally
npm run dev

# Production
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## About Notion

### Choice of Solution
1. Why choose Notion as the content editor? I have been using Notion for years, and previously, my blog workflow involved copying content from Notion to a Markdown editor like Hexo before publishing. This process was cumbersome and inefficient, as it required converting to Markdown format. By using Notion as the CMS, I can publish content directly, eliminating the need for frequent synchronization and edits.

2. Why rebuild the wheel instead of using existing capabilities like react-notion-x? The main reason is that most implementations on Git are based on Notion's non-public API, which has the following drawbacks:
- The non-public API requires publishing Notion data to the external web, compromising data privacy.
- The non-public API relies on cookies, which may be deprecated or changed in the future, affecting stability.
- When testing, the non-public API has issues with pulling content when the page size is too large. By contrast, the public API supports pagination, providing more reliable stability.

Although the public API lacks advanced features like Database View, its basic capabilities are sufficient for most use cases. Therefore, I chose to adopt the Notion Public API for this implementation.

### Supported Blocks

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

### Why iframely?

1. For block types such as `image`, `video`, `bookmark`, and `link-preview`, the Notion API only returns URLs without rendering the relevant data structures (e.g., title, description, icon, etc.). Therefore, an alternative solution is needed, and iframely is chosen for this purpose. Notion officially also uses [iframely](https://www.notion.so/help/embed-and-connect-other-apps#embeds-in-notion).

2. Since iframely requires payment, unfurl.js is used as a fallback option, although there may be some differences in effectiveness.


## Configuration
1. [Top Navigation](./config/site.ts)
2. Supported [environment variables](./env.mjs) including `NOTION_TOKEN`, `NOTION_DATABASE_ID`, etc.
- Set in the .env file for self-deployment or on the Vercel dashboard.
- Enable MDX: `RENDER_MDX=true` and set the language to markdown in Notion's code block.
- Enable Redis caching: `REDIS_URL="redis://localhost:6379"`, otherwise, memory and file caching will be used.
- Notion data expiration time: `NEXT_DATACACHE_EXPIRE`, defaulting to 1 hour. Note that if Notion is used to store files such as PDFs or images, the expiration time should not be too long to avoid expired file links.
3. Supabase configuration:
- NEXT_PUBLIC_SUPABASE_URL: Supabase URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY: Supabase Anon Key
You can directly use the official [Supabase](https://supabase.com/) for deployment, or you can self-hosted-deploy Supabase. For self-hosted-deployment, refer to [supabse-docker](https://github.com/alex-guoba/supabase-docker). 

## Reference
1. [Notion Public API](https://developers.notion.com/reference/intro)
2. [Next.js](https://nextjs.org/)
3. [Supabase](https://supabase.com/)

