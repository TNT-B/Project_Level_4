import { Layout, Space, Card } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;
const { Sider, Content } = Layout;
const Chitiettuyendung = () => {
    const contentStyle = {
        textAlign: '',
        lineheight: 50,
        color: '#000000',
        backgroundColor: '#fff',
    };
    const siderStyle = {
        Align: 'center',
        lineheight: 50,
        color: '#000000',
        backgroundColor: '#fff',
    };
    return (
        // <Space
        //     direction="vertical"
        //     style={{
        //         width: '100%',
        //     }}
        //     size={[0, 48]}
        // >
            <div className='CTTD-body'>
            <div className='CTTD-content'>
                <Title align="center">Frontend dev</Title>
                <p>- Responsible for all PR & Marketing activities, plans & strategies, media, event & customer services of the brands effectively to ensure the achievement of sales revenue.</p>
                <p>- Maintain contact with journalists:</p>
                <p>+ Update media contacts about new collection and new arrival of assigned brands.</p>
                <p>+ Send out Press Release and other information about the brands to media contacts</p>
                <p>+ Manage the process of lending clothes for fashion shooting in magazines.</p>
                <p>+ Provide information requested by the media contacts in a timely manner</p>
                <p>+ Establish and maintain good relationship with journalists and publications.</p>
                <p>- Manage budget for PR & Marketing activities</p>
                <p>- Prepare the whole year media plan for assigned brands.
                    Prepare the media report and submit on a monthly basis.</p>
                <p>- Negotiate with the magazines to get the best discount and PR support.</p>
                <p>- Copywrite & translate all PR & Advertising materials provided by the Principal.</p>
                <p>- Propose marketing campaign and activities to Brand Manager/ Operation.</p>
                <p>- Implement the marketing activities as instructed by Brand Manager and/ or the Principal.
                </p>
                </div>
                <div className='CTTD-sidebar'>
                    <Card className='CTTD-card' bordered={true} size="small" align="center">
                        <p>Salary: Thỏa thuận</p>
                        <p>Location: Hà Nội</p>
                        <p>Card content</p>
                    </Card>
                </div>
                </div>
        // </Space>
    )
}
export default Chitiettuyendung;