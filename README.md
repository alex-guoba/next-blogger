
<p align="center">
  <img alt="Example Page" src="https://github.com/alex-guoba/next-blogger/assets/2872637/5d23c303-6031-47aa-beec-7aad56357337" width="689">
</p>

Blog build on [Next.js](https://nextjs.org/) and [Notion Public API](https://www.notion.so/).

## Features

1. Built using Next.js, TS, Tailwind CSS and other plugins(Prism、React-pdf and others).
2. Use [Notion Public API](https://developers.notion.com/)。
3. Full support for dark mode
4. Support [Static Site Generation](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation)

## Setup

1. Fork / clone this repo
2. Duplicate [this Notion template](https://gelco.notion.site/910de43a0db24ebc9a34209ffab613a7?v=7f2614c5918f4a5bab3a6637b12a19f9&pvs=4), and edit your blog content. 
3. follow Notions [getting started guide](https://developers.notion.com/docs/getting-started) to get a NOTION_TOKEN and a NOTION_DATABASE_ID, then add them to a file called .env.local.

```
NOTION_TOKEN=
NOTION_DATABASE_ID=
```

4. install the dependences:

```bash
npm install
```

5. run locally 
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Learn More


## TODO
- [ ] Deploy on Vercel
