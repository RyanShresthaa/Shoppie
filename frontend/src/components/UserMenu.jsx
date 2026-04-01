import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { logout } from "../redux/userSlice";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { BiLinkExternal } from "react-icons/bi";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await Axios.get(SummaryApi.logout.url);
      toast.success("Logged out successfully");
    } catch (error) {
      AxiosToastError(error);
    } finally {
      close?.();
      dispatch(logout());
      localStorage.removeItem("accesstoken");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/");
    }
  };

  const handleClose = () => {
    if (close) {
      close();
    }
  };

  return (
    <div>
      <div className="font-semibold"> My Account </div>
      <div className="text-sm flex items-center gap-3">
        <span className="max-w-52 text-ellipsis line-clamp-1">
          {user.name || user.mobile}
        </span>
        <Link onClick={handleClose} to={"/dashboard/profile"}>
          <BiLinkExternal size={17} className="hover:text-primary-light" />
        </Link>
      </div>
      <Divider />
      <div className="text-sm grid gap-2">
        {user?.role === "Admin" && (
          <>
            <Link
              onClick={handleClose}
              to={"/dashboard/category"}
              className="px-2  hover:bg-blue-200"
            >
              Category
            </Link>

            <Link
              onClick={handleClose}
              to={"/dashboard/subcategory"}
              className="px-2  hover:bg-blue-200"
            >
              Sub Category
            </Link>

            <Link
              onClick={handleClose}
              to={"/dashboard/product"}
              className="px-2  hover:bg-blue-200"
            >
              Product
            </Link>

            <Link
              onClick={handleClose}
              to={"/dashboard/uploadproduct"}
              className="px-2  hover:bg-blue-200"
            >
              Upload Product
            </Link>
          </>
        )}

        {user?.role !== "Admin" && (
          <Link
            onClick={handleClose}
            to={"/dashboard/product"}
            className="px-2  hover:bg-blue-200"
          >
            Products
          </Link>
        )}

        <Link
          onClick={handleClose}
          to={"/dashboard/MyOrders"}
          className="px-2  hover:bg-blue-200"
        >
          My Orders
        </Link>
        <Link
          onClick={handleClose}
          to={"/dashboard/Address"}
          className="px-2  hover:bg-blue-200"
        >
          Save Address
        </Link>
        <button
          onClick={handleLogOut}
          className="text-left px-2 hover:bg-red-500"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
