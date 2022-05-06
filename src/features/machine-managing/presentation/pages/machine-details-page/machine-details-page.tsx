import { ProgressCircle } from "antd-mobile";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DataNotFound from "../../../../../core/components/data-not-found";
import BaseState from "../../../../../core/redux/base-state";
import { AppDispatch, RootState } from "../../../../../core/redux/store";
import Machine from "../../../domain/entities/machine";
import { getMachineDataThunk } from "../../redux/slices/get-machine-data-slice";
import MachineDetails from "./components/machine-details";

const MachineDetailsPage: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getMachineDataThunk(Number.parseInt(id ?? "") ?? ""));
  }, [dispatch, id]);

  const dataReq = useSelector((state: RootState) => state.getMachineData);
  return (
    <Page>
      <LoadingComponentChooser {...dataReq} />
    </Page>
  );
};

const LoadingComponentChooser: FC<BaseState<Machine>> = ({
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
        return <MachineDetails initialMachine={data} />;
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

export default MachineDetailsPage;
