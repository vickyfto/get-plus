import React from "react";
import { Menu } from "antd";
import { DatabaseOutlined, HomeOutlined } from "@ant-design/icons";
import ContainerPage from "./containerPage";
import { useNavigate } from "react-router-dom";

const Header = () => {
  let navigate = useNavigate();

  const handleChangesMenu = (e) => {
    navigate(`/${e.key}`);
  };

  return (
    <>
      <ContainerPage>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={[""]}
          onClick={handleChangesMenu}
        >
          {/* // i use key for navigate route */}
          <Menu.Item key="" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="articles" icon={<DatabaseOutlined />}>
            Articles
          </Menu.Item>
        </Menu>
      </ContainerPage>
    </>
  );
};

export default Header;
