import React, { useEffect, useState } from "react";
// import { nguoiDungServ } from "../../services/nguoiDungServices";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../redux/slices/nguoiDungSlice";
import TableUser from "../../Components/TableUser/TableUser";
import { Drawer } from "antd";
import FormAddUser from "../../Components/FormAddUser/FormAddUser";

const UserManagement = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.nguoiDung);
  useEffect(() => {
    // nguoiDungServ
    //   .getAllUser()
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    dispatch(getAllUser());
  }, []);
  console.log(users);
  // Một hàm vừa gọi dữ liệy vừa bắn dữ liệu lên redux
  // redux không cho phép gọi bất đồng bộ bên trên redux
  // redux-thunk là một middleware cho phép xử lí trước khi một dispatch tới store
  // redux-saga
  return (
    <div>
      <button
        onClick={showDrawer}
        className="bg-green-500 text-white py-2 px-5 rounded-lg mb-5"
      >
        Thêm mới
      </button>
      <TableUser />
      <Drawer
        title="Thêm người dùng"
        placement={"top"}
        closable={false}
        onClose={onClose}
        open={open}
        size="large"
      >
        <FormAddUser />
      </Drawer>
    </div>
  );
};

export default UserManagement;
