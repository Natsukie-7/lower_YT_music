type Params = Record<string, string | number | boolean>;

interface GetConfig<P extends Params = Params> {
  params?: P;
  headers?: HeadersInit;
}

interface BodyConfig<B = unknown> {
  body?: B;
  headers?: HeadersInit;
}

export class ApiFactory {
  constructor(
    private csrf: string,
    private baseURL: string = "/api"
  ) {}

  private resolveUrl(url: string) {
    if (url.startsWith("http")) return url;
    return `${this.baseURL.replace(/\/+$/, "")}/${url.replace(/^\/+/, "")}`;
  }

  private buildQuery(params?: Params) {
    if (!params) return "";

    const search = new URLSearchParams();

    Object.entries(params)
      .filter(([_, v]) => v != null)
      .forEach(([key, value]) => search.append(key, String(value)));

    return search.toString() ? `?${search.toString()}` : "";
  }

  private async request<R>(
    method: string,
    url: string,
    config?: BodyConfig
  ): Promise<{ data: R; status: number }> {
    const response = await fetch(this.resolveUrl(url), {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": this.csrf,
        Authorization: `Bearer ${localStorage.getItem("apiAuthorizationKey")}`,
        ...(config?.headers ?? {}),
      },
      body: config?.body ? JSON.stringify(config.body) : undefined,
    });

    const contentType = response.headers.get("content-type");
    let data: any;
    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return { data, status: response.status };
  }

  get<R, P extends Params = Params>(
    url: string,
    config?: GetConfig<P>
  ): Promise<{ data: R; status: number }> {
    const query = this.buildQuery(config?.params);
    return this.request<R>("GET", url + query, { headers: config?.headers });
  }

  post<R, B = unknown>(
    url: string,
    body?: B,
    config?: BodyConfig
  ): Promise<{ data: R; status: number }> {
    return this.request<R>("POST", url, { ...config, body });
  }

  put<R, B = unknown>(
    url: string,
    body?: B,
    config?: BodyConfig
  ): Promise<{ data: R; status: number }> {
    return this.request<R>("PUT", url, { ...config, body });
  }

  delete<R, B = unknown>(
    url: string,
    body?: B,
    config?: BodyConfig
  ): Promise<{ data: R; status: number }> {
    return this.request<R>("DELETE", url, { ...config, body });
  }
}
