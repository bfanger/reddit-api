<script lang="ts">
  import { onMount } from "svelte";
  import { SwaggerUIBundle } from "swagger-ui-dist";
  import "swagger-ui-dist/swagger-ui.css";

  onMount(() => {
    SwaggerUIBundle({
      url: "/openapi.yaml",
      dom_id: "#swagger-ui",
    });
  });
  onMount(() => {
    document.body.classList.add("body-white");
    return () => {
      document.body.classList.remove("body-white");
    };
  });
</script>

<div id="swagger-ui" />
<svelte:body class="body-white" />

<style>
  :global(.body-white) {
    background: white;
  }
</style>
