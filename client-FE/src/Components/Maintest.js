import Addnewtest from "./Addnewtest";
import {
    Layout, theme, Form, Input, Select, Button,
    DatePicker,
} from 'antd';
import { Link } from "react-router-dom";
import Menutop from "./Menutop";
import Breadcrumbtop from "./Breadcrumtop";
import { createTest } from "../Redux/Actions/Baitestaction";
import { useDispatch } from "react-redux";
import { useEffect } from "react";


const Maintest = () => {
    const dispatch = useDispatch();


    const { Header, Content, Footer } = Layout;
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    useEffect(() => {
        dispatch(createTest());
      }, []);
    
    return (
        <>
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menutop />
                </Header>
                <Content
                    style={{
                        padding: '0 5px',
                    }}
                >
                    <Breadcrumbtop />
                    <div
                        className="site-layout-content"
                        style={{
                            background: colorBgContainer,
                        }}
                    >
                        <div className="column side">
                            
                        </div>
                        <div className="column middle">
                            <div className="row1">Bài Kiểm tra đầu tiên</div>
                            <div className="row2">Ngày tạo: 22/4/2023</div>
                        </div>
                        <div className="column middle">
                            <div className="row1">Câu hỏi đầu tiên</div>

                        </div>
                    </div>
                </Content>
                <Footer

                    style={{
                        textAlign: 'center',
                        theme: "dark"
                    }}
                >

                </Footer>
            </Layout>
        </>
    );
};
export default Maintest;
