export interface ServerError extends Error {
  errorMessage: string
  networkCode: string
}

export function isServerError(obj: any): obj is ServerError {
  return "errorMessage" in obj && "networkCode" in obj;
}