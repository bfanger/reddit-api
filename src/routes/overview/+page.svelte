<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  type Post = PageData["posts"][number];
  let active: Post = data.posts[0];

  onMount(() => {
    document.querySelector("input")?.focus();
  });
</script>

<div class="layout">
  <div class="master">
    <ul class="list">
      {#each data.posts as post}
        <li>
          <label class="item" class:active={post === active}>
            <input
              class="radio"
              type="radio"
              name="post"
              value={post}
              bind:group={active}
            />
            {#if post.thumbnail}
              <img class="thumbnail" src={post.thumbnail} alt="" /><br />
            {/if}
            <div class="label">{post.title}</div>
          </label>
        </li>
      {/each}
    </ul>
  </div>
  <div class="detail">
    {#if active}
      <h1 class="title"><a href={active.url}>{active.title}</a></h1>
      <div class="preview">
        {#if /(.jpg|.png)$/.exec(active.url)}
          <img class="stretch" src={active.url} alt="" />
        {:else}
          <iframe class="stretch" src={active.url} frameborder="0" title="" />
        {/if}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .layout {
    display: flex;
    width: 100%;
    height: 100%;
  }
  .master {
    height: 100vh;
    overflow-y: auto;
    background: #232031;
  }
  .list {
    list-style: none;
    padding: 0;
  }
  .item {
    display: flex;
    align-items: center;
    width: 30rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    &.active {
      background-color: #eee;
      color: black;
    }
  }
  .radio {
    width: 1px;
    height: 1px;
    opacity: 0.1;
  }
  .thumbnail {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 1rem;
  }
  .label {
    font-size: 1.4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .detail {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #2c283f;
  }
  .title {
    display: block;
    font-size: 3rem;
    padding: 1rem 2rem;
    margin: 0;
    text-align: center;
    a {
      text-decoration: none;
      color: #eee;

      &:hover {
        text-decoration: underline;
      }
    }
  }
  .preview {
    flex: 1;
    position: relative;
    background-color: #0d0b15;
  }
  .stretch {
    flex: 1;
    position: absolute;
    top: 2rem;
    left: 2rem;
    width: calc(100% - 4rem);
    height: calc(100% - 4rem);
    object-fit: contain;
  }
</style>
