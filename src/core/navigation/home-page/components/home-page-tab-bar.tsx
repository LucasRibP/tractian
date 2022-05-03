import { TabBar } from "antd-mobile";
import { FolderOutline, SetOutline, TeamOutline } from "antd-mobile-icons";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const HomePageTabBar: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const tabs = [
    {
      key: "/business",
      title: "Empresas",
      icon: <FolderOutline />,
    },
    {
      key: "/machine",
      title: "Maquinas",
      icon: <SetOutline />,
    },
    {
      key: "/user",
      title: "Usuários",
      icon: <TeamOutline />,
    },
  ];

  return (
    <TabBar activeKey={pathname} onChange={(path) => navigate(path)}>
      {tabs.map((item) => (
        <TabBar.Item {...item} />
      ))}
    </TabBar>
  );
};

export default HomePageTabBar;
