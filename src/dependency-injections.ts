import { asClass, createContainer, InjectionMode } from "awilix";
import TractianDataSource from "./core/network/tractian-api/tractian-data-source";
import TractianApiBusinessManagingRemoteDataSource from "./features/business-managing/data/data-sources/tractian-api-business-managing-remote-data-source";
import BusinessManagingRepositoryImpl from "./features/business-managing/data/repositories/business-managing-repository-impl";
import GetBusinessData from "./features/business-managing/domain/use-cases/get-business-data";
import SearchAllBusinesses from "./features/business-managing/domain/use-cases/search-all-businesses";
import UpdateBusinessValues from "./features/business-managing/domain/use-cases/update-business-values";
import TractianApiMachineManagingRemoteDataSource from "./features/machine-managing/data/data-sources/tractian-api-machine-managing-remote-data-source";
import MachineManagingRepositoryImpl from "./features/machine-managing/data/repositories/machine-managing-repository-impl";
import GetMachineData from "./features/machine-managing/domain/use-cases/get-machine-data";
import SearchAllMachines from "./features/machine-managing/domain/use-cases/search-all-machines";
import UpdateMachineValues from "./features/machine-managing/domain/use-cases/update-machine-values";
import TractianApiUserManagingRemoteDataSource from "./features/user-managing/data/data-sources/tractian-api-user-managing-remote-data-source";
import UserManagingRepositoryImpl from "./features/user-managing/data/repositories/user-managing-repository-impl";
import DelegateUserForMachine from "./features/user-managing/domain/use-cases/delegate-user-for-machine";
import GetMachinesAvaliableForUser from "./features/user-managing/domain/use-cases/get-machines-avaliable-for-user";
import GetUserData from "./features/user-managing/domain/use-cases/get-user-data";
import SearchAllUsers from "./features/user-managing/domain/use-cases/search-all-users";
import UpdateUserValues from "./features/user-managing/domain/use-cases/update-user-values";

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  // Core
  tractianDataSource: asClass(TractianDataSource).singleton(),

  // Business Managing Feature
  businessManagingRemoteDataSource: asClass(
    TractianApiBusinessManagingRemoteDataSource
  ).singleton(),

  businessManagingRepository: asClass(
    BusinessManagingRepositoryImpl
  ).singleton(),

  getBusinessData: asClass(GetBusinessData).singleton(),
  searchAllBusinesses: asClass(SearchAllBusinesses).singleton(),
  updateBusinessValues: asClass(UpdateBusinessValues).singleton(),
  updateUnitValues: asClass(UpdateBusinessValues).singleton(),

  // Machine Managing Feature
  machineManagingRemoteDataSource: asClass(
    TractianApiMachineManagingRemoteDataSource
  ).singleton(),

  machineManagingRepository: asClass(MachineManagingRepositoryImpl).singleton(),

  getMachineData: asClass(GetMachineData).singleton(),
  searchAllMachines: asClass(SearchAllMachines).singleton(),
  updateMachineValues: asClass(UpdateMachineValues).singleton(),

  // User Managing Feature
  userManagingRemoteDataSource: asClass(
    TractianApiUserManagingRemoteDataSource
  ).singleton(),

  userManagingRepository: asClass(UserManagingRepositoryImpl).singleton(),

  getUserData: asClass(GetUserData).singleton(),
  searchAllUsers: asClass(SearchAllUsers).singleton(),
  updateUserValues: asClass(UpdateUserValues).singleton(),
  getMachinesAvaliableForUser: asClass(GetMachinesAvaliableForUser).singleton(),
  delegateUserForMachine: asClass(DelegateUserForMachine).singleton(),
});

export { container };
