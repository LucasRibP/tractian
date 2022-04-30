import { isServerError } from "../error/errors";
import { Failure, ServerFailure, UntreatedErrorFailure } from "../error/failures";

class BaseRepository {
  getNetworkFailureType(error: unknown) : Failure {
    if (isServerError(error)) {
      const serverFailure: ServerFailure = {
        networkCode: error.networkCode,
        failureMessage: error.errorMessage
      }
      return serverFailure;
    }
    const untreatedErrorFailure: UntreatedErrorFailure = {failureMessage: "Erro não tratado ocorreu", untreatedError: error}
    return untreatedErrorFailure
  }


}

export default BaseRepository