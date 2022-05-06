import { Card, Divider, Image, List } from "antd-mobile";
import { GlobalOutline, TagOutline, UserOutline } from "antd-mobile-icons";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Machine, {
  machineKeyTranslations,
  machineStatusColors,
  machineStatusTranslations,
  machineValuesUnits,
} from "../../../../domain/entities/machine";
import MachineHealthChart from "./machine-health-chart";

const MachineDetailsCard: FC<{ machine: Machine }> = ({ machine }) => {
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
          Status: {machineStatusTranslations[machine.status]}
        </MachineDetailsBasicInfoText>
      </MachineDetailsBasicInfoContainer>
    </MachineDetailsCardHeaderContainer>
  );
};
const MachineDetailsBasicInfoText = styled.div`
  font-size: 1.4rem;
`;
const MachineDetailsBasicInfoContainer = styled.div`
  margin-left: 1.5rem;
`;

const MachineDetailsCardHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const MachineDetailsCardBody: FC<{ machine: Machine }> = ({ machine }) => {
  const navigate = useNavigate();
  return (
    <MachineDetailsCardBodyContainer>
      <MachineHealthChartContainer>
        <MachineHealthChart percentage={machine.healthscore} />
      </MachineHealthChartContainer>
      <Divider />
      <MachineDetailsListContainer>
        <List header={"Especificações"}>
          {Object.entries(machine.specifications).map(([key, value]) => (
            <List.Item>
              {machineKeyTranslations[key]}: {value}
              {machineValuesUnits[key]}
            </List.Item>
          ))}
        </List>
      </MachineDetailsListContainer>
      <MachineDetailsListContainer>
        <List header={"Métricas"}>
          {Object.entries(machine.metrics).map(([key, value]) => (
            <List.Item>
              {machineKeyTranslations[key]}: {value}
              {machineValuesUnits[key]}
            </List.Item>
          ))}
        </List>
      </MachineDetailsListContainer>
      <MachineDetailsListContainer>
        <List header={"Relacionados"}>
          <List.Item
            prefix={<GlobalOutline />}
            onClick={() => navigate(`../../business/${machine.companyId}`)}
          >
            {machine.companyName}
          </List.Item>
          <List.Item>
            <IconNameRelatedContainer>
              <TagOutline fontSize={24} />
              <NameRelatedContainer>{machine.unitName}</NameRelatedContainer>
            </IconNameRelatedContainer>
          </List.Item>
          {machine.delegateName !== undefined &&
          machine.delegateId !== undefined ? (
            <List.Item
              onClick={() => navigate(`../../user/${machine.delegateId}`)}
            >
              <IconNameRelatedContainer>
                <UserOutline fontSize={24} />
                <NameRelatedContainer>
                  {machine.delegateName}
                </NameRelatedContainer>
              </IconNameRelatedContainer>
            </List.Item>
          ) : (
            <></>
          )}
        </List>
      </MachineDetailsListContainer>
    </MachineDetailsCardBodyContainer>
  );
};
const MachineDetailsCardBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MachineHealthChartContainer = styled.div``;

const MachineDetailsListContainer = styled.div`
  margin-bottom: 0.8rem;
`;

const IconNameRelatedContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NameRelatedContainer = styled.div`
  margin-left: 0.6rem;
`;

export default MachineDetailsCard;
