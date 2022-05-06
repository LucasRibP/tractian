import { Card, Image } from "antd-mobile";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Machine from "../../../../domain/entities/machine";
import MachineHealthChart from "./machine-health-chart";

const MachineDetailsCard: FC<{ machine: Machine }> = ({ machine }) => {
  const navigate = useNavigate();
  return (
    <Card title={<MachineDetailsCardHeader machine={machine} />}>
      <MachineDetailsCardBody machine={machine} />
    </Card>
  );
};

const MachineDetailsCardHeader: FC<{ machine: Machine }> = ({ machine }) => {
  return (
    <MachineDetailsCardHeaderContainer>
      <Image
        src={machine.image}
        width={100}
        height={100}
        fit="cover"
        style={{ borderRadius: 8 }}
      />
      <MachineDetailsBasicInfoContainer>
        <MachineDetailsBasicInfoText>
          Modelo: {machine.model}
        </MachineDetailsBasicInfoText>
        <MachineDetailsBasicInfoText>
          Sensores: {machine.sensors.join("|")}
        </MachineDetailsBasicInfoText>
        <MachineDetailsBasicInfoText>
          Status: {machine.status}
        </MachineDetailsBasicInfoText>
      </MachineDetailsBasicInfoContainer>
    </MachineDetailsCardHeaderContainer>
  );
};

const MachineDetailsCardBody: FC<{ machine: Machine }> = ({ machine }) => {
  return (
    <MachineDetailsCardBodyContainer>
      <MachineHealthChart percentage={machine.healthscore} />
    </MachineDetailsCardBodyContainer>
  );
};

const MachineDetailsCardHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const MachineDetailsCardBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const MachineDetailsBasicInfoContainer = styled.div`
  margin-left: 1.5rem;
`;
const MachineDetailsBasicInfoText = styled.div`
  font-size: 1.4rem;
`;

export default MachineDetailsCard;
