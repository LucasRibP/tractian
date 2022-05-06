import { Button, Card, List } from "antd-mobile";
import { EditSOutline, HeartFill, SmileFill } from "antd-mobile-icons";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AppDispatch } from "../../../../../../core/redux/store";
import Unit from "../../../../domain/entities/unit";
import { updateUnitValuesThunk } from "../../../redux/slices/update-unit-values-slice";
import openUnitEditModal from "./open-unit-edit-model";

const UnitDetailsCard: FC<{ unit: Unit }> = ({ unit }) => {
  const navigate = useNavigate();
  const [unitCardName, setUnitCardName] = useState(unit.name);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Card
      title={
        <UnitDetailsCardTitle
          title={unitCardName}
          onEdit={() =>
            openUnitEditModal(unit, (update) => {
              dispatch(updateUnitValuesThunk(update));
              if (update.name !== undefined) {
                setUnitCardName(update.name);
              }
            })
          }
        />
      }
    >
      <List header="Máquinas">
        {unit.machines.map((machine) => (
          <List.Item
            prefix={<HeartFill />}
            onClick={() => navigate(`../../machine/${machine.id}`)}
            key={machine.id}
          >
            {machine.name}
          </List.Item>
        ))}
      </List>
      <List header="Usuários">
        {unit.users.map((user) => (
          <List.Item
            prefix={<SmileFill />}
            onClick={() => navigate(`../../user/${user.id}`)}
            key={user.id}
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
        <Button shape="rounded" onClick={onEdit}>
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
