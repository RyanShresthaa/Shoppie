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

const linkClass = "block rounded-lg px-2.5 py-1.5 text-slate-700 transition hover:bg-brand-50 hover:text-brand-800";

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
    <div className="p-0.5">
      <p className="px-1 font-display font-semibold text-slate-900">My account</p>
      <div className="mt-1 flex items-center justify-between gap-2 px-1 text-sm text-slate-600">
        <span className="max-w-[10rem] truncate" title={user.name || user.mobile}>
          {user.name || user.mobile}
        </span>
        <Link
          onClick={handleClose}
          to={"/dashboard/profile"}
          className="rounded p-0.5 text-slate-500 transition hover:text-brand-600"
          aria-label="Open profile"
        >
          <BiLinkExternal size={17} />
        </Link>
      </div>
      <div className="my-2">
        <Divider />
      </div>
      <div className="grid gap-0.5 text-sm">
        {user?.role === "Admin" && (
          <>
            <Link onClick={handleClose} to={"/dashboard/category"} className={linkClass}>
              Category
            </Link>

            <Link onClick={handleClose} to={"/dashboard/subcategory"} className={linkClass}>
              Sub category
            </Link>

            <Link onClick={handleClose} to={"/dashboard/product"} className={linkClass}>
              Product
            </Link>

            <Link onClick={handleClose} to={"/dashboard/uploadproduct"} className={linkClass}>
              Upload product
            </Link>
          </>
        )}

        {user?.role !== "Admin" && (
          <Link onClick={handleClose} to={"/dashboard/product"} className={linkClass}>
            Products
          </Link>
        )}

        <Link onClick={handleClose} to={"/dashboard/MyOrders"} className={linkClass}>
          My orders
        </Link>
        <Link onClick={handleClose} to={"/dashboard/Address"} className={linkClass}>
          Saved addresses
        </Link>
        <button
          onClick={handleLogOut}
          className="mt-0.5 w-full rounded-lg px-2.5 py-1.5 text-left text-sm text-red-600 transition hover:bg-red-50"
          type="button"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
