import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import BusinessDetailsPage from "../../../features/business-managing/presentation/pages/business-details-page/business-details-page";
import BusinessSearchPage from "../../../features/business-managing/presentation/pages/business-search-page/business-search-page";
import MachineDetailsPage from "../../../features/machine-managing/presentation/pages/machine-details-page/machine-details-page";
import MachineSearchPage from "../../../features/machine-managing/presentation/pages/machine-search-page/machine-search-page";

const HomePageRoutes: FC = () => (
  <Routes>
    <Route path="business" element={<BusinessSearchPage />} />
    <Route path="business/:id" element={<BusinessDetailsPage />} />

    <Route path="machine" element={<MachineSearchPage />} />
    <Route path="machine/:id" element={<MachineDetailsPage />} />

    <Route path="user" element={<></>} />
    <Route path="user/:id" element={<></>} />
  </Routes>
);

export default HomePageRoutes;
