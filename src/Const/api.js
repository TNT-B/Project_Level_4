const API_HOST = process.env.REACT_APP_API_HOST

export const apiConstants = {
    //quản lý vi tri
  
    DANH_SACH_VI_TRI: `${API_HOST}/vitri`,
    CAP_NHAT_VI_TRI:`${API_HOST}/vitri`,
    TAO_VI_TRI: `${API_HOST}/vitri/`,
    XOA_VI_TRI: `${API_HOST}/vitri`,

    //quản lý đợt tuyển dụng

    DANH_SACH_DOT_TUYEN_DUNG: `${API_HOST}/dottuyendung`,
    CHI_TIET_DOT_TUYEN_DUNG: `${API_HOST}/dottuyendung`,
    TAO_DOT_TUYEN_DUNG: `${API_HOST}/dottuyendung`,
    CAP_NHAT_DOT_TUYEN_DUNG: `${API_HOST}/dottuyendung`,
    DANH_SACH_UNG_VIEN: `${API_HOST}/dottuyendung/danhsachungvien`
  };

