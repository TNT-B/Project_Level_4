import { Button, Form, Input, InputNumber, message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} không được bỏ trống',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
        Phone: '${label} is not a valid Phonenumber!'
    },
    number: {
        range: '${label} không được để trống',
    },
    Phone: {
        range: '${label} must be at least 10 number',
    }

};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values) => {
    console.log(values);
};
const Formtuyendung = () => (
    
    <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{
            maxWidth: 600,
        }}
        validateMessages={validateMessages}
    >
        <Form.Item
            name={['user', 'name']}
            label="Họ tên"
            rules={[
                {
                    required: true,
                },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name={['user', 'email']}
            label="Email"
            rules={[
                {
                    type: 'email',
                },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name={['user', 'age']}
            label="Tuổi"
            rules={[
                {
                    type: 'number',
                    min: 0,
                    max: 99,
                },
            ]}
        >
            <InputNumber />
        </Form.Item>
        <Form.Item name={['user', 'SDT']} label="SDT" rules={[
            {
                type: 'phone',
            },
        ]}>
            <Input />
        </Form.Item>
        <Form.Item name={['user', 'introduction']} label="Giới Thiệu">
            <Input.TextArea />
        </Form.Item>
        <Form.Item
            wrapperCol={{
                ...layout.wrapperCol,
                offset: 8,
            }}
        >
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Bấm hoặc kéo tệp vào đây để tải lên</p>
            </Dragger>
            
            <Button type="primary" htmlType="submit">
                Nôp đơn ứng tuyển
            </Button>
        </Form.Item>
    </Form>
);
export default Formtuyendung;