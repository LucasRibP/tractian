import { FC } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../../../../core/redux/store";
import MachineSearchResultCard from "./machine-search-result-card";

const MachineSearchResultList: FC = () => {
  const machineHeaders = useSelector(
    (state: RootState) => state.searchAllMachines.data
  );
  return (
    <ListHolder>
      {machineHeaders?.map((machineHeader) => (
        <CardContainer key={machineHeader.id}>
          <MachineSearchResultCard machineHeader={machineHeader} />
        </CardContainer>
      )) ?? <></>}
    </ListHolder>
  );
};

export default MachineSearchResultList;

const ListHolder = styled.div`
  min-height: 85vh;
  margin-top: 1rem;
  width: 90%;
`;
const CardContainer = styled.div`
  margin-bottom: 0.4rem;
`;
