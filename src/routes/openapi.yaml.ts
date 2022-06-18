import type { RequestHandler } from "@sveltejs/kit";
import yml from "../openapi.yaml?raw";

// eslint-disable-next-line import/prefer-default-export
export const get: RequestHandler = async () => {
  return {
    headers: {
      "Content-Type": "text/yaml",
      //   Location: `/r/${params.topic}.json`,
    },
    body: yml,
  };
};
