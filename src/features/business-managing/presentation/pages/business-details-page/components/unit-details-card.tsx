import { Button, Card, List } from "antd-mobile";
import {
  EditSOutline,
  HeartFill,
  SearchOutline,
  SmileFill,
} from "antd-mobile-icons";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Unit from "../../../../domain/entities/unit";

const UnitDetailsCard: FC<{ unit: Unit }> = ({ unit }) => {
  const navigate = useNavigate();
  return (
    <Card title={<UnitDetailsCardTitle title={unit.name} onEdit={() => {}} />}>
      <List header="Máquinas">
        {unit.machines.map((machine) => (
          <List.Item
            prefix={<HeartFill />}
            onClick={() => navigate(`machine/${machine.id}`)}
          >
            {machine.name}
          </List.Item>
        ))}
      </List>
      <List header="Usuários">
        {unit.users.map((user) => (
          <List.Item
            prefix={<SmileFill />}
            onClick={() => navigate(`user/${user.id}`)}
          >
            {user.name}
          </List.Item>
        ))}
      </List>
    </Card>
  );
};

const UnitDetailsCardTitle: FC<{ title: string; onEdit(): void }> = ({
  title,
  onEdit,
}) => {
  return (
    <UnitDetailsCardTitleContailer>
      <CardTitle>{title}</CardTitle>
      <EditButtonContainer>
        <Button shape="rounded">
          <EditSOutline />
        </Button>
      </EditButtonContainer>
    </UnitDetailsCardTitleContailer>
  );
};

const UnitDetailsCardTitleContailer = styled.div`
  width: 85vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const EditButtonContainer = styled.div``;

const CardTitle = styled.h2`
  margin: 0.5rem 0 0 1rem;
`;

export default UnitDetailsCard;
