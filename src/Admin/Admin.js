import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Menu, Popover, Row, Col } from "antd";
import USER from "../assets/images/profile/pic1.jpg";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import logo from "../assets/images/logo.png";
import logoa from "../assets/images/logo-a.png";
import QLViTri from "./QLViTri/QLViTri";
import QLBaitest from "./QLBaitest/QLbaitest";
import Themmoibaitest from "./QLBaitest/ThemBaiTest";

const { Header, Sider, Content } = Layout;

export default function Admin() {
  const [collapsed, setCollapsed] = useState({ collapsed: true });
  const [selectedMenuItem, setSelectedMenuItem] = useState("item1");

  const toggle = () => {
    setCollapsed((collapsed) => !collapsed);
  };
  const componentsSwitch = (key) => {
    switch (key) {
      case "item1":
        return <QLViTri />;
      //case "item2":
      // return <QLTuyenDung />;
      //return <QLViTri />;
      default:
        break;
    }
  };
  const content = (
    <Menu>
      <Menu.Item>
        <Link to="/profile">Hồ sơ</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/" onClick={() => { }}>
          Đăng xuất
        </Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <Link to="/admin">
            <img
              src={collapsed ? logoa : logo}
              alt=""
              style={{ width: "100%" }}
            />
          </Link>
        </div>
        <Menu
          selectedKeys={selectedMenuItem}
          theme="dark"
          mode="inline"
          onClick={(e) => setSelectedMenuItem(e.key)}
        >
          <Menu.Item key="item1" icon={<UserOutlined />}>
            <Link to="quan-li-vi-tri">Quản lý vị trí </Link>
          </Menu.Item>
          {/* <Menu.Item key="item2" icon={<VideoCameraOutlined />}>
            <span>Quản lý tuyển dụng</span>
          </Menu.Item> */}
          <Menu.Item key="item3" icon={<VideoCameraOutlined />}>
            <Link to="quan-li-bai-test">Quản lý bài test</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Row>
            <Col span={18}>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: toggle,
                }
              )}
            </Col>
            <Col span={3} offset={3}>
              <Popover content={content}>
                <a href="#" className="dropdown-toggle nav-link">
                  <span className="user-img">
                    <img
                      className="rounded-circle"
                      src={USER}
                      width={40}
                      alt={"Binh"}
                      style={{ verticalAlign: "middle", borderRadius: "50%" }}
                    />
                    &nbsp;&nbsp;
                    {"user.hoTen"}
                  </span>
                </a>
              </Popover>
            </Col>
          </Row>
        </Header>

        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100vh",
          }}
        >
          {/* {//componentsSwitch(selectedMenuItem)} */}
          <Routes>
            <Route path="quan-li-vi-tri" element={<QLViTri />} />
            <Route path="quan-li-bai-test" element={<QLBaitest />} />
            {/* <Route path="quan-li-bai-test/tao-moi" element={<Themmoibaitest />} /> */}
            <Route
              path="quan-li-bai-test/:pageType/:id?"
              element={<Themmoibaitest />}
            />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}
