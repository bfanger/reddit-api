import type { RequestHandler } from "@sveltejs/kit";
import * as txml from "txml";

export const get: RequestHandler = async ({ params }) => {
  const xml = await (
    await fetch(`https://reddit.com/r/${params.topic}/.rss`)
  ).text();
  const json = txml.parse(xml);
  const feed = getByTagName(json, "feed");
  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: feed.children
      .filter((tag: any) => tag.tagName === "entry")
      .map((entry: any) => ({
        id: tagBody(getByTagName(entry.children, "id")),
        title: tagBody(getByTagName(entry.children, "title")),
        thumbnail: getByTagName(entry.children, "media:thumbnail")?.attributes
          .url,
        url: getByTagName(entry.children, "link")?.attributes.href,
        updated: tagBody(getByTagName(entry.children, "updated")),
        published: tagBody(getByTagName(entry.children, "published")),
        // raw: entry,
      })),
  };
};
function getByTagName(tags: any[], name: string): any {
  return tags.find((tag: any) => tag.tagName === name);
}
function tagBody(tag: any): string {
  if (typeof tag?.children?.[0] === "string") {
    return tag.children[0];
  }
  return "";
}
