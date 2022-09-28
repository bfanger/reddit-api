<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<ul>
  {#each data.posts as post}
    <li>
      <a href={post.url}>
        {#if post.thumbnail}
          <img src={post.thumbnail} alt="" /><br />
        {/if}
        <h3>{post.title}</h3>
      </a>
    </li>
  {/each}
</ul>

<style>
  img {
    max-width: 50rem;
  }
</style>
