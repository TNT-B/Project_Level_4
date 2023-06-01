import { Button, Select, Modal, Form, Input, InputNumber } from "antd";
import React, { useState, useEffect, Fragment } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux/_actions";
import { apiConstants } from "../../redux/_constants";
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
const stateUser = {
  ma_vi_tri: "",
  ten_vi_tri: "",
  mo_ta: "",
};
const stateModal = {
  ModalText: "Content of the modal",
  visible: false,
  confirmLoading: false,
};

function SuaViTri(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(props.loading);
  const [inputs, setInputs] = useState(stateUser);
  const [Modals, setModals] = useState(stateModal);

  const { ma_vi_tri, ten_vi_tri, mo_ta } = inputs;
  const { ModalText, visible, confirmLoading } = Modals;

  const [form] = Form.useForm();

  useEffect(() => {
    setInputs({
      ...inputs,
      ma_vi_tri: props.Ma_vi_tri,
      ten_vi_tri: props.Ten_vi_tri,
      mo_ta: props.Mo_ta,
    });
    // console.log(inputs);
  }, [visible]);
  const showModal = () => {
    // dispatch(userActions.getId(props.taiKhoanUser));
    setModals({
      visible: true,
    });
  };
  const handleOk = () => {
    setModals({
      ModalText: "The modal will be closed after two seconds",
      confirmLoading: true,
    });
    setTimeout(() => {
      setModals({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };
  const handleCancel = () => {
    setModals({
      visible: false,
    });
    // form.resetFields();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
    console.log(inputs);
  };
  // const handleChangeOption = (value) => {
  //   // const { name, value } = e.target;
  //   setInputs((inputs) => ({ ...inputs, maLoaiNguoiDung: value }));
  //   // console.log(inputs);
  // };
  const handleSubmit = () => {
    // console.log(inputs);
    dispatch(userActions.updateuser(inputs));
    setLoading(true);
    setModals({
      // ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      setModals({
        visible: false,
        confirmLoading: false,
      });
    }, 3000);

    // form.resetFields();
    // else {
    //   setModals({
    //     visible: true,
    //     confirmLoading: false,
    //   });
    // }
  };

  return (
    <>
      <Button type="default" onClick={showModal} size="small">
        Sửa
      </Button>
      <Modal
        title="Thêm người dùng"
        visible={visible}
        onOk={form.submit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        // onExit={props.reload}
      >
        <Form
          {...layout}
          form={form}
          name="nest-messages"
          onFinish={handleSubmit}
          validateMessages={validateMessages}
        >
          <Form.Item label="Mã vị trí" rules={[{ required: true }]}>
            <Input name="ma_vi_tri" value={ma_vi_tri} onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Tên vị trí">
            <Input
              name="ten_vi_tri"
              value={ten_vi_tri}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label="Mô tả">
            <Input name="mo_ta" value={mo_ta} onChange={handleChange} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default SuaViTri;
