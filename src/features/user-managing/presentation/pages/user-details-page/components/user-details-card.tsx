import { Avatar, Card, List } from "antd-mobile";
import {
  AddOutline,
  GlobalOutline,
  MailOutline,
  TagOutline,
} from "antd-mobile-icons";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AppDispatch, RootState } from "../../../../../../core/redux/store";
import User from "../../../../domain/entities/user";
import { delegateUserForMachineThunk } from "../../../redux/slices/delegate-user-for-machine-slice";
import { getMachinesAvaliableForUserThunk } from "../../../redux/slices/get-machines-avaliable-for-user-slice";
import openDelegateMachineModal from "./open-delegate-machine-modal";

const UserDetailsCard: FC<{ user: User }> = ({ user }) => {
  const [delegatedMachines, setDelegatedMachines] = useState(
    user.delegatedMachines
  );
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getMachinesAvaliableForUserThunk(user));
  }, [dispatch, user]);

  const allMachinesAvaliableForUser =
    useSelector((state: RootState) => state.getMachinesAvaliableForUser.data) ??
    [];

  const delegatedMachineIds = delegatedMachines.map((machine) => machine.id);
  const unselectedMachinesAvaliableForUser = allMachinesAvaliableForUser.filter(
    (machine) => !delegatedMachineIds.includes(machine.id)
  );

  return (
    <Card title={<UserDetailsCardHeader user={user} />}>
      <UserDetailsCardBodyContainer>
        <List header={"Máquinas Delegadas"}>
          {delegatedMachines.map((machine) => (
            <List.Item
              prefix={<Avatar src={machine.image} />}
              onClick={() => navigate(`../../machine/${machine.id}`)}
            >
              {machine.name}
            </List.Item>
          ))}
          {unselectedMachinesAvaliableForUser.length !== 0 ? (
            <List.Item
              prefix={<AddOutline />}
              onClick={() => {
                openDelegateMachineModal(
                  unselectedMachinesAvaliableForUser,
                  (addedMachine) => {
                    if (addedMachine !== null && addedMachine !== undefined) {
                      dispatch(
                        delegateUserForMachineThunk({
                          userId: user.id,
                          machineId: addedMachine.id,
                        })
                      );
                      setDelegatedMachines([
                        ...delegatedMachines,
                        addedMachine,
                      ]);
                    }
                  }
                );
              }}
            >
              Clique para delegar mais máquinas
            </List.Item>
          ) : (
            <></>
          )}
        </List>
      </UserDetailsCardBodyContainer>
    </Card>
  );
};

const UserDetailsCardBodyContainer = styled.div``;

const UserDetailsCardHeader: FC<{ user: User }> = ({ user }) => {
  const navigate = useNavigate();
  return (
    <UserDetailsCardHeaderContainer>
      <List header={"Informações Gerais"}>
        <List.Item prefix={<MailOutline />}>{user.email}</List.Item>
        <List.Item
          prefix={<GlobalOutline />}
          onClick={() => navigate(`../../business/${user.companyId}`)}
        >
          {user.companyName}
        </List.Item>
        <List.Item prefix={<TagOutline />}>{user.unitName}</List.Item>
      </List>
    </UserDetailsCardHeaderContainer>
  );
};

const UserDetailsCardHeaderContainer = styled.div`
  width: 85vw;
`;

export default UserDetailsCard;
