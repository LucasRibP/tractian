import { Button, Divider } from "antd-mobile";
import { EditSOutline } from "antd-mobile-icons";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AppDispatch } from "../../../../../../core/redux/store";
import Machine from "../../../../../machine-managing/domain/entities/machine";
import { updateMachineValuesThunk } from "../../../redux/slices/update-machine-values-slice";
import MachineDetailsCard from "./machine-details-card";
import openMachineEditModal from "./open-machine-edit-modal";

const MachineDetails: FC<{ initialMachine: Machine }> = ({
  initialMachine,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [machine, setMachine] = useState(initialMachine);

  return (
    <>
      <MachineTitleContainer>
        <MachineTitle>{machine.name}</MachineTitle>
        <EditMachineTitleButtonContainer>
          <Button
            shape="rounded"
            onClick={() =>
              openMachineEditModal(machine, (update) => {
                dispatch(updateMachineValuesThunk(update));
                setMachine({ ...machine, ...update });
              })
            }
          >
            <EditSOutline />
          </Button>
        </EditMachineTitleButtonContainer>
      </MachineTitleContainer>
      <Divider
        style={{ color: "#cccccc", borderColor: "#cccccc", width: "80%" }}
      />

      <MachineDetailsCardContainer>
        <MachineDetailsCard machine={machine} />
      </MachineDetailsCardContainer>
    </>
  );
};

const MachineTitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const MachineTitle = styled.h1`
  margin-top: 35px;
  margin-bottom: 15px;
  font-size: 2.5rem;
`;

const EditMachineTitleButtonContainer = styled.div`
  position: absolute;
  top: 2.3rem;
  right: 1rem;
`;

const MachineDetailsCardContainer = styled.div`
  width: 90%;
`;

export default MachineDetails;
