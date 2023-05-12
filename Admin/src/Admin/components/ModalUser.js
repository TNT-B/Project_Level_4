import { Button, Select, Modal, Form, Input, InputNumber } from "antd";
import React, { useState, useEffect, Fragment } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const { Option, OptGroup } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const validateMessages = {
  required: "${label} không được để trống!",
  // types: {
  //   email: "${label} không đúng định dạng email!",
  //   number: "${label} không đúng định dạng số!",
  // },
  // number: {
  //   range: "${label} phải bao gồm 10 số",
  // },
};
const onFinish = (values) => {
  console.log(values);
};

function ModalUser() {
  const stateUser = {
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDT: "",
    maLoaiNguoiDung: "",
    maNhom: "GP01",
  };
  const stateModal = {
    ModalText: "",
    visible: false,
    confirmLoading: false,
  };
  const location = useLocation();
  const { registerError } = useSelector((state) => state.registration);
  const [regErr, setRegerr] = useState(registerError);
  const [inputs, setInputs] = useState(stateUser);
  const [Modals, setModals] = useState(stateModal);
  const { taiKhoan, email, hoTen } = inputs;
  const { ModalText, visible, confirmLoading } = Modals;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const showModal = () => {
    setModals({
      visible: true,
    });
  };

  const handleCancel = () => {
    // console.log('Clicked cancel button');
    form.resetFields();
    setModals({
      visible: false,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
    // console.log(inputs);
  };
  const handleChangeOption = (value) => {
    // console.log(value);
    setInputs((inputs) => ({ ...inputs, maLoaiNguoiDung: value }));
  };
  const handleSubmit = (value) => {
    // dispatch(userActions.register(value, location.pathname));
    // if (registerError === '') {
    setModals({
      ModalText: "The modal will be closed after two seconds",
      confirmLoading: true,
    });
    setTimeout(() => {
      setModals({
        visible: false,
        confirmLoading: false,
      });
    }, 3000);

    console.log("tin debug: ", value);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} size="small">
        Thêm vị trí
      </Button>
      <Modal
        title="Thêm người dùng"
        visible={visible}
        onOk={form.submit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        destroyOnClose
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form
          {...layout}
          form={form}
          name="nest-messages"
          onFinish={handleSubmit}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="taiKhoan"
            value={taiKhoan}
            initialValue=""
            label="Mã vị trí"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="hoTen"
            value={hoTen}
            initialValue=""
            label="Tên vị trí"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            value={email}
            initialValue=""
            label="Mô tả"
            //rules={[{ type: "email" }, { required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalUser;
