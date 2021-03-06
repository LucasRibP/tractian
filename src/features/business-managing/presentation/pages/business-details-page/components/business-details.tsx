import { Button, Divider } from "antd-mobile";
import { EditSOutline } from "antd-mobile-icons";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AppDispatch } from "../../../../../../core/redux/store";
import Business from "../../../../domain/entities/business";
import { updateBusinessValuesThunk } from "../../../redux/slices/update-business-values-slice";
import openBusinessEditModal from "./open-business-edit-modal";
import UnitDetailsCard from "./unit-details-card";

const BusinessDetails: FC<{ business: Business }> = ({ business }) => {
  console.log(business);
  const dispatch = useDispatch<AppDispatch>();
  const [businessDetailsTitle, setBusinessDetailsTitle] = useState(
    business.name
  );

  return (
    <>
      <BusinessTitleContainer>
        <BusinessTitle>{businessDetailsTitle}</BusinessTitle>
        <EditBusinessTitleButtonContainer>
          <Button
            shape="rounded"
            onClick={() =>
              openBusinessEditModal(business, (update) => {
                dispatch(updateBusinessValuesThunk(update));
                if (update.name !== undefined) {
                  setBusinessDetailsTitle(update.name);
                }
              })
            }
          >
            <EditSOutline />
          </Button>
        </EditBusinessTitleButtonContainer>
      </BusinessTitleContainer>
      <Divider
        style={{ color: "#cccccc", borderColor: "#cccccc", width: "80%" }}
      />

      <UnitListContainer>
        {business.units.map((unit) => (
          <UnitCardContainer key={unit.id}>
            <UnitDetailsCard unit={unit} />
          </UnitCardContainer>
        ))}
      </UnitListContainer>
    </>
  );
};

const BusinessTitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const BusinessTitle = styled.h1`
  margin-top: 35px;
  margin-bottom: 15px;
  font-size: 2.5rem;
`;

const EditBusinessTitleButtonContainer = styled.div`
  position: absolute;
  top: 2.3rem;
  right: 1rem;
`;

const UnitListContainer = styled.div`
  width: 90%;
`;

const UnitCardContainer = styled.div`
  margin-bottom: 20px;
`;

export default BusinessDetails;
