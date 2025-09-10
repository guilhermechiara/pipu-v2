import { ApiError, SerializedApiError } from "../apiError";
import { ERROR_CODES } from "@pipu/api";

export type HttpResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: SerializedApiError };

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ClientOptions = {
  baseUrl: string;
  beforeFetch?: () => Promise<Partial<RequestInit>> | Partial<RequestInit>;
  defaults?: Omit<RequestInit, "headers"> & {
    headers?: Record<string, string>;
  };
  timeoutMs?: number;
};

type RequestOptions = Omit<RequestInit, "body" | "headers"> & {
  searchParams?: Record<string, any>;
  body?: unknown;
  headers?: Record<string, string>;
};

export class ApiClient {
  private readonly baseUrl: string;
  private readonly beforeFetch?: ClientOptions["beforeFetch"];
  private readonly defaults?: ClientOptions["defaults"];
  private readonly timeoutMs: number;

  constructor(opts: ClientOptions) {
    this.baseUrl = opts.baseUrl.replace(/\/+$/, "");
    this.beforeFetch = opts.beforeFetch;
    this.defaults = opts.defaults;
    this.timeoutMs = opts.timeoutMs ?? 15000;
  }

  get<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>("GET", endpoint, options);
  }
  post<T>(endpoint: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>("POST", endpoint, { ...options, body });
  }
  put<T>(endpoint: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>("PUT", endpoint, { ...options, body });
  }
  patch<T>(endpoint: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>("PATCH", endpoint, { ...options, body });
  }
  delete<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>("DELETE", endpoint, options);
  }

  async request<T>(
    method: HttpMethod,
    endpoint: string,
    options: RequestOptions = {},
  ): Promise<HttpResult<T>> {
    const url = this._buildUrl(endpoint, options.searchParams);
    const { body, headers: bodyHeaders } = this._prepareBody(options.body);
    const dynamicOptions = (await this.beforeFetch?.()) ?? {};

    const headers = this._mergeHeaders(
      { Accept: "application/json" },
      bodyHeaders,
      this.defaults?.headers,
      options.headers,
      dynamicOptions.headers as Record<string, string>,
    );

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort("Timeout"), this.timeoutMs);

    const requestInit: RequestInit = {
      ...this.defaults,
      ...options,
      ...dynamicOptions,
      method,
      headers,
      body,
      signal: controller.signal,
    };

    try {
      const response = await fetch(url.toString(), requestInit);
      return await this._handleResponse<T>(response);
    } catch (err) {
      if (err instanceof ApiError) throw err;
      const message =
        err instanceof Error
          ? err.message
          : "An unknown network error occurred";
      throw new ApiError({
        code: ERROR_CODES.GENERIC.UNKNOWN_ERROR,
        description: message,
        statusCode: 503,
      });
    } finally {
      clearTimeout(timer);
    }
  }

  private _buildUrl(
    endpoint: string,
    searchParams?: Record<string, string | number | boolean | null | undefined>,
  ): string {
    const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    let full = `${this.baseUrl.replace(/\/+$/, "")}${path}`;

    if (searchParams && Object.keys(searchParams).length) {
      const qs = new URLSearchParams();
      for (const [k, v] of Object.entries(searchParams)) {
        if (v !== undefined && v !== null) qs.set(k, String(v));
      }
      full += (full.includes("?") ? "&" : "?") + qs.toString();
    }
    return full;
  }

  private _prepareBody(body: unknown): {
    body?: BodyInit;
    headers: HeadersInit;
  } {
    if (body === undefined || body === null) {
      return { body: undefined, headers: {} };
    }
    if (
      typeof body === "string" ||
      body instanceof URLSearchParams ||
      body instanceof FormData ||
      body instanceof Blob ||
      body instanceof ArrayBuffer ||
      ArrayBuffer.isView(body)
    ) {
      return { body: body as BodyInit, headers: {} };
    }
    return {
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    };
  }

  private _mergeHeaders(
    ...headersSources: (HeadersInit | undefined)[]
  ): Headers {
    const headers = new Headers(this.defaults?.headers);
    for (const source of headersSources) {
      if (source) {
        for (const [key, value] of Object.entries(source)) {
          headers.set(key, value);
        }
      }
    }
    return headers;
  }

  private async _handleResponse<T>(response: Response): Promise<HttpResult<T>> {
    if (!response.ok) {
      return {
        ok: false,
        error: (await ApiError.fromResponse(response)).toJSON(),
      };
    }

    const contentType = response.headers.get("content-type") || "";
    let data: unknown = null;

    if (response.status !== 204 && contentType) {
      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }
    }

    return {
      ok: true,
      data: data as T,
    };
  }
}
