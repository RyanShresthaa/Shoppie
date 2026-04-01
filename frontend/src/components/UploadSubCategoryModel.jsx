import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import uploadImage from "../utils/UploadImage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const UploadSubCategoryModel = ({ close, fetchData }) => {
  const allCategory = useSelector((state) => state.product.allCategory);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    image: "",
    category: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const response = await uploadImage(file);
    const imageUrl = response?.data?.data?.url || response?.data?.data;
    if (imageUrl) {
      setData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleAddCategory = (e) => {
    const value = e.target.value;
    if (!value) return;
    const selected = allCategory.find((item) => item._id === value);
    if (!selected) return;
    if (data.category.some((item) => item._id === selected._id)) return;
    setData((prev) => ({ ...prev, category: [...prev.category, selected] }));
  };

  const removeSelectedCategory = (id) => {
    setData((prev) => ({
      ...prev,
      category: prev.category.filter((item) => item._id !== id),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.createSubCategory,
        data,
      });
      if (response?.data?.success) {
        toast.success(response.data.message || "Sub category created");
        fetchData?.();
        close?.();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed inset-0 z-50 bg-black/60 p-4 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Add sub category</h2>
          <button onClick={close} type="button">
            <IoClose size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-3">
          <input
            className="border rounded p-2"
            placeholder="Sub category name"
            name="name"
            value={data.name}
            onChange={handleChange}
            required
          />

          <input type="file" accept="image/*" onChange={handleUpload} />
          {data.image && (
            <img src={data.image} alt="subcategory" className="h-20 w-20 rounded object-cover" />
          )}

          <select className="border rounded p-2" defaultValue="" onChange={handleAddCategory}>
            <option value="" disabled>
              Select category
            </option>
            {allCategory.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <div className="flex flex-wrap gap-2">
            {data.category.map((item) => (
              <button
                key={item._id}
                type="button"
                className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700"
                onClick={() => removeSelectedCategory(item._id)}
              >
                {item.name} ×
              </button>
            ))}
          </div>

          <button
            disabled={loading}
            type="submit"
            className="rounded bg-green-600 text-white py-2 hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save sub category"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadSubCategoryModel;
