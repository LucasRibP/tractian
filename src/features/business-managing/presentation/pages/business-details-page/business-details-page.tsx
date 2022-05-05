import { ProgressCircle } from "antd-mobile";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DataNotFound from "../../../../../core/components/data-not-found";
import BaseState from "../../../../../core/redux/base-state";
import { AppDispatch, RootState } from "../../../../../core/redux/store";
import Business from "../../../domain/entities/business";
import { getBusinessDataThunk } from "../../redux/slices/get-business-data-slice";
import BusinessDetails from "./components/business-details";

const BusinessDetailsPage: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getBusinessDataThunk(Number.parseInt(id ?? "") ?? ""));
  }, [dispatch, id]);

  const dataReq = useSelector((state: RootState) => state.getBusinessData);
  return (
    <Page>
      <LoadingComponentChooser {...dataReq} />
    </Page>
  );
};

const LoadingComponentChooser: FC<BaseState<Business>> = ({
  data,
  loading,
  error,
}) => {
  switch (loading) {
    case "idle":
      return <></>;
    case "pending":
      return <ProgressCircle />;
    case "failed":
      return <DataNotFound justification={error} />;
    case "succeeded":
      if (data !== undefined) {
        return <BusinessDetails business={data} />;
      } else {
        return <DataNotFound />;
      }
  }
};

const Page = styled.div`
  height: 100%;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default BusinessDetailsPage;
