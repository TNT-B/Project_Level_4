import { Link } from "react-router-dom";

const Menutop = () =>{
    return(
        <>
        <img style={{ height: 50, }} src="../img/logo-a.png" />
        <Link className="menutab" to={'/'} style={{color:"white", fontSize:18}} > Trang chủ</Link>
        
        </>
        
    )
}
export default Menutop;