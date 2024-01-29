import { Fragment } from 'react';
import Link from 'next/link';

import RichText from './text';
import styles from './post.module.css';
import { bulletListStyle, numberListStyle } from './tools';


export function renderBlock(block: any, level: number = 1) {
  const { type, id } = block;
  const value = block[type];

  // console.log(type, id, value);

  switch (type) {
    // https://developers.notion.com/reference/block#paragraph
    // RichText: 
    // - 当包含多段不同样式的文本时，会被拆分为对应的多个 paragraph.rich_text[]，包括：带link、bold、strikethrough、italic、code（使用``包裹）的文本
    // - 空白换行
    // - mention: no rich_text exist
    case 'paragraph':
      return (
        <p id={id} className='py-1'>
          <RichText title={value.rich_text} />
        </p>
      );
    case 'heading_1':
      return (
        <h1 id={id} className='text-3xl font-bold dark:text-white py-4'>
          <RichText title={value.rich_text} />
        </h1>
      );
    case 'heading_2':
      return (
        <h2 id={id} className='text-2xl font-bold dark:text-white py-3'>
          <RichText title={value.rich_text} />
        </h2>
      );
    case 'heading_3':
      return (
        <h3 id={id} className='text-1xl font-bold dark:text-white py-2'>
          <RichText title={value.rich_text} />
        </h3>
      );
    

    // before list rendering, array should be convert into children array. See getBlocks function.
    case 'bulleted_list': {
      const styels = bulletListStyle(level)
      return (
        <ul className={`${styels} pt-1 pl-5`}>
          {value.children.map((child: any) => renderBlock(child, level + 1))}
        </ul>
      );
    }
    case 'numbered_list': {
      const styels = numberListStyle(level)
      return (
        <ol className={`${styels} pt-1 pl-5`}>
          {value.children.map((child: any) => renderBlock(child, level + 1))}
        </ol>
      );
    }
    case 'bulleted_list_item':
    case 'numbered_list_item':
      // console.log('item: ', type, value, value.children)
      return (
        <li key={block.id} className='pt-1'>
          <RichText title={value.rich_text} />
          {!!block.children && renderNestedList(block, level + 1)}
        </li>
      );
    
    case 'to_do':
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />
            {' '}
            <RichText title={value.rich_text} />
          </label>
        </div>
      );
    case 'toggle':
      return (
        <details>
          <summary>
            <RichText title={value.rich_text} />
          </summary>
          {block.children?.map((child: any) => (
            <Fragment key={child.id}>{renderBlock(child, level + 1)}</Fragment>
          ))}
        </details>
      );
    case 'child_page':
      return (
        <div className={styles.childPage}>
          <strong>{value?.title}</strong>
          {block.children.map((child: any) => renderBlock(child, level + 1))}
        </div>
      );
    case 'image': {
      const src = value.type === 'external' ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : '';
      return (
        <figure>
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    }
    case 'divider':
      return <hr key={id} />;
    case 'quote':
      return <blockquote key={id}>{value.rich_text[0].plain_text}</blockquote>;
    case 'code':
      return (
        <pre className={styles.pre}>
          <code className={styles.code_block} key={id}>
            {value.rich_text[0].plain_text}
          </code>
        </pre>
      );
    case 'file': {
      const srcFile = value.type === 'external' ? value.external.url : value.file.url;
      const splitSourceArray = srcFile.split('/');
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const captionFile = value.caption ? value.caption[0]?.plain_text : '';
      return (
        <figure>
          <div className={styles.file}>
            📎
            {' '}
            <Link href={srcFile} passHref>
              {lastElementInArray.split('?')[0]}
            </Link>
          </div>
          {captionFile && <figcaption>{captionFile}</figcaption>}
        </figure>
      );
    }
    case 'bookmark': {
      const href = value.url;
      return (
        <a href={href} target="_blank" rel="noreferrer noopener" className={styles.bookmark}>
          {href}
        </a>
      );
    }
    case 'table': {
      return (
        <table className={styles.table}>
          <tbody>
            {block.children?.map((child: any, index: number) => {
              const RowElement = value.has_column_header && index === 0 ? 'th' : 'td';
              return (
                <tr key={child.id}>
                  {child.table_row?.cells?.map((cell: { plain_text: any; }, i: any) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <RowElement key={`${cell.plain_text}-${i}`}>
                      <RichText title={cell} />
                    </RowElement>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    case 'column_list': {
      return (
        <div className={styles.row}>
          {block.children.map((childBlock: any) => renderBlock(childBlock, level + 1))}
        </div>
      );
    }
    case 'column': {
      return <div>{block.children.map((child: any) => renderBlock(child, level + 1))}</div>;
    }
    default:
      return `❌ Unsupported block (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`;
  }
}

export function renderNestedList(blocks: any, level: number) {
  const { type } = blocks;
  const value = blocks[type];

  if (!value) return null;

  const isNumberedList = blocks.children[0].type === 'numbered_list_item';
  if (isNumberedList) {
    // style not neccessary for grand-child lists as it will inherit from parent
    return <div>{blocks.children.map((block: any) => renderBlock(block, level))}</div>;
  }
  return <div>{blocks.children.map((block: any) => renderBlock(block, level))}</div>;
}
