import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-node";

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: preprocess({ sourceMap: true }),
  kit: {
    prerender: { default: true },
    adapter: adapter(),
    vite: { css: { devSourcemap: true } },
  },
};
