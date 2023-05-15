import { Link } from "react-router-dom";

const Menutop = () =>{
    return(
        <>
        <Link className="menutab" to={'/'}>Trang chủ</Link>
        <Link className="menutab" to={'/quanlibaitest'}>Tuyển dụng</Link>
        <Link className="menutab" to={'/quanlituyendung'}>Kế hoạch</Link>
        </>
        
    )
}
export default Menutop;