import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-vercel";

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: preprocess({ sourceMap: true }),
  kit: {
    prerender: { default: true },
    adapter: adapter({
      edge: false,
      split: false,
    }),
    vite: { css: { devSourcemap: true } },
  },
};
