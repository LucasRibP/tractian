import { SearchBar } from "antd-mobile";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AppDispatch } from "../../../../core/redux/store";
import BusinessSearchResultList from "../components/business-search-result-list";
import { searchAllBusinessesThunk } from "../redux/slices/search-all-businesses-slice";

const BusinessManagingPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(searchAllBusinessesThunk(""));
  });

  return (
    <Page>
      <SearchBarContainer>
        <SearchBar placeholder="Busca" />
      </SearchBarContainer>
      <ResultListContainer>
        <BusinessSearchResultList />
      </ResultListContainer>
    </Page>
  );
};

const Page = styled.div`
  height: 100%;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchBarContainer = styled.div`
  width: 94%;
  height: 7vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 3% 0;
  position: fixed;
  top: 0;
  background: #ffffff;
`;

const ResultListContainer = styled.div`
  padding-top: 7vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default BusinessManagingPage;
