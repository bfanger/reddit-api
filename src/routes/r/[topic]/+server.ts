import { redirect } from "@sveltejs/kit";

// eslint-disable-next-line import/prefer-default-export
export function GET({ params }) {
  redirect(302, `/r/${params.topic}.json`);
}
