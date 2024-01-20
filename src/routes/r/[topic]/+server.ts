import { redirect, type RequestHandler } from "@sveltejs/kit";

// eslint-disable-next-line import/prefer-default-export
export const GET: RequestHandler = async ({ params }) => {
  redirect(302, `/r/${params.topic}.json`);
};
