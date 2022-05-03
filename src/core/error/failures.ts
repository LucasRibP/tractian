export interface Failure {
  failureMessage: string;
}

export function isFailure(obj: any): obj is Failure {
  return "failureMessage" in obj;
}

export interface ServerFailure extends Failure {
  networkCode: number;
}

export interface UntreatedErrorFailure extends Failure {
  untreatedError: unknown;
}
