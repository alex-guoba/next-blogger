
<p align="center">
  <img alt="Example Page" src="https://github.com/alex-guoba/next-blogger/assets/2872637/5d23c303-6031-47aa-beec-7aad56357337" width="689">
</p>

Blog build on [Next.js](https://nextjs.org/) and [Notion Public API](https://www.notion.so/).

## Features

1. Built using Next.js, TS, Tailwind CSS and other plugins(Shiki、React-pdf and others).
2. Use [Notion Public API](https://developers.notion.com/)。
3. Full support for dark mode
4. Support [Static Site Generation](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation)

## ✨ Getting Started

### Prerequisites

1. Duplicate [this Notion template](https://gelco.notion.site/910de43a0db24ebc9a34209ffab613a7?v=7f2614c5918f4a5bab3a6637b12a19f9&pvs=4), and edit your blog. 
2. Follow Notions [getting started guide](https://developers.notion.com/docs/getting-started) to get a `NOTION_TOKEN` and a `NOTION_DATABASE_ID`.

### Development
1. Setup: Star and Fork the repository
2. install the dependences:
```bash
npm install
```
3. Set up you `env.local` with `NOTION_TOKEN` and `NOTION_DATABASE_ID`.
```
NOTION_TOKEN=
NOTION_DATABASE_ID=
```
4. run locally 
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Supported Blocks

Most common block types are supported. But some blocks information not supported in Public API, So we give an abbreviated rendering.

| Block Type             | Supported | Notes                                 |
|------------------------|-----------|---------------------------------------|
| Paragraph              | ✅ Yes     |                                       |
| Headings               | ✅ Yes     |                                       |
| Bookmark               | ✅ Yes     | Use unfurl.js                         |
| Breadcrumb             | ❌ Missing | Not planned                           |
| Bulleted List          | ✅ Yes     |                                       |
| Callout                | ✅ Yes     |                                       |
| Child Databases        | ❌ Missing | Not planned.                          |
| Child page             | ✅ Yes     |                                       |
| Code                   | ✅ Yes     | Use [shiki](https://shiki.style/)     |
| Column list and column | ✅ Yes     |                                       |
| Divider                | ❌ Missing |                                       |
| Embed                  | ✅ Yes     |                                       |
| Equation               | ✅ Yes     | Use [katex ](https://katex.org/)      |
| File                   | ✅ Yes     |                                       |
| Image                  | ✅ Yes     | No position、size info in API         |
| Link Preview           | ✅ Yes     | Use unfurl.js                         |
| Mention                | ✅ Yes     | Only Date                             |
| Numbered List          | ✅ Yes     |                                       |
| PDF                    | ✅ Yes     |                                       |
| Quote                  | ✅ Yes     |                                       |
| Synced block           | ❌ Missing |                                       |
| Table                  | ✅ Yes     |                                       |
| Table Of Contents      | ❌ Missing |                                       |
| Template               | ❌ Missing | Not planned.                          |
| To do                  | ✅ Yes     |                                       |
| Toggle blocks          | ✅ Yes     |                                       |
| Video                  | ✅ Yes     | Use [iframely](https://iframely.com/) |


## Learn More


## TODO
- [ ] Deploy on Vercel
