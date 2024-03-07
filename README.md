
<p align="center">
  <img alt="Example Page" src="https://github.com/alex-guoba/next-blogger/assets/2872637/5d23c303-6031-47aa-beec-7aad56357337" width="689">
</p>

Blog build on [Next.js](https://nextjs.org/) and [Notion Public API](https://www.notion.so/).

## Features


1. Built using Next.js, TS, Tailwind CSS and other plugins(Shiki、React-pdf and others).
2. Use [Notion Public API](https://developers.notion.com/)。
3. 支持使用 Prisma 缓存Notion数据，减少API访问，提升整体性能。
4. 支持深色模式。
5. 支持 [Static Site Generation](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation)

## Tech Stack

### Frameworks

1. [Next.js](https://nextjs.org/) 
2. [Notion](https://www.notion.so/)
3. [Tailwind CSS ](https://tailwindcss.com/) and [shadcn](https://ui.shadcn.com/)
4. [Prisma](https://www.prisma.io/) : 缓存Notion数据，过期时间可配置。

### Component
1. [Shiki](https://shiki.style/): render `code` blocks
2. [React-pdf](https://react-pdf.org/): render `pdf` blocks
3. [iframely](https://iframely.com/) / [unfurl](https://github.com/jacktuck/unfurl): render `bookmark` 、`link-preview` and `video` blocks（Notion only return url without Open Graph infos）
4. [Katex](https://katex.org/): render `equation` blocks

### Platforms


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

1. [dynamic](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic) route

关闭 `dynamic route` 可以减少重复渲染，大幅提升性能。下面为是否开启的性能对比：

- `force-dynamic` :

| Bucket          | #    | %      | Histogram                                                           |
|-----------------|------|--------|---------------------------------------------------------------------|
| [0s,     10ms]  | 0    | 0.00%  |                                                                     |
| [10ms,   40ms]  | 1    | 0.01%  |                                                                     |
| [40ms,   80ms]  | 0    | 0.00%  |                                                                     |
| [80ms,   200ms] | 1    | 0.01%  |                                                                     |
| [200ms,  500ms] | 906  | 10.30% | #######                                                             |
| [500ms,  1s]    | 7885 | 89.67% | ################################################################### |
| [1s,     +Inf]  | 0    | 0.00%  |                                                                     |

- `auto` (default):

| Bucket          | #    | %       Histogram |                                                              |
|-----------------|------|-------------------|--------------------------------------------------------------|
| [0s,     10ms]  | 0    | 0.00%             |                                                              |
| [10ms,   40ms]  | 7727 | 80.49%            | ############################################################ |
| [40ms,   80ms]  | 1816 | 18.92%            | ##############                                               |
| [80ms,   200ms] | 54   | 0.56%             |                                                              |
| [200ms,  500ms] | 3    | 0.03%             |                                                              |
| [500ms,  1s]    | 0    | 0.00%             |                                                              |
| [1s,     +Inf]  | 0    | 0.00%             |                                                              |



## Learn More

1. 为何选用Notion作为内容编辑器？
本人已有多年使用Notion的习惯，以前博客的做法是将用Notion写好后再copy到Markdown等编辑器，使用hexo发布。这样流程会非常长，而且需要适配markdown格式，非常的不方便。所以直接使用Notion作为CMS，写好的内容可以直接发布。

2. 为何要重造轮子，而不是直接使用`react-notion-x`等已有的能力实现渲染。
原因有几点：
- Git上大部分的类似产品都使用非公开的Notion API，在官网上没有相关文档，只能自己摸索其数据结构。
- 非公开的API要求将Notion数据公开到外网，无法保障数据隐私。
- 非公开的API存在后续可能废弃、变更的隐患。
虽然Public API在能力上有所缺失，比如不支持 Database View 等能力，但是常规的能力基本都可以满足。所以选择采用Notion Public API实现。

3. 为何要采用`Prisma`缓存Notion数据
Notion的API存在频率限制，一些嵌套层次比较深的Page多次访问是很容易超过API的频率限制。而且部分地区API访问不稳定，对页面性能影响较大，所以使用缓存来解决。
另外Notion API返回的部分数据（比如图片url）存在有效期，所以也需要考虑过期时间。详见[notion-hosted-files](https://developers.notion.com/reference/file-object#notion-hosted-files)。



## TODO
- [ ] Deploy on Vercel
