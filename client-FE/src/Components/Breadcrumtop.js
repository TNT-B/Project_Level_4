import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbtop = () => {
  const location = useLocation();
  return (
    <Breadcrumb
      style={{
        margin: '16px 0',
      }}
    >
      <Breadcrumb.Item><Link to={'/'} className={location.pathname === "/" ? "breadcrumb-active" : "breadcrumb-not-active"}>Trang chủ</Link></Breadcrumb.Item>
      <Breadcrumb.Item><Link to={'/vitrituyendung'} className={location.pathname.startsWith("/vitrituyendung") ? "breadcrumb-active" : "breadcrumb-not-active"}>Vị trí tuyển dụng</Link></Breadcrumb.Item>
      <Breadcrumb.Item><Link to={'/quanlibaitest'} className={location.pathname === "/quanlibaitest" ? "breadcrumb-active" : "breadcrumb-not-active"}>Quản lí bài test</Link></Breadcrumb.Item>
    </Breadcrumb>
  )
}
export default Breadcrumbtop;