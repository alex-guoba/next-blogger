
基于[Next.js](https://nextjs.org/)和[Notion Public API](https://www.notion.so/)构建的博客系统，支持在Notion中嵌入[MDX](https://mdxjs.com/)代码来实现更加丰富的效果。

[English](./README.en.md)

## 特性

1. 使用Next.js、TypeS、TailwindCSS构建。
2. 使用Notion作为CMS，支持在Notion中嵌入[MDX](https://mdxjs.com/)代码。
3. 使用Notion Public API，同时支持缓存数据，提升整体性能。
4. 支持深色模式、多语言支持。
5. 支持[Next SSG](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation)。
6. SEO友好
7. 使用[umami](https://umami.is/)、[Google Analytics](https://analytics.google.com/) 作为站点统计工具。
8. 使用[Supabase](https://supabase.com/)实现用户认证管理

## 快速开始

使用docker快速部署。

1. Git clone
2. 准备Notion API Key以及Notion数据库ID
3. 准备 `.env` 文件，参考 [env.example](./.env.example)
4. 运行docker-compose.yml
``` shell
docker-compose up -d
```
5. 访问 `http://localhost:3010`。

## 技术栈

### 框架

1. [Next.js](https://nextjs.org/)
2. [Notion](https://www.notion.so/)
3. [Tailwind CSS](https://tailwindcss.com/) 和 [shadcn](https://ui.shadcn.com/)
4. [Supabase](https://supabase.com/)

### 组件

1. [Shiki](https://shiki.style/): 渲染`code`块
2. [React-pdf](https://react-pdf.org/): 渲染`pdf`块
3. [iframely](https://iframely.com/) / [unfurl](https://github.com/jacktuck/unfurl): 渲染`bookmark`、`link-preview`和`video`块（Notion仅返回URL，不含Open Graph信息）
4. [Katex](https://katex.org/): 渲染`equation`块
5. [MDX](https://mdxjs.com/): 渲染mdx

## Live demo

- https://goroutine.cn/
- https://next-blogger-inky.vercel.app/

## 入门指南

### 前提条件

1. 复制[这个Notion模板](https://www.notion.so/gelco/577a7365a3d3442aa3cddb18b4458c88?v=c0455cd1391e41a2b05d9b1536398d13)，并编辑你的博客内容。
2. 按照Notion的[入门指南](https://developers.notion.com/docs/getting-started)获取`NOTION_TOKEN`和`NOTION_DATABASE_ID`。

### 开发

1. 设置：对项目标星并Fork
2. 安装依赖：

```bash
npm install
```

3. 设置你的`.env`文件，填入`NOTION_TOKEN`和`NOTION_DATABASE_ID`

```ini
NOTION_TOKEN=
NOTION_DATABASE_ID=

# for supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
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

## 关于Notion

### 方案选型

1. 为何选用Notion作为内容编辑器？
本人已有多年使用Notion的习惯，以前博客的做法是将用Notion写好后再copy到Markdown等编辑器，然后使用hexo发布。这样流程会非常长，而且需要转换为markdown格式，流程非常的不方便。所以直接使用Notion作为CMS，写好的内容可以直接发布。也不需要修改后的频繁同步。

2. 为何要重造轮子，而不是直接使用`react-notion-x`等已有的能力实现。
原因主要是git上大部分实现都是基于Notion非公开的API，存在以下缺陷：
- 非公开的API要求将Notion数据publish到外网，无法保障数据隐私。
- 非公开的API需要cookie，存在后续可能废弃、变更的隐患，稳定性无法保障。
- 非公开的API在测试时发现page内容过大时会存在拉取失败的情况。而公共API支持分页，稳定性更可靠。
总之，虽然Public API在高级特性上有所缺失，比如不支持 Database View 等能力，但是基本能力已经可以满足需求。故最终选择采用Notion Public API实现。

### 其他说明

1. 读书笔记支持
读书笔记内容来源于微信读书，将微信读书的内容定期同步到Notion中，然后通过Notion的API获取数据，再通过Next.js渲染。
同步方案参考 [sync-notion](https://github.com/alex-guoba/sync-notion)

### 支持的Notion Block类型

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
| Code                   | ✅ Yes     | Use [shiki](https://shiki.style/) and MDX               |
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

1. `image`, `video`, `bookmark` 以及 `link-preview`等类型的block，Notion API仅返回URL，没有渲染相关数据结构（如title、desciprtion、icon等）。所以需要自己寻求解决方案，此处选择了iframely作为替代。Notion官方也是采用[iframely](https://www.notion.so/help/embed-and-connect-other-apps#embeds-in-notion)。

2. iframely需要付费，所以也采用了unfurl.js作为兜底，效果上会有差距。

## 配置

1. [顶部导航](./config/site.ts)
2. 支持的[环境变量](./env.mjs), 包括`NOTION_TOKEN`, `NOTION_DATABASE_ID`等。
- 自部署时请在`.env`文件中设置。或者在vercel面板上设置。
- MDX开启： `RENDER_MDX=true` 且在notion的code block中设置语言为`markdown`
- redis缓存开启： `REDIS_URL="redis://localhost:6379"`，否则使用内存、文件缓存
- Notion数据过期时间 `NEXT_DATACACHE_EXPIRE`，默认1小时。注意如果使用Notion存储了pdf、图片等文件，过期时间不要过长，否则文件链接可能过期。
- 开启微信读书笔记：配置`NOTION_NOTE_DATABASE_ID`

## Reference
1. [Notion Public API](https://developers.notion.com/reference/intro)
2. [Next.js](https://nextjs.org/)

