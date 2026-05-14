export class StopRegError extends Error {
  public status: number;
  public data?: any;

  constructor(message: string, status: number = 500, data?: any) {
    super(message);
    this.name = "StopRegError";
    this.status = status;
    this.data = data;
    
    // Set prototype explicitly for correct `instanceof` behavior in TS/JS
    Object.setPrototypeOf(this, StopRegError.prototype);
  }
}

export class StopRegAuthenticationError extends StopRegError {
  constructor(message: string, data?: any) {
    super(message, 401, data);
    this.name = "StopRegAuthenticationError";
    Object.setPrototypeOf(this, StopRegAuthenticationError.prototype);
  }
}

export class StopRegRateLimitError extends StopRegError {
  constructor(message: string, data?: any) {
    super(message, 429, data);
    this.name = "StopRegRateLimitError";
    Object.setPrototypeOf(this, StopRegRateLimitError.prototype);
  }
}

export class StopRegValidationError extends StopRegError {
  constructor(message: string, data?: any) {
    super(message, 400, data);
    this.name = "StopRegValidationError";
    Object.setPrototypeOf(this, StopRegValidationError.prototype);
  }
}
