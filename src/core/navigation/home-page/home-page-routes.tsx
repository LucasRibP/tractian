import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import BusinessManagingPage from "../../../features/business-managing/presentation/pages/business-managing-page";

const HomePageRoutes: FC = () => (
  <Routes>
    <Route path="business" element={<BusinessManagingPage />} />
    <Route path="machine" element={<></>} />
    <Route path="user" element={<></>} />
  </Routes>
);

export default HomePageRoutes;
