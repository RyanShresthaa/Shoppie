import React, { useState } from 'react'
import uploadImage from "../utils/UploadImage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const EditCategory = ({ data, close, fetchData }) => {
  const [form, setForm] = useState({
    _id: data?._id || "",
    name: data?.name || "",
    image: data?.image || "",
  });
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const response = await uploadImage(file);
    const url = response?.data?.data;
    if (url) setForm((prev) => ({ ...prev, image: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateCategory,
        data: form,
      });
      if (response?.data?.success) {
        toast.success(response?.data?.message || "Category updated");
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
    <section className="fixed inset-0 z-50 bg-neutral-800/70 p-4 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white w-full max-w-md p-4 rounded grid gap-3">
        <h2 className="font-semibold text-lg">Edit Category</h2>
        <input
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          className="border rounded p-2"
          placeholder="Category name"
        />
        <div className="h-36 border rounded bg-gray-50 flex items-center justify-center overflow-hidden">
          {form.image ? <img src={form.image} alt="category" className="w-full h-full object-cover" /> : <p>No image</p>}
        </div>
        <input type="file" onChange={handleUpload} />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={close} className="px-3 py-1 border rounded">Cancel</button>
          <button disabled={loading} className="px-3 py-1 bg-primary-200 rounded">
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </section>
  )
}

export default EditCategory