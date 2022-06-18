import type { Listing, Entry } from "$lib/services/api-types-reddit";
import type { RequestHandler } from "@sveltejs/kit";

const MIN = 60;
export const get: RequestHandler = async ({ params, url }) => {
  const thumbnail = !!url.searchParams.get("thumbnail");
  const embed = !!url.searchParams.get("embed");
  const after = url.searchParams.get("after");
  const limit = parseInt(url.searchParams.get("limit") as any, 10) || 60;

  function entryFilter(entry: Entry) {
    if (entry.over_18) {
      return false;
    }
    if (thumbnail && !getThumb(entry)) {
      return false;
    }
    if (embed && !entry.media_embed?.content) {
      return false;
    }
    return true;
  }
  const redditUrl = new URL(`https://reddit.com/r/${params.topic}/.json`);
  redditUrl.searchParams.set("limit", `${limit}`);
  if (after) {
    redditUrl.searchParams.set("after", after);
  }
  const response = await fetch(redditUrl.toString());
  const json: Listing = await response.json();
  if (!response.ok) {
    return {
      status: response.status,
      body: json,
    };
  }
  let next: URL | undefined;
  if (json.data.after) {
    next = new URL(url);
    next.searchParams.set("after", json.data.after);
  }
  let entries = json.data.children;
  if (!after && entries.length > limit) {
    entries = entries.slice(1);
  }
  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": `public, max-age: ${15 * MIN}`,
      "Reddit-Url": redditUrl.toString(),
    },
    body: {
      next,
      posts: entries
        .filter((child) => entryFilter(child.data))
        .map(({ data: entry }) => ({
          id: entry.id,
          title: entry.title,
          url: entry.url,
          thumbnail: getThumb(entry),
          video: getVideo(entry),
          embed: decodeEntities(
            entry.secure_media_embed?.content || entry.media_embed?.content
          ),
          description: entry.selftext,
          created: entry.created_utc,
          // raw: entry,
        })),
    },
  };
};

function decodeEntities(encodedString?: string) {
  if (!encodedString) {
    return undefined;
  }
  const translateRegex = /&(nbsp|amp|quot|lt|gt);/g;
  const translate = {
    nbsp: " ",
    amp: "&",
    quot: '"',
    lt: "<",
    gt: ">",
  };
  return encodedString
    .replace(
      translateRegex,
      (match: any, entity: keyof typeof translate) => translate[entity]
    )
    .replace(/&#(\d+);/gi, (match, numStr) => {
      const num = parseInt(numStr, 10);
      return String.fromCharCode(num);
    });
}
function getThumb(entry: Entry) {
  if (!entry.thumbnail || ["self", "default"].includes(entry.thumbnail)) {
    if (entry.url.match(/\.jpg$/)) {
      return entry.url;
    }
    return undefined;
  }
  return entry.thumbnail;
}
function getVideo(entry: Entry) {
  return entry.media?.reddit_video?.fallback_url;
}
