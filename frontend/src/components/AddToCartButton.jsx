import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";

const addBtn =
  "w-full rounded-xl bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:opacity-60";
const stepBtn =
  "flex flex-1 items-center justify-center rounded-lg bg-brand-600 py-2 text-white transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-600";

const AddToCartButton = ({ data }) => {
  const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isAvailableCart, setIsAvailableCart] = useState(false);
  const [qty, setQty] = useState(0);
  const [cartItemDetails, setCartItemsDetails] = useState();

  const handleADDTocart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user?._id) {
      toast("Please login first");
      navigate("/login");
      return;
    }
    if (!data?._id) {
      toast.error("Product not available");
      return;
    }

    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.addTocart,
        data: {
          productId: data?._id,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchCartItem) {
          await fetchCartItem();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkingitem = cartItem.some((item) => item?.productId?._id === data?._id);
    setIsAvailableCart(checkingitem);

    const product = cartItem.find((item) => item?.productId?._id === data?._id);
    setQty(product?.quantity);
    setCartItemsDetails(product);
  }, [data, cartItem]);

  const increaseQty = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const response = await updateCartItem(cartItemDetails?._id, qty + 1);

    if (response.success) {
      toast.success("Item added");
    }
  };

  const decreaseQty = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (qty === 1) {
      deleteCartItem(cartItemDetails?._id);
    } else {
      const response = await updateCartItem(cartItemDetails?._id, qty - 1);

      if (response.success) {
        toast.success("Item remove");
      }
    }
  };
  return (
    <div className="w-full max-w-[10rem]">
      {isAvailableCart ? (
        <div className="flex w-full items-stretch gap-0.5 overflow-hidden rounded-xl border border-brand-200 bg-white shadow-sm">
          <button type="button" onClick={decreaseQty} className={stepBtn} aria-label="Decrease">
            <FaMinus className="h-3.5 w-3.5" />
          </button>
          <p className="flex min-w-8 flex-1 items-center justify-center bg-slate-50/80 text-sm font-bold text-slate-800">
            {qty}
          </p>
          <button type="button" onClick={increaseQty} className={stepBtn} aria-label="Increase">
            <FaPlus className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <button type="button" onClick={handleADDTocart} className={addBtn} disabled={loading}>
          {loading ? <Loading /> : "Add"}
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;
