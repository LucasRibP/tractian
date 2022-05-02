export interface ServerError {
  errorMessage: string
  networkCode: number
}

export function isServerError(obj: any): obj is ServerError {
  return "errorMessage" in obj && "networkCode" in obj;
}