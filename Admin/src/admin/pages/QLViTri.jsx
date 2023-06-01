import React, { useEffect, Fragment, useState } from "react";
import { map, includes, sortBy, uniqBy, each, result, get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Select, Input, Table, Button, Space, Card } from "antd";
import ModalViTri from "../components/ModalViTri";
import { userActions } from "../../redux/_actions";
import { apiConstants } from "../../redux/_constants";
import axios from "axios";

import SuaVitri from "../components/SuaViTri";
import XoaVitri from "../components/XoaViTri";

const Search = Input.Search;
const initState = {
  selectedRowKeys: [],
};

export default function QLViTri() {
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Mã vị trí",
      dataIndex: "ma_vi_tri",
      key: "ma_vi_tri",
    },
    {
      title: "Tên vị trí",
      dataIndex: "ten_vi_tri",
      key: "ten_vi_tri",
    },
    {
      title: "Mô tả",
      dataIndex: "mo_ta",
      key: "mo_ta",
    },

    {
      title: "Thao tác",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <SuaVitri
            Ma_vi_tri={record.ma_vi_tri}
            Ten_vi_tri={record.ten_vi_tri}
            Mo_ta={record.mota}
          />
          <XoaVitri Ma_vi_tri={record.ma_vi_tri} />
        </Space>
      ),
    },
  ];

  const [danhSachViTri, setDSVT] = useState([]);
  const getDSVT = async () => {
    const res = await axios.get(apiConstants.DANH_SACH_VI_TRI);
    //console.log(res);
    setDSVT(res.data.data.danhsach);
  };

  useEffect(() => {
    getDSVT();
  }, []);

  const renderTable = () => {
    return (
      <Table
        size="small"
        columns={columns}
        dataSource={danhSachViTri}
        rowKey={(record) => record.key}
      />
    );
  };
  return (
    <Card title="Quản lý vị trí" className="gx-card">
      <div className="table-operations">
        <Space size="small">
          <Search
            size="small"
            // ref={searchText}
            // suffix={suffix}

            placeholder="Tìm kiếm dữ liệu"
            style={{ width: 200 }}
          />
          <Button size="small">Làm mới</Button>
          <ModalViTri />
        </Space>
      </div>
      {renderTable()}
    </Card>
  );
}
