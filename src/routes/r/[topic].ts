import type { RequestHandler } from "@sveltejs/kit";

// eslint-disable-next-line import/prefer-default-export
export const get: RequestHandler = async ({ params }) => {
  return {
    status: 302,
    headers: {
      Location: `/r/${params.topic}.json`,
    },
  };
};
