import { MemoryRouter } from "react-router-dom";
import styled from "styled-components";
import HomePageTabBar from "./components/home-page-tab-bar";
import HomePageRoutes from "./home-page-routes";

export default function HomePage() {
  return (
    <MemoryRouter initialEntries={["/machine"]}>
      <App>
        <Body>
          <HomePageRoutes />
        </Body>
        <TabBarContainer>
          <HomePageTabBar />
        </TabBarContainer>
      </App>
    </MemoryRouter>
  );
}

const App = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #eeeeee;
`;

const Body = styled.div`
  flex: 1;
  padding-bottom: 6vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TabBarContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
  background: #ffffff;
  border-top: solid 1px var(--adm-border-color);
`;
