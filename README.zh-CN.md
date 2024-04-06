
<p align="center">
  <img alt="示例页面" src="https://github.com/alex-guoba/next-blogger/assets/2872637/b05f04b0-3d05-4ab3-8a8e-be2093a349c5" width="689">
</p>

基于[Next.js](https://nextjs.org/)和[Notion Public API](https://www.notion.so/)构建的博客模板。

## 特性

1. 使用Next.js、TS、TailwindCSS构建。
2. 使用Notion作为CMS。
3. 使用Notion Public API，同时支持使用 `unstable_cache` 缓存数据，减少API访问，提升整体性能。
4. 支持深色模式。
5. 支持[Next静态网站生成](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation)。
6. 支持压力测试，详见[load-testing](./scripts/load-testing/)。
7. SEO友好
8. 使用[umami](https://umami.is/)作为站点统计工具。

## 技术栈

### 框架

1. [Next.js](https://nextjs.org/)
2. [Notion](https://www.notion.so/)
3. [Tailwind CSS](https://tailwindcss.com/) 和 [shadcn](https://ui.shadcn.com/)

### 组件

1. [Shiki](https://shiki.style/): 渲染`code`块
2. [React-pdf](https://react-pdf.org/): 渲染`pdf`块
3. [iframely](https://iframely.com/) / [unfurl](https://github.com/jacktuck/unfurl): 渲染`bookmark`、`link-preview`和`video`块（Notion仅返回URL，不含Open Graph信息）
4. [Katex](https://katex.org/): 渲染`equation`块

## Live demo

- https://goroutine.cn/
- https://next-blogger-inky.vercel.app/

## 入门指南

### 前提条件

1. 复制[这个Notion模板](https://gelco.notion.site/910de43a0db24ebc9a34209ffab613a7?v=7f2614c5918f4a5bab3a6637b12a19f9&pvs=4)，并编辑你的博客内容。
2. 按照Notion的[入门指南](https://developers.notion.com/docs/getting-started)获取`NOTION_TOKEN`和`NOTION_DATABASE_ID`。

### 开发及部署

1. 设置：对项目标星并Fork
2. 安装依赖：

```bash
npm install
```

3. 设置你的`.env`文件，填入`NOTION_TOKEN`和`NOTION_DATABASE_ID`

```ini
NOTION_TOKEN=
NOTION_DATABASE_ID=
```
4. 本地运行

```bash
# 本地开发
npm run dev

# 生产环境构建与启动
npm run build
npm run start
```

打开[http://localhost:3000](http://localhost:3000)即可在浏览器中查看结果。

## 支持的块类型

大多数常见的块类型都受支持。但是，Public API中不支持某些块的信息，因此我们提供了简化的渲染。

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

### Why Notion ?

1. 为何选用Notion作为内容编辑器？
本人已有多年使用Notion的习惯，以前博客的做法是将用Notion写好后再copy到Markdown等编辑器，然后使用hexo发布。这样流程会非常长，而且需要转换为markdown格式，流程非常的不方便。所以直接使用Notion作为CMS，写好的内容可以直接发布。也不需要修改后的频繁同步。

2. 为何要重造轮子，而不是直接使用`react-notion-x`等已有的能力实现。
原因主要是git上大部分实现都是基于Notion非公开的API，存在以下缺陷：
- 非公开的API官网上没有相关文档，只能自己摸索其数据结构。
- 非公开的API要求将Notion数据publish到外网，无法保障数据隐私。
- 非公开的API存在后续可能废弃、变更的隐患，稳定性无法保障。
- 非公开的API在测试时发现page内容过大时会存在拉取失败的情况。而公共API支持分页，稳定性更可靠。
总之，虽然Public API在高级特性上有所缺失，比如不支持 Database View 等能力，但是基本能力已经可以满足需求。故最终选择采用Notion Public API实现。

### Why iframely?

1. `image`, `video`, `bookmark` 以及 `link-preview`等类型的block，Notion API仅返回URL，没有渲染相关数据结构（如title、desciprtion、icon等）。所以需要自己寻求解决方案，此处选择了iframely作为替代。Notion官方也是采用[iframely](https://www.notion.so/help/embed-and-connect-other-apps#embeds-in-notion)。

2. iframely需要付费，所以也采用了unfurl.js作为兜底，效果上会有差距。

3. 获取NotionToken

- 浏览器打开https://www.notion.so/my-integrations
- 点击New integration 输入name提交
- 点击show，然后copy
- 复制这个[Notion模板](https://gelco.notion.site/910de43a0db24ebc9a34209ffab613a7?v=7f2614c5918f4a5bab3a6637b12a19f9&pvs=4)，删掉所有的数据，并点击右上角设置，Connections添加你创建的Integration。

4. 获取NotionDatabaseID

打开Notion数据库，点击右上角的Share，然后点击Copy link
获取链接后比如https://gelco.notion.site/910de43a0db24ebc9a34209ffab613a7?v=7f2614c5918f4a5bab3a6637b12a19f9&pvs=4 中间的**910de43a0db24ebc9a34209ffab613a7**就是DatabaseID


## Reference
1. [Notion Public API](https://developers.notion.com/reference/intro)
