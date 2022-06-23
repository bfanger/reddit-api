/**
 * DTO (Data Transfer Objects) are types defined by the (external) API
 */

export type ApiGetResponse = {
  "r/[topic].json": ListingDto;
};

export type ListingDto = {
  next: string;
  posts: Array<{
    id: string;
    url: string;
    title: string;
    description: string;
    created: number;
    thumbnail?: string;
    video?: string;
    embed?: string;
  }>;
};

export type ApiPostResponse = any;
