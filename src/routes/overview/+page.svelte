<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  type Post = PageData["posts"][number];

  export let data: PageData;

  let index = 0;

  $: imagePosts = data.posts.filter((post) => post.url.match(/(.jpg|.png)$/));
  $: current = imagePosts[index];
  $: next = imagePosts[index + 1];
  $: preload(next);

  function preload(post: Post) {
    if (browser) {
      new Image().src = post.url;
    }
  }

  let el: HTMLInputElement | undefined;
  onMount(() => {
    el?.focus();
  });
</script>

<div class="layout">
  <div class="master">
    <ul class="list">
      {#each imagePosts as post, i (post.id)}
        <li>
          <label class="item" class:active={i === index}>
            <input
              bind:this={el}
              class="radio"
              type="radio"
              name="post"
              value={i}
              bind:group={index}
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
    {#if current}
      <h1 class="title"><a href={current.url}>{current.title}</a></h1>
      <div class="preview">
        {#key current.url}
          <img class="stretch" src={current.url} alt="" />
        {/key}
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
