export interface RtcProviderOperationErrorDto {
  statusCode: number;
  message: string;
  /** Normalized provider name */
  provider: string;
  operation: 'createRoom' | 'generateToken' | 'validateToken';
  /** Observed upstream provider status code */
  providerStatusCode: number;
  /** Provider-native error code */
  providerErrorCode: string;
  /** Whether client can retry safely */
  retryable: boolean;
  /** Provider-side error message */
  providerMessage: string;
}
