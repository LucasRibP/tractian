import { Card } from "antd-mobile";
import { RightOutline } from "antd-mobile-icons";
import { FC } from "react";
import styled from "styled-components";
import BusinessName from "../../domain/entities/business-name";

const BusinessSearchResultCard: FC<{ businessName: BusinessName }> = ({
  businessName,
}) => {
  return (
    <Card
      title={<TitleContainer>{businessName.name}</TitleContainer>}
      extra={<RightOutline />}
    />
  );
};

const TitleContainer = styled.div``;

export default BusinessSearchResultCard;
