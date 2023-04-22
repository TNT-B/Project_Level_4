import { Button, Space, Card, Row, Col } from 'antd';
import { Typography } from 'antd';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;
const Listtuyendung = () => (


    <Space
        direction="vertical"
        size="middle"
        style={{
            display: 'flex',
            paddingBottom: '10px',

        }}>
        <Divider />
        <Title align="center">Vị trí tuyển dụng</Title>
        <Row gutter={16} align="middle">
            <Col span={5}>
                <Link to={'/vitrituyendung'}>
                <Card title="Frontend" size="large" align="center">
                    <p>cập nhập ui/ux</p>
                    <p>đợt 1</p>
                    <Button type="primary">xem thêm</Button>
                </Card>
                </Link>
            </Col>
            <Col span={5}>
                <Link to={'/vitrituyendung'}>
                <Card title="Frontend" size="large" align="center">
                    <p>cập nhập ui/ux</p>
                    <p>đợt 1</p>
                    <Button type="primary">xem thêm</Button>
                </Card>
                </Link>
            </Col>
            <Col span={5}>
                <Link to={'/vitrituyendung'}>
                <Card title="Frontend" size="large" align="center">
                    <p>cập nhập ui/ux</p>
                    <p>đợt 1</p>
                    <Button type="primary">xem thêm</Button>
                </Card>
                </Link>
            </Col>
            <Col span={5}>
                <Link to={'/vitrituyendung'}>
                <Card title="Frontend" size="large" align="center">
                    <p>cập nhập ui/ux</p>
                    <p>đợt 1</p>
                    <Button type="primary">xem thêm</Button>
                </Card>
                </Link>
            </Col>
        </Row>
        <Row gutter={16} align="middle">
        <Col span={5}>
                <Link to={'/vitrituyendung'}>
                <Card title="Frontend" size="large" align="center">
                    <p>cập nhập ui/ux</p>
                    <p>đợt 1</p>
                    <Button type="primary">xem thêm</Button>
                </Card>
                </Link>
            </Col>
            <Col span={5}>
                <Link to={'/vitrituyendung'}>
                <Card title="Frontend" size="large" align="center">
                    <p>cập nhập ui/ux</p>
                    <p>đợt 1</p>
                    <Button type="primary">xem thêm</Button>
                </Card>
                </Link>
            </Col>
            <Col span={5}>
                <Link to={'/vitrituyendung'}>
                <Card title="Frontend" size="large" align="center">
                    <p>cập nhập ui/ux</p>
                    <p>đợt 1</p>
                    <Button type="primary">xem thêm</Button>
                </Card>
                </Link>
            </Col>
            <Col span={5}>
                <Link to={'/vitrituyendung'}>
                <Card title="Frontend" size="large" align="center">
                    <p>cập nhập ui/ux</p>
                    <p>đợt 1</p>
                    <Button type="primary">xem thêm</Button>
                </Card>
                </Link>
            </Col>

        </Row>
        {/* <Sotrang /> */}
        <Divider />
    </Space>
);
export default Listtuyendung;