export interface Failure {
  failureMessage: string
}

export interface ServerFailure extends Failure {
  networkCode: number
}

export interface UntreatedErrorFailure extends Failure {
  untreatedError: unknown
}
