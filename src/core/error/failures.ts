export interface Failure {
  failureMessage: string
}

export interface ServerFailure extends Failure {
  networkCode: string
}

export interface UntreatedErrorFailure extends Failure {
  untreatedError: unknown
}
