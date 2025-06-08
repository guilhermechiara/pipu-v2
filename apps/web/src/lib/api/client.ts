export type ApiResponse<T> = {
  data: T;
  status: number;
  headers: Record<string, string>;
};

export type ApiError = {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
};

enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

interface RequestOptions extends Omit<RequestInit, "method" | "body"> {
  data?: unknown;
}

class ApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || "") {
    this.baseUrl = baseUrl;
  }

  async get<T>(
    endpoint: string,
    options: RequestOptions = {},
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, HttpMethod.GET, options);
  }

  async post<T>(
    endpoint: string,
    data: unknown,
    options: RequestOptions = {},
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, HttpMethod.POST, { ...options, data });
  }

  async put<T>(
    endpoint: string,
    data: unknown,
    options: RequestOptions = {},
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, HttpMethod.PUT, { ...options, data });
  }

  async patch<T>(
    endpoint: string,
    data: unknown,
    options: RequestOptions = {},
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, HttpMethod.PATCH, { ...options, data });
  }

  async delete<T>(
    endpoint: string,
    options: RequestOptions = {},
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, HttpMethod.DELETE, options);
  }

  private async request<T>(
    endpoint: string,
    method: HttpMethod,
    options: RequestOptions = {},
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const requestOptions = this.buildRequestOptions(method, options);

    try {
      const response = await fetch(url, requestOptions);
      return await this.handleResponse<T>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private buildRequestOptions(
    method: HttpMethod,
    options: RequestOptions,
  ): RequestInit {
    const { data, ...restOptions } = options;

    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    const requestOptions: RequestInit = {
      ...restOptions,
      method,
      headers,
    };

    if (data && method !== HttpMethod.GET) {
      requestOptions.body = JSON.stringify(data);
    }

    return requestOptions;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || "An error occurred",
        errors: data.errors,
      } as ApiError;
    }

    return {
      data,
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
    };
  }

  private handleError(error: unknown): ApiError {
    if ((error as ApiError).status) {
      return error as ApiError;
    }

    return {
      status: 500,
      message: (error as Error).message || "Network error",
    } as ApiError;
  }
}

export const apiClient = new ApiClient();
