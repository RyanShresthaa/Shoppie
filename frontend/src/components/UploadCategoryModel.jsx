import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const UploadCategoryModel = ({ close, fetchData }) => {
  const [data, setData] = useState({
    name: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.addCategory,
        data: data,
      });
      const { data: responseData } = response;
      if (responseData?.success) {
        toast.success(responseData?.message || "Category added successfully");
        fetchData?.();
        close();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const response = await uploadImage(file);
    const url = response?.data?.data;
    if (url) {
      setData((prev) => ({ ...prev, image: url }));
    }
  };


  return (
    <section className="fixed inset-0 bg-neutral-800 p-4 flex items-center justify-center bg-opacity-80">
      <div className="bg-white max-w-5xl w-full p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Category</h1>
          <button onClick={close} className="w-fit block ml-auto">
            <IoCloseSharp size={30} />
          </button>
        </div>
        <form className="my-3 flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label id="categoryName">Name</label>
            <input
              type="text"
              id="categoryName"
              placeholder="Enter category name"
              value={data.name}
              name="name"
              onChange={handleOnChange}
              className="bg-teal-50 p-2 border border-teal-100 focus-within:border-teal-200 outline-none rounded"
            />
          </div>
          <div className="grid gap-1">
            <p>Image</p>
            <div className="flex gap-4 flex-col lg:flex-row items-center">
              <div className="border bg-teal-50 h-40 w-full lg:w-36 rounded flex items-center justify-center">
                {
                  data.image ? (
                    <img src={data.image} alt="category" className="h-full w-full object-cover rounded" />
                  ) : (
                    <p className="text-sm text-neutral-500">No Image</p>
                  )
                }
              </div>
              <label htmlFor="uploadCategoryImage">
              <div className={`
              ${!data.name ? "bg-gray-400" : "bg-teal-400"} px-4 py-2 rounded cursor-pointer border border-red-200 hover:bg-teal-300 font-medium
              `}> Upload Image
              </div>
              <input disabled={!data.name} onChange={ handleUploadCategoryImage} type="file"  id="uploadCategoryImage" className="hidden"/>
              </label>
            </div>
          </div>
          <div className="mt-4 flex justify-center w-full">
            <button
              type="submit"
              className={`
                w-full
                ${data.name && data.image ? "bg-teal-300 cursor-pointer" : "bg-gray-400 cursor-not-allowed"}
                py-2 rounded
                font-semibold hover:bg-teal-200
              `}
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModel;
