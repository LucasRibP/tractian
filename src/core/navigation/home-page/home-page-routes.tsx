import { FC } from "react";
import { Route, Routes } from "react-router-dom";

const HomePageRoutes: FC = () => (
  <Routes>
    <Route path="business" element={<></>} />
    <Route path="machine" element={<></>} />
    <Route path="user" element={<></>} />
  </Routes>
);

export default HomePageRoutes;
