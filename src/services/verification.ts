import { HttpClient } from "../client";
import { CheckEmailResponse, CheckDomainResponse, VerificationResultData } from "../types";

export class VerificationService {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Verifies an email address.
   * Checks for disposable emails, role-based emails, blocklists, and MX records.
   * 
   * @param email The email address to verify.
   * @returns The verification result.
   */
  public checkEmail = async (email: string): Promise<CheckEmailResponse> => {
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      throw new Error("A valid email address is required.");
    }
    const encodedEmail = encodeURIComponent(email);
    return this.client["get"]<VerificationResultData>(`/verify/email/${encodedEmail}`);
  };

  /**
   * Verifies a domain name.
   * Checks for disposable domains, public email providers, and MX records.
   * 
   * @param domain The domain name to verify.
   * @returns The verification result.
   */
  public checkDomain = async (domain: string): Promise<CheckDomainResponse> => {
    if (!domain || typeof domain !== 'string') {
      throw new Error("A valid domain name is required.");
    }
    const encodedDomain = encodeURIComponent(domain);
    return this.client["get"]<VerificationResultData>(`/verify/domain/${encodedDomain}`);
  };
}
