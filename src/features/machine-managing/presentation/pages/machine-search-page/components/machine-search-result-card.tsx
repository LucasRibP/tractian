import { Avatar, Card } from "antd-mobile";
import { RightOutline } from "antd-mobile-icons";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MachineHeader from "../../../../../../core/types/common-entities/machine-header";

const MachineSearchResultCard: FC<{ machineHeader: MachineHeader }> = ({
  machineHeader,
}) => {
  const navigate = useNavigate();
  return (
    <Card
      title={
        <HeaderContainer>
          <AvatarContainer>
            <Avatar src={machineHeader.image} />
          </AvatarContainer>
          <TitleContainer>{machineHeader.name}</TitleContainer>
        </HeaderContainer>
      }
      extra={<RightOutline />}
      onClick={() => navigate(`${machineHeader.id}`)}
    />
  );
};

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const AvatarContainer = styled.div``;
const TitleContainer = styled.div`
  padding: 0 0 0 1rem;
`;

export default MachineSearchResultCard;
