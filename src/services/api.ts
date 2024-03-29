/**
 * Typed api wrapper with injectable fetch for SSR
 *
 * The responses of the api methods contain the data direcly but also have a hidden property.
 * This allows access to the headers and http status of the response using the helper methods.
 */
import { error, type NumericRange } from "@sveltejs/kit";
import buildUrl from "./buildUrl";
import type { ApiGetResponse } from "./api-types-reddit";

const endpoint = "/";

type Config = RequestInit & {
  params?: Record<string, string>;
  fetch?: typeof fetch;
  ssrCache?: number;
};
const responseSymbol = Symbol("response");
type ApiResponse<T = unknown> = T & { [responseSymbol]: Response };

async function wrapped(
  method: RequestInit["method"],
  path: string,
  config: Config,
): Promise<any> {
  // eslint-disable-next-line prefer-const
  let { ssrCache, fetch, params, ...init } = config;
  params = params || {};
  if (!fetch) {
    if (typeof window === "undefined") {
      throw new Error("Missing config.fetch");
    }
    fetch = window.fetch;
  }
  if (ssrCache && typeof window === "undefined") {
    init.headers = new Headers(init.headers);
    init.headers.append("Svelte-Cache", `${ssrCache}`);
  }
  init.method = method;
  const url = endpoint + buildUrl(path, params);
  const start = Date.now();
  let response: Response;
  try {
    response = await fetch(url, init);
  } catch (err: any) {
    if (err.message) {
      throw new Error(`${method} ${url} failed: ${err.message}`);
    }
    throw err;
  }
  const duration = (Date.now() - start) / 1000;
  if (duration > 1) {
    console.info(
      `${method} ${url.substring(endpoint.length)} took ${duration.toFixed(
        3,
      )}s`,
    );
  }
  if (!response.ok) {
    const err = error(
      response.status as NumericRange<400, 599>,
      `${method} ${url} failed: ${response.status} ${response.statusText}`,
    ) as any as ApiResponse<Error>;
    err[responseSymbol] = response;
    throw err;
  }
  const data = await response.json();
  if (config.signal && config.signal.aborted) {
    throw new Error("Aborted");
  }
  data[responseSymbol] = response;
  return data;
}
const api = {
  get<T extends keyof ApiGetResponse>(
    path: T,
    config?: Config,
  ): Promise<ApiResponse<ApiGetResponse[T]>> {
    return wrapped("GET", path, config || {});
  },
};
export default api;

function getResponse(dataOrError: ApiResponse | unknown): Response | undefined {
  if (typeof dataOrError === "object" && dataOrError !== null) {
    return (dataOrError as any)[responseSymbol];
  }
  return undefined;
}

export function getStatus(
  dataOrError: ApiResponse | unknown,
): number | undefined {
  const response = getResponse(dataOrError);
  if (response) {
    return response.status;
  }
  return undefined;
}

export function getStatusText(
  dataOrError: ApiResponse | unknown,
): string | undefined {
  const response = getResponse(dataOrError);
  if (response) {
    return response.statusText;
  }
  return undefined;
}

export function getHeader(
  dataOrError: ApiResponse | unknown,
  name: string,
): string | undefined {
  const response = getResponse(dataOrError);
  if (response) {
    const value = response.headers.get(name);
    if (value !== null) {
      return value;
    }
  }
  return undefined;
}
