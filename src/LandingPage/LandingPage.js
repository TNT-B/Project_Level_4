import 'antd/dist/reset.css';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import React from 'react';
import Footerslider from './Footerslider';
import Listtuyendung from './Listtuyendung';
import Aboutus from './Aboutus';
import Headerslider from './Headerslider';
import Menutop from './Menutop';
import Chitiettuyendung from './Chitiettuyendung';
import { Route, Routes } from 'react-router';



const LandingPage = () => {
  const { Header, Content, Footer } = Layout;
  const {
      token: { colorBgContainer },
  } = theme.useToken();
  return (
      <Layout className="layout">
          <Header>
              <div className="logo" />
              <Menutop/>
          </Header>
          <Content
              style={{
                  padding: '0 5px',
              }}>
              <div
                  className="site-layout-content"
                  style={{
                      background: colorBgContainer,
                  }}
              ><Headerslider />
                  <Aboutus />
                  <Listtuyendung />
                  <Footerslider />
              </div>
          </Content>
          <Footer

              style={{
                  textAlign: 'center',
                  theme: "dark"
              }}
          >

          </Footer>
          
          <Routes>
          <Route path="vitrituyendung" element={<Chitiettuyendung/>} />
          </Routes>

      </Layout>

  );
  };
  export default LandingPage;