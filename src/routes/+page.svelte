<svelte:head>
  <title>API demo</title>
</svelte:head>

<section>
  <a href="/swagger-ui">API docs</a>
  <pre>
export type ApiGetResponse = {"{"}
  "r/[topic].json": ListingDto;
{"}"}

type ListingDto = {"{"}
  next: string;
  after: string;
  posts: Array&lt;{"{"}
    id: string;
    url: string;
    title: string;
    description: string;
    created: number;
    thumbnail?: string;
    video?: string;
    embed?: string;
  {"}"}&gt;
{"}"}
  </pre>
</section>

<style>
  section {
    text-align: center;
    padding: 4rem;
  }
  pre {
    background: #4c4a4a;
    padding: 1em;
    width: 30em;
    margin-inline: auto;
    text-align: left;
  }
</style>
