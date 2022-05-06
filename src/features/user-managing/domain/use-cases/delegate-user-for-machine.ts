import { Failure } from "../../../../core/error/failures";
import MachineUserDelegation from "../entities/machine-user-delegation";
import UserManagingRepository from "../repositories/user-managing-repository";

class DelegateUserForMachine {
  repository: UserManagingRepository;

  constructor({
    userManagingRepository,
  }: {
    userManagingRepository: UserManagingRepository;
  }) {
    this.repository = userManagingRepository;
  }

  execute = async (
    delegation: MachineUserDelegation
  ): Promise<boolean | Failure> => {
    return await this.repository.delegateUserForMachine(delegation);
  };
}

export default DelegateUserForMachine;
