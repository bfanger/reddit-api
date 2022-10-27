import type { PageLoad } from "./$types";
import api from "$lib/services/api";

export const load: PageLoad = async ({ fetch, url }) => {
  const topic = url.searchParams.get("topic") ?? "itemshop";
  const post = await api.get("r/[topic].json", {
    params: { topic },
    fetch,
    ssrCache: 60,
  });
  return { next: post.next, posts: post.posts };
};
