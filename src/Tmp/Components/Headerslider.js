import { Carousel, Typography } from 'antd';

const { Title } = Typography;
const contentStyle = {
  height: '500px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const Headerslider = () => (
  <Carousel autoplay>
    <div>
    <img className='imgheaderslide' src='./img/4.jpg'/>
    </div>
    <div>
    <h3 style={contentStyle}><img className='imgheaderslide' src='./img/6.jpg'/></h3>
    </div>
    <div>
    <h3 style={contentStyle}><img className='imgheaderslide' src='./img/1.jpg'/></h3>
    </div>
    <div>
    <h3 style={contentStyle}><img className='imgheaderslide' src='./img/5.jpg'/></h3>
    </div>
  </Carousel>
);
export default Headerslider;