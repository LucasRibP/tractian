import { Card } from "antd-mobile";
import { RightOutline } from "antd-mobile-icons";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BusinessName from "../../../../domain/entities/business-name";

const BusinessSearchResultCard: FC<{ businessName: BusinessName }> = ({
  businessName,
}) => {
  const navigate = useNavigate();
  return (
    <Card
      title={<TitleContainer>{businessName.name}</TitleContainer>}
      extra={<RightOutline />}
      onClick={() => navigate(`business/${businessName.id}`)}
    />
  );
};

const TitleContainer = styled.div``;

export default BusinessSearchResultCard;
