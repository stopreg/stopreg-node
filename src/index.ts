import { HttpClient } from "./client";
import { VerificationService } from "./services/verification";
import { StopRegConfig } from "./types";

export * from "./types";
export * from "./errors";

export class StopReg extends HttpClient {
  public verification: VerificationService;

  /**
   * Initialize the StopReg client.
   * 
   * @param config Configuration options containing the API token.
   */
  constructor(config: StopRegConfig) {
    super(config);
    this.verification = new VerificationService(this);
  }
}

export default StopReg;
