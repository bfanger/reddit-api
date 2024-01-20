import api from "../../services/api";

export async function load({ fetch, url }) {
  const topic = url.searchParams.get("topic") ?? "itemshop";
  const post = await api.get("r/[topic].json", {
    params: { topic },
    fetch,
    ssrCache: 60,
  });
  return { next: post.next, posts: post.posts };
}
