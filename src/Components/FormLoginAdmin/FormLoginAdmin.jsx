import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { nguoiDungServ } from "../../services/nguoiDungServices";
import { luuXuongLocal } from "../../utils/localStore";

const FormLoginAdmin = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      console.log(values);
      nguoiDungServ
        .dangNhap(values)
        .then((res) => {
          console.log(res);
          if (res.data.content.maLoaiNguoiDung == "QuanTri") {
            luuXuongLocal("user", res.data.content);
            navigate("/admin");
          } else {
            window.location.href = "";
          }
        })
        .catch((err) => {
          console.log(err);
          // Trường hợp khi mà tài khoản mật khẩu không đúng trên server
          alert(" Tài khoản mật khẩu không đúng!");
          // Clear hết input trong form đi dùng phuong thức formik.resetForm()
          formik.resetForm({
            values: {
              taiKhoan: "",
              matKhau: "",
            },
          });
        });
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required("Không được để trống trường này!"),
      matKhau: Yup.string().required("Vui lòng nhập mật khẩu!"),
    }),
  });
  console.log(formik.values.taiKhoan, "TKHOAN");
  return (
    <div>
      <h2 className="font-bold text-2xl"> Login Admin</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="taiKhoan"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tài Khoản
          </label>
          <input
            type="text"
            id="taiKhoan"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nhập họ tên"
            // Phhương thức .formik.values.
            value={formik.values.taiKhoan}
          />
          {formik.errors && formik.touched.taiKhoan ? (
            <p className="text-red-500">{formik.errors.taiKhoan}</p>
          ) : (
            <></>
          )}
        </div>
        <div>
          <label
            htmlFor="matKhau"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Mật khẩu
          </label>
          <input
            type="text"
            id="matKhau"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Nhập mật khẩu"
            value={formik.values.matKhau}
          />
          {formik.errors && formik.touched.matKhau ? (
            <p className="text-red-500">{formik.errors.matKhau}</p>
          ) : (
            <></>
          )}
        </div>
        <button
          type="submit"
          className="py-1 px-3 rounded bg-green-700 text-white"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default FormLoginAdmin;
