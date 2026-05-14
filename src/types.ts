export interface StopRegConfig {
  /**
   * Your StopReg API Token.
   */
  apiToken: string;
  

  /**
   * Optional custom timeout in milliseconds.
   */
  timeout?: number;
}

export interface VerificationInput {
  suggestion: string | null;
  email?: string;
  normalized?: string;
  domain?: string;
}

export interface VerificationDomain {
  name: string;
  /**
   * The age of the domain in days.
   * Can be a number or a string like "Login to view registration date" if not authenticated with sufficient privileges.
   */
  domain_age_in_days: number | string;
  provider: string;
}

export interface MxProvider {
  slug: string;
  service_type: string;
  grade: string;
}

export interface VerificationMailServer {
  mx_found: boolean;
  mx_records: string[];
  mx_provider: MxProvider[];
}

export interface VerificationClassification {
  is_disposable: boolean;
  is_relay: boolean;
  is_unresolved: boolean;
  is_public: boolean;
  is_role_based?: boolean;
  is_alias?: boolean;
}

export interface VerificationPolicy {
  /**
   * Boolean if explicitly known, or a string prompt for login/upgrade.
   */
  blocklisted: boolean | string;
  /**
   * Boolean if explicitly known, or a string prompt for login/upgrade.
   */
  allowlisted: boolean | string;
}

export interface VerificationResultData {
  input: VerificationInput;
  domain: VerificationDomain;
  mail_server: VerificationMailServer;
  classification: VerificationClassification;
  policy: VerificationPolicy;
}

export interface StopRegApiResponse<T> {
  status: number;
  message: string;
  description: string;
  data: T | null;
  error?: string;
}

export type CheckEmailResponse = StopRegApiResponse<VerificationResultData>;
export type CheckDomainResponse = StopRegApiResponse<VerificationResultData>;
