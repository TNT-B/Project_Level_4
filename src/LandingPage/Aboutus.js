import { Space, Card, Row, Col } from 'antd';
import { Typography } from 'antd';


const { Title } = Typography;
const Aboutus = () => (

    <Space className='aboutus'
        direction="vertical"
        size="middle"
        style={{
            display: 'flex',
            paddingBottom: '10px',
        }}>
        <Title align="center">Về Chúng Tôi</Title>
        <Row gutter={16} align="middle">
            <Col span={8}>
                <Card size="large" align="center">
                <Title level={2}>1000</Title>
                    <p>Chi nhánh trên toàn quốc</p>
                </Card>
            </Col>
            <Col span={8}>
                <Card  size="large" align="center" color='black'>
                <Title level={2}>10 Triệu</Title>
                    <p>Giao dịch mỗi tháng</p>
                </Card>
            </Col>
            <Col span={8}>
                <Card size="large" align="center">
                <Title level={2}>20 triệu</Title>
                    <p>Khách hàng</p>
                </Card>
            </Col>

        </Row>
    </Space>
);
export default Aboutus;