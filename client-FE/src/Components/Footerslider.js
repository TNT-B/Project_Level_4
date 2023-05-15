import { Carousel } from 'antd';


const contentStyle = {
  height: '300px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const Footerslider = () => (
  <Carousel autoplay>
    <div>
      <h3 style={contentStyle}><img className='imgfooterslide' src='./img/5.jpg'/></h3>
    </div>
    <div>
    <h3 style={contentStyle}><img className='imgfooterslide' src='./img/6.jpg'/></h3>
    </div>
    <div>
    <h3 style={contentStyle}><img className='imgfooterslide' src='./img/2.jpg'/></h3>
    </div>
    <div>
    <h3 style={contentStyle}><img className='imgfooterslide' src='./img/4.jpg'/></h3>
    </div>
  </Carousel>
);
export default Footerslider;