import { Card } from "antd-mobile";
import { RightOutline } from "antd-mobile-icons";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserName from "../../../../../../core/types/common-entities/user-name";

const UserSearchResultCard: FC<{ userName: UserName }> = ({ userName }) => {
  const navigate = useNavigate();
  return (
    <Card
      title={<TitleContainer>{userName.name}</TitleContainer>}
      extra={<RightOutline />}
      onClick={() => navigate(`${userName.id}`)}
    />
  );
};

const TitleContainer = styled.div``;

export default UserSearchResultCard;
