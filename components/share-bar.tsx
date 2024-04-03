"use client";

import { Separator } from "./ui/separator";

import {
  FacebookIcon,
  FacebookShareButton,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramIcon,
  TelegramShareButton,
  WeiboShareButton,
  WeiboIcon,
} from "react-share";

interface ShareBarProps {
  url: string;
  image?: string;
  title?: string;
}

export function ShareBar({ url, image, title }: ShareBarProps) {
  return (
    <div className="w-full">
      <Separator className="my-8" />
      <div className="flex w-full md:justify-end">
        <FacebookShareButton key="facebook" url={url} className="mx-1">
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <RedditShareButton key="raddit" url={url} title={title} windowWidth={660} windowHeight={460} className="mx-1">
          <RedditIcon size={32} round />
        </RedditShareButton>

        <TwitterShareButton key="twitter" url={url} title={title} className="mx-1" hashtags={["NextBlogger"]}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>

        <TelegramShareButton key="telegram" url={url} title={title} className="mx-1">
          <TelegramIcon size={32} round />
        </TelegramShareButton>

        <WeiboShareButton key="weibo" url={url} title={title} image={image} className="mx-1">
          <WeiboIcon size={32} round />
        </WeiboShareButton>
      </div>
    </div>
  );
}
