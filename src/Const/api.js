//const API_HOST = process.env.REACT_APP_API_HOST;
const API_HOST = "https://quan-ly-tuyen-dung-be.onrender.com";

export const apiConstants = {
  //quản lý vi tri

  DANH_SACH_VI_TRI: `${API_HOST}/vitri`,
  CHI_TIET_VI_TRI: (id) =>`${API_HOST}/vitri/chitiet?id=${id}`,
  CAP_NHAT_VI_TRI: `${API_HOST}/vitri`,
  TAO_VI_TRI: `${API_HOST}/vitri/`,
  XOA_VI_TRI: `${API_HOST}/vitri`,

  // DANH_SACH_VI_TRI: `https://quan-ly-tuyen-dung-be.onrender.com/vitri`,
  // CAP_NHAT_VI_TRI: `https://quan-ly-tuyen-dung-be.onrender.com/vitri`,
  // TAO_VI_TRI: `https://quan-ly-tuyen-dung-be.onrender.com/vitri/`,
  // XOA_VI_TRI: `https://quan-ly-tuyen-dung-be.onrender.com/vitri`,

   // quản lý bài test

   DANH_SACH_BAI_TEST: `${API_HOST}/baitest`,
   CHI_TIET_BAI_TEST: (id) =>`${API_HOST}/baitest/chitiet?idbaitest=${id}`,
   TAO_BAI_TEST: `${API_HOST}/baitest/createbaitest`,
   CAP_NHAT_BAI_TEST: `${API_HOST}/baitest`,

    // quản lý ứng viên
    UNG_TUYEN: `${API_HOST}/ungvien/`,

    // quản lý đợt tuyển dụng
    CHI_TIET_DOT_TUYEN_DUNG_GAN_NHAT: `${API_HOST}/dottuyendung/gannhat`,
};
