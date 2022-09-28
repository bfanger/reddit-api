import type { PageLoad } from "./$types";
import api from "$lib/services/api";

export const load: PageLoad = async ({ fetch }) => {
  const post = await api.get("r/[topic].json", {
    params: { topic: "programminghumor" },
    fetch,
  });
  return { next: post.next, posts: post.posts };
};
