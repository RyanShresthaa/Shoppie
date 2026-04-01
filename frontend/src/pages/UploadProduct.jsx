import React, { useEffect, useState } from 'react'
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import uploadImage from "../utils/UploadImage";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const initialState = {
  name: "",
  image: [],
  category: [],
  subcategory: [],
  unit: "",
  stock: 0,
  price: 0,
  discount: 0,
  description: "",
  more_details: {},
  publish: true,
};

const UploadProduct = () => {
  const [data, setData] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDependencies = async () => {
    try {
      const [categoryRes, subRes] = await Promise.all([
        Axios({ ...SummaryApi.getCategory }),
        Axios({ ...SummaryApi.getSubCategory }),
      ]);
      setCategories(categoryRes?.data?.data || []);
      setSubCategories(subRes?.data?.data || []);
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchDependencies();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const response = await uploadImage(file);
    const url = response?.data?.data;
    if (url) {
      setData((prev) => ({ ...prev, image: [...prev.image, url] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.addProduct,
        data,
      });
      if (response?.data?.success) {
        toast.success("Product uploaded successfully");
        setData(initialState);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 grid gap-3 max-w-2xl">
        <h2 className="font-semibold text-lg">Upload Product</h2>
        <input className="border rounded p-2" placeholder="Product name" value={data.name} onChange={(e) => setData((p) => ({ ...p, name: e.target.value }))} />
        <div className="grid sm:grid-cols-2 gap-2">
          <input className="border rounded p-2" type="number" placeholder="Price" value={data.price} onChange={(e) => setData((p) => ({ ...p, price: Number(e.target.value) }))} />
          <input className="border rounded p-2" type="number" placeholder="Stock" value={data.stock} onChange={(e) => setData((p) => ({ ...p, stock: Number(e.target.value) }))} />
          <input className="border rounded p-2" type="number" placeholder="Discount %" value={data.discount} onChange={(e) => setData((p) => ({ ...p, discount: Number(e.target.value) }))} />
          <input className="border rounded p-2" placeholder="Unit (e.g. 1kg)" value={data.unit} onChange={(e) => setData((p) => ({ ...p, unit: e.target.value }))} />
        </div>
        <select multiple className="border rounded p-2 min-h-28" value={data.category} onChange={(e) => setData((p) => ({ ...p, category: [...e.target.selectedOptions].map((o) => o.value) }))}>
          {categories.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
        </select>
        <select multiple className="border rounded p-2 min-h-28" value={data.subcategory} onChange={(e) => setData((p) => ({ ...p, subcategory: [...e.target.selectedOptions].map((o) => o.value) }))}>
          {subcategories.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
        </select>
        <textarea className="border rounded p-2" rows={4} placeholder="Description" value={data.description} onChange={(e) => setData((p) => ({ ...p, description: e.target.value }))} />
        <input type="file" onChange={handleImageUpload} />
        <div className="grid grid-cols-3 gap-2">
          {data.image.map((url) => <img key={url} src={url} alt="product" className="h-20 w-full object-cover rounded border" />)}
        </div>
        <button disabled={loading} className="bg-primary-200 rounded py-2">{loading ? "Saving..." : "Upload Product"}</button>
      </form>
    </section>
  )
}

export default UploadProduct