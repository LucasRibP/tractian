import { Button, Divider } from "antd-mobile";
import { EditSOutline } from "antd-mobile-icons";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AppDispatch } from "../../../../../../core/redux/store";
import User from "../../../../domain/entities/user";
import { updateUserValuesThunk } from "../../../redux/slices/update-user-values-slice";
import openUserEditModal from "./open-user-edit-modal";
import UserDetailsCard from "./user-details-card";

const UserDetails: FC<{ initialUser: User }> = ({ initialUser }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState(initialUser);

  return (
    <>
      <UserTitleContainer>
        <UserTitle>{user.name}</UserTitle>
        <EditUserTitleButtonContainer>
          <Button
            shape="rounded"
            onClick={() =>
              openUserEditModal(user, (update) => {
                dispatch(updateUserValuesThunk(update));
                setUser({ ...user, ...update });
              })
            }
          >
            <EditSOutline />
          </Button>
        </EditUserTitleButtonContainer>
      </UserTitleContainer>
      <Divider
        style={{ color: "#cccccc", borderColor: "#cccccc", width: "80%" }}
      />

      <UserDetailsCardContainer>
        <UserDetailsCard user={user} />
      </UserDetailsCardContainer>
    </>
  );
};

const UserTitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const UserTitle = styled.h1`
  margin-top: 35px;
  margin-bottom: 15px;
  font-size: 2.5rem;
`;

const EditUserTitleButtonContainer = styled.div`
  position: absolute;
  top: 2.3rem;
  right: 1rem;
`;

const UserDetailsCardContainer = styled.div`
  width: 90%;
`;

export default UserDetails;
