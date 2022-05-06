import { FC } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../../../../core/redux/store";
import UserSearchResultCard from "./user-search-result-card";

const UserSearchResultList: FC = () => {
  const userNames = useSelector(
    (state: RootState) => state.searchAllUsers.data
  );
  return (
    <ListHolder>
      {userNames?.map((userName) => (
        <CardContainer key={userName.id}>
          <UserSearchResultCard userName={userName} />
        </CardContainer>
      )) ?? <></>}
    </ListHolder>
  );
};

export default UserSearchResultList;

const ListHolder = styled.div`
  min-height: 85vh;
  margin-top: 1rem;
  width: 90%;
`;
const CardContainer = styled.div`
  margin-bottom: 0.4rem;
`;
