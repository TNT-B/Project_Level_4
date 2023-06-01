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
    DANH_SACH_UNG_VIEN: `${API_HOST}/dottuyendung/danhsachungvien`,

    //quản lý yêu càu ứng tuyển
    CAP_NHAT_YEU_CAU_UNG_TUYEN:  `${API_HOST}/yeucauungtuyen`,

    //quản lý ứng viên
    DANH_SACH_THONG_TIN_UNG_VIEN:  `${API_HOST}/ungvien`,
    CAP_NHAT_THONG_TIN_UNG_VIEN:  `${API_HOST}/ungvien`,

    //auth
    DANG_NHAP: `${API_HOST}/auth/login`,
  };

