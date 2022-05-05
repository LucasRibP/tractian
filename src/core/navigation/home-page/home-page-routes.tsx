import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import BusinessDetailsPage from "../../../features/business-managing/presentation/pages/business-details-page/business-details-page";
import BusinessSearchPage from "../../../features/business-managing/presentation/pages/business-search-page/business-search-page";

const HomePageRoutes: FC = () => (
  <Routes>
    <Route path="business" element={<BusinessSearchPage />} />
    <Route path="business/:id" element={<BusinessDetailsPage />} />

    <Route path="machine" element={<></>} />
    <Route path="machine/:id" element={<></>} />

    <Route path="user" element={<></>} />
    <Route path="user/:id" element={<></>} />
  </Routes>
);

export default HomePageRoutes;
