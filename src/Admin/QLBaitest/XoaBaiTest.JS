import { Button, Select, Modal } from "antd";
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";


const Xoabaitest = (value) => {

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalText, setModalText] = useState("");

  const showModal = () => {
    setVisible(true);
    setModalText(`bạn có chắc muốn xóa bài test này ${value.ma_bai_test} ?`);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = async () => {
    setModalText("đang thực hiện việc xóa bài test...");
    setConfirmLoading(true);
    try {
      await axios.delete('https://quan-ly-tuyen-dung-be.onrender.com/baitest',{
      data: {id : value.id}
    });
    // show notification success 
    } catch (error) { 
      // show notification error

    } finally {
      setConfirmLoading(false);
      value.onSuccess && value.onSuccess();
    }
    
  };

  return (
    <>
      <Button type="default" onClick={showModal} danger size="small">
        Xóa
      </Button>
      <Modal
        title={`Xóa vị trí`}
        visible={visible}
        onOk={handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        destroyOnClose
        okText="Lưu"
        cancelText="Hủy"
      >
        {modalText}
      </Modal>
    </>
  );
}

export default Xoabaitest;