import { asClass, createContainer, InjectionMode } from "awilix";
import TractianDataSource from "./core/network/tractian-api/tractian-data-source";
import BusinessManagingRepositoryImpl from "./features/business-managing/data/repositories/business-managing-repository-impl";
import GetBusinessData from "./features/business-managing/domain/use-cases/get-business-data";
import SearchAllBusinesses from "./features/business-managing/domain/use-cases/search-all-businesses";
import UpdateBusinessValues from "./features/business-managing/domain/use-cases/update-business-values";

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  // Business Managing Feature
  businessManagingRemoteDataSource: asClass(TractianDataSource).singleton(),

  businessManagingRepository: asClass(
    BusinessManagingRepositoryImpl
  ).singleton(),

  getBusinessData: asClass(GetBusinessData).singleton(),
  searchAllBusinesses: asClass(SearchAllBusinesses).singleton(),
  updateBusinessValues: asClass(UpdateBusinessValues).singleton(),
  updateUnitValues: asClass(UpdateBusinessValues).singleton(),
});

export { container };
