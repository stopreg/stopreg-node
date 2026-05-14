import { StopRegConfig, StopRegApiResponse } from "./types";
import { 
  StopRegError, 
  StopRegAuthenticationError, 
  StopRegRateLimitError, 
  StopRegValidationError 
} from "./errors";

export class HttpClient {
  private static readonly BASE_URL = "https://api.stopreg.com/api/v1";
  private config: Required<StopRegConfig>;

  constructor(config: StopRegConfig) {
    if (!config.apiToken) {
      throw new Error("StopReg apiToken is required.");
    }
    this.config = {
      apiToken: config.apiToken,
      timeout: config.timeout || 15000,
    };
  }

  protected get = async <T>(path: string): Promise<StopRegApiResponse<T>> => {
    const url = `${HttpClient.BASE_URL}${path}`;
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "x-api-token": this.config.apiToken,
    };

    let response: Response;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      response = await fetch(url, {
        method: "GET",
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
    } catch (error: any) {
      if (error.name === "AbortError") {
        throw new StopRegError("Request timed out.", 408);
      }
      throw new StopRegError(`Network error: ${error.message}`, 0);
    }

    let payload: StopRegApiResponse<T>;
    try {
      payload = await response.json();
      payload.status = response.status;
    } catch (e) {
      throw new StopRegError(`Failed to parse JSON response from ${url}`, response.status);
    }

    if (!response.ok) {
      this.handleHttpError(response.status, payload);
    }

    return payload;
  };

  private handleHttpError = (status: number, payload: any): never => {
    const message = payload?.description || payload?.message || "An error occurred with the StopReg API.";
    
    switch (status) {
      case 400:
        throw new StopRegValidationError(message, payload);
      case 401:
        throw new StopRegAuthenticationError(message, payload);
      case 403: // Typically quota limit in StopReg API
      case 429:
        throw new StopRegRateLimitError(message, payload);
      default:
        throw new StopRegError(message, status, payload);
    }
  };
}
