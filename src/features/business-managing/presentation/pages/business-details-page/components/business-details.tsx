import { FC } from "react";
import styled from "styled-components";
import Business from "../../../../domain/entities/business";
import UnitDetailsCard from "./unit-details-card";

const BusinessDetails: FC<{ business: Business }> = ({ business }) => {
  console.log(business);
  return (
    <>
      <BusinessTitle>{business.name}</BusinessTitle>
      <UnitListContainer>
        {business.units.map((unit) => (
          <UnitCardContainer>
            <UnitDetailsCard unit={unit} />
          </UnitCardContainer>
        ))}
      </UnitListContainer>
    </>
  );
};

const BusinessTitle = styled.h1``;

const UnitListContainer = styled.div``;

const UnitCardContainer = styled.div``;

export default BusinessDetails;
