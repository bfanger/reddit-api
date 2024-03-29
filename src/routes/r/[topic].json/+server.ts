import https from "node:https";
import { error, isHttpError, json, type NumericRange } from "@sveltejs/kit";
import type {
  Listing,
  Entry,
} from "../../../services/backend-api-types-reddit";

const MIN = 60;
export async function GET({ params, url }) {
  const thumbnail = !!url.searchParams.get("thumbnail");
  const embed = !!url.searchParams.get("embed");
  const after = url.searchParams.get("after");
  const limit = parseInt(url.searchParams.get("limit") as any, 10) || 60;

  const redditUrl = new URL(`https://www.reddit.com/r/${params.topic}/.json`);
  redditUrl.searchParams.set("limit", `${limit}`);
  if (after) {
    redditUrl.searchParams.set("after", after);
  }
  let result: Listing;
  try {
    result = await new Promise((resolve, reject) => {
      https
        .get(
          redditUrl,
          {
            headers: {
              "User-Agent": "reddit-demo/1.0.0",
            },
          },
          (res) => {
            if (res.statusCode !== 200) {
              try {
                error(
                  res.statusCode as NumericRange<400, 599>,
                  `${redditUrl}: ${res.statusMessage}`,
                );
              } catch (err) {
                reject(err);
              }
            }
            let text = "";
            res.on("data", (chunk) => {
              text += chunk;
            });
            res.on("end", () => {
              try {
                resolve(JSON.parse(text));
              } catch (err) {
                reject(err);
              }
            });
            res.on("error", reject);
          },
        )
        .on("error", reject);
    });
  } catch (err: any) {
    if (isHttpError(err)) {
      throw err;
    }
    error(503, `Loading ${redditUrl} failed: ${err.message}`);
  }
  let next: URL | undefined;
  if (result.data.after) {
    next = new URL(url);
    next.searchParams.set("after", result.data.after);
  }
  let entries = result.data.children;
  if (!after && entries.length > limit) {
    entries = entries.slice(1);
  }
  return json(
    {
      next,
      after: result.data.after,
      posts: entries
        .filter((child) => entryFilter(child.data, thumbnail, embed))
        .map(({ data: entry }) => ({
          id: entry.id,
          title: entry.title,
          url: entry.url,
          thumbnail: getThumb(entry),
          video: getVideo(entry),
          embed: decodeEntities(
            entry.secure_media_embed?.content || entry.media_embed?.content,
          ),
          description: entry.selftext,
          created: entry.created_utc,
          // raw: entry,
        })),
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": `public, max-age: ${15 * MIN}`,
        "Reddit-Url": redditUrl.toString(),
      },
    },
  );
}

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
      (match: any, entity: keyof typeof translate) => translate[entity],
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

function entryFilter(entry: Entry, thumbnail: boolean, embed: boolean) {
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
