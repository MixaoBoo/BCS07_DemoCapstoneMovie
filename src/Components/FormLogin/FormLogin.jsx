import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { message } from "antd";
import { nguoiDungServ } from "../../services/nguoiDungServices";
import { luuXuongLocal } from "../../utils/localStore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDuLieuHoTen } from "../../redux/slices/nguoiDungSlice";

const FormLogin = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      console.log(values);
      // Xử lí gửi dữ liệu lên Server
      nguoiDungServ
        .dangNhap(values)
        .then((res) => {
          console.log(res);
          // Người dùng đăng nhập thành công sẽ lưu thông tin xuống local và chuyển hướng người dùng về trang chủ
          messageApi.success("Đăng nhập thành công!");
          // Khi gọi dữ liệu thành công sẽ lấy dữ liệu đó gửi lên redux
          dispatch(setDuLieuHoTen(res.data.content));
          luuXuongLocal("user", res.data.content);
          setTimeout(() => {
            navigate("/");
          }, [1000]);
        })
        .catch((err) => {
          console.log(err);
          //   messageApi.error(err.response.data.content);
        });
    },
    validationSchema: yup.object({
      taiKhoan: yup
        .string()
        .required("*Nhớ chú ý nhập dữ liệu nhé!")
        .min(3, "Must be 3 characters or more"),
      matKhau: yup
        .string()
        .required("*Nhớ nhập mật khẩu!")
        .min(3, "*Mật khẩu phải từ 3 ký tự trở lên!"),
    }),
  });
  const { handleSubmit, handleChange } = formik;
  return (
    <div>
      <div>{contextHolder}</div>
      <form onSubmit={handleSubmit} className="mr-20">
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tài khoản
          </label>
          <input
            onChange={handleChange}
            // onBlur={handleBlur}
            type="text"
            name="taiKhoan"
            // status={
            //   formik.errors.taiKhoan && formik.errors.taiKhoan ? "error" : ""
            // }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nhập tài khoản"
          />
          {/* errors.taiKhoan gíup hiển thị lỗi */}
          {/* Nhưng gặp một vấn đề chỉ hiển thị lỗi khi người dùng đã sử dụng input đó, nên chúng ta cần check thêm touched của formik */}
          {formik.errors.taiKhoan && formik.touched.taiKhoan ? (
            <p className="text-red-600">{formik.errors.taiKhoan}</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Mật khẩu
          </label>
          <input
            onChange={handleChange}
            type="password"
            name="matKhau"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {formik.errors.matKhau && formik.touched.matKhau ? (
            <p className="text-red-600">{formik.errors.matKhau}</p>
          ) : (
            ""
          )}
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default FormLogin;
