import { Client } from '@notionhq/client';
// import { cache } from 'react';
import {QueryDatabaseResponse, ListBlockChildrenResponse} from '@notionhq/client/build/src/api-endpoints';

const databaseId = process.env.NOTION_DATABASE_ID || '';

/**
 * Returns a random integer between the specified values, inclusive.
 * The value is no lower than `min`, and is less than or equal to `max`.
 *
 * @param {number} minimum - The smallest integer value that can be returned, inclusive.
 * @param {number} maximum - The largest integer value that can be returned, inclusive.
 * @returns {number} - A random integer between `min` and `max`, inclusive.
 */
function getRandomInt(minimum: number, maximum: number): number {
  const min = Math.ceil(minimum);
  const max = Math.floor(maximum);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Get pages from database
// API: https://developers.notion.com/reference/post-database-query
// export type TypePostItem = QueryDatabaseResponse["results"][0];
export type TypePostList = QueryDatabaseResponse["results"];
export const QueryDatabase = async (): Promise<TypePostList> => {
  const start = new Date().getTime();

  const response = await notion.databases.query({
    database_id: databaseId,
  });
  const end = new Date().getTime();
  console.log('[QueryDatabase]', `${end - start}ms`);
  return response.results;
};

//
// 读取一个page的基础数据（page object）
// API: https://developers.notion.com/reference/retrieve-a-page
export const getPage = async (pageId: any) => {
  const start = new Date().getTime();
  const response = await notion.pages.retrieve({ page_id: pageId });
  const end = new Date().getTime();
  console.log('[getPage]', `${end - start}ms`);
  return response;
};

//
// slug:（计算机）处理后的标题（用于构建固定链接）
// 根据标题取db中的page列表数据，限制一条
export const getPageFromSlug = async (slug: string) => {
  const start = new Date().getTime();

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Slug',
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });
  const end = new Date().getTime();
  console.log('[getPageFromSlug]', `${end - start}ms`);

  if (response?.results?.length) {
    return response?.results?.[0];
  }
};

//
// 取page/block的children列表数据 (blocks)
export const getBlocks = async (blockID: string): Promise<any> => {
  const start = new Date().getTime();

  const blockId = blockID.replaceAll('-', '');

  // 只读取了100条，超过100时没有取完
  const { results } = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  });

  // Fetches all child blocks recursively
  // be mindful of rate limits if you have large amounts of nested blocks
  // See https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  // 递归取child blocks，嵌套block量大时会有风险。
  const childBlocks = results.map(async (block: any) => {
    if (block.has_children) {
      const children = await getBlocks(block.id);
      return { ...block, children };
    }

    return block;
  });

  const end = new Date().getTime();
  console.log('[getBlocks]', `${end - start}ms`);

  return Promise.all(childBlocks).then((blocks) => blocks.reduce((acc, curr) => {
    // 符号列表类型的特殊处理：转换为parent -> {children} 结构，并增加uniqID（更加方便渲染？）
    // https://developers.notion.com/reference/block#bulleted-list-item
    if (curr.type === 'bulleted_list_item') {
      if (acc[acc.length - 1]?.type === 'bulleted_list') {
        acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
      } else {
        acc.push({
          id: getRandomInt(10 ** 99, 10 ** 100).toString(),
          type: 'bulleted_list',
          bulleted_list: { children: [curr] },
        });
      }
    } else if (curr.type === 'numbered_list_item') {
      if (acc[acc.length - 1]?.type === 'numbered_list') {
        acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
      } else {
        acc.push({
          id: getRandomInt(10 ** 99, 10 ** 100).toString(),
          type: 'numbered_list',
          numbered_list: { children: [curr] },
        });
      }
    } else {
      acc.push(curr);
    }
    return acc;
  }, []));
};
