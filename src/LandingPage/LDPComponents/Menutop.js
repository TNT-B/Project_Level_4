import { Link } from "react-router-dom";

const Menutop = () =>{
    return(
        <>
        <Link className="menutab" to={'/'}>Trang chủ</Link>
        <Link className="menutab" to={'/quanlibaitest'}>Tuyển dụng</Link>
        </>
        
    )
}
export default Menutop;