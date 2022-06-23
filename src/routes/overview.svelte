<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";
  import api, { loadError } from "$lib/services/api";
  import type { ListingDto } from "$lib/services/api-types-reddit";

  export const load: Load = async ({ fetch }) => {
    try {
      const post = await api.get("r/[topic].json", {
        params: { topic: "programminghumor" },
        fetch,
      });
      return {
        props: { next: post.next, posts: post.posts },
      };
    } catch (err) {
      return loadError(err);
    }
  };
</script>

<script lang="ts">
  export let posts: ListingDto["posts"];
  console.info(posts);
</script>
