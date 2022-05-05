import { SearchBar } from "antd-mobile";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AppDispatch } from "../../../../../core/redux/store";
import { searchAllBusinessesThunk } from "../../redux/slices/search-all-businesses-slice";
import BusinessSearchResultList from "./components/business-search-result-list";

const BusinessSearchPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(searchAllBusinessesThunk(searchQuery));
  }, [dispatch, searchQuery]);

  return (
    <Page>
      <SearchBarContainer>
        <SearchBar
          placeholder="Busca"
          value={searchQuery}
          onChange={(value) => setSearchQuery(value)}
        />
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

export default BusinessSearchPage;
