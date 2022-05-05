import { SearchBar } from "antd-mobile";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AppDispatch } from "../../../../../core/redux/store";
import { searchAllMachinesThunk } from "../../redux/slices/search-all-machines-slice";
import MachineSearchResultList from "./components/machine-search-result-list";

const MachineSearchPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(searchAllMachinesThunk(searchQuery));
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
        <MachineSearchResultList />
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
  z-index: 10;
`;

const ResultListContainer = styled.div`
  padding-top: 7vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default MachineSearchPage;
