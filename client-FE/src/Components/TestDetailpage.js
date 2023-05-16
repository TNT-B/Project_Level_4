import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Layout, theme, Form, Input, Select, Button,
    DatePicker
} from 'antd';
import Toast from "../Components/LoadingError/Toast";
import Menutop from "../Components/Menutop";
import Breadcrumbtop from "../Components/Breadcrumtop";
import axios from 'axios';


const TestDetailpage = () => {

    const { TextArea } = Input;
    const { Header, Content, Footer } = Layout;
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [data, setData] = useState();

    const getData = async () => {

        axios.get(`https://quan-ly-tuyen-dung-be.onrender.com/baitest/cauhoi?idbaitest=6438f9da2ebb1a4ee038227e`).then(res => {
            let newData = res.data.data.map(row => { return { 
                ma_bai_test: row.ma_bai_test, 
                ten_bai_test: row.ten_bai_test, 
                mo_ta: row.mo_ta, 
                thoi_luong: row.thoi_luong, 
                so_diem_toi_thieu: row.so_diem_toi_thieu, 
                cau_hoi: row.cau_hoi.map(item =>item.noi_dung)}
                
            })
            setData(newData);
            console.log(res);
        })
    }
   
   
    useEffect(() => {
        getData()
    }, [])
  



    return (
        <>
            <Toast />
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

                        <div className="column1 middle detail" >

                            <div className="row1">
                                {data && data.map(data => (
                                    <div>Tên bài test: {data.ten_bai_test}</div>
                                ))}
                            </div>
                            <div className="row2">{data && data.map(data => (
                                <div>Thời lượng:{data.thoi_luong}</div>
                            ))}
                            </div>
                            <div className="row2">{data && data.map(data => (
                                <div>Sớ điểm tối thiểu:{data.so_diem_toi_thieu}</div>
                            ))}
                            </div>

                        </div>
                        <div className="column1 middle detail">
                            <div className="row1">{data && data.map(item => ( 
                                <div>Câu hỏi đầu tiên {item.noi_dung} </div>
                            ))}</div>
                            <div className="row1">{data && data.map(data => (
                                <div>đáp án {data.dap_an}</div>
                            ))}</div>

                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center', theme: "dark" }}>
                </Footer>
            </Layout>
        </>
    );
};

export default TestDetailpage;
