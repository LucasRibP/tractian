import { FC } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../../../../core/redux/store";
import BusinessSearchResultCard from "./business-search-result-card";

const BusinessSearchResultList: FC = () => {
  const businessNames = useSelector(
    (state: RootState) => state.searchAllBusinesses.data
  );
  return (
    <ListHolder>
      {businessNames?.map((businessName) => (
        <CardContainer key={businessName.id}>
          <BusinessSearchResultCard businessName={businessName} />
        </CardContainer>
      )) ?? <></>}
    </ListHolder>
  );
};

export default BusinessSearchResultList;

const ListHolder = styled.div`
  min-height: 85vh;
  margin-top: 1rem;
  width: 90%;
`;
const CardContainer = styled.div`
  margin-bottom: 0.4rem;
`;
