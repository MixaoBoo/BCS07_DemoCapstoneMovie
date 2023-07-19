import React from "react";
import { Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { nguoiDungServ } from "../../services/nguoiDungServices";
import { getAllUser } from "../../redux/slices/nguoiDungSlice";

// id, hoTen, email, sdt, ma, loai nguoi dung, action
const TableUser = () => {
  const { users } = useSelector((state) => state.nguoiDung);
  console.log(users);
  const dispatch = useDispatch();
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      // custome lai hien thi cot
      render: (text) => <a href="...">{text}</a>,
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDT",
      key: "soDT",
    },
    {
      title: "Loại người dùng",
      key: "maLoaiNguoiDung",
      dataIndex: "maLoaiNguoiDung",
      render: (text, record, index) => {
        // text: chứa giá trị của thuộc tính đó trong data
        // record: chứa các phần tử trong mảng data
        // index: là vị trí các phần tử trong mảng data
        // console.log("text: ", text, "record: ", record, "index: ", index);
        // text == "QuanTri" ? "Quản trị" : "Khách hàng"
        return (
          <Tag color={text == "QuanTri" ? "magenta" : "gold"}>
            {text == "QuanTri" ? "Quản trị" : "Khách hàng"}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* Thêm một popconfirm để hỏi người dùng có muốn xoá hay không và thêm thông báo khi xoá thành công cũng như thất bại */}
          <button
            onClick={() => {
              nguoiDungServ
                .deleteUser(record.taiKhoarn)
                .then((res) => {
                  alert("Xoá thành công!");
                  dispatch(getAllUser());
                })
                .catch((err) => {
                  alert("Có vấn đề xảy ra!");
                });
            }}
            className="py-2 px-5 bg-red-500 text-white rounded-lg hover:bg-red-700 duration-500"
          >
            Xoá
          </button>
          <button className="py-2 px-5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 duration-500">
            Sửa
          </button>
        </Space>
      ),
    },
  ];
  let newUser = users.map((item, index) => {
    return { ...item, id: index + 1 };
  });
  return <Table columns={columns} dataSource={users.length > 0 && newUser} />;
};

export default TableUser;
