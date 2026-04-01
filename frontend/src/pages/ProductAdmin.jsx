import React, { useEffect, useState } from 'react'
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import ConfirmBox from "../components/ConfirmBox";
import toast from "react-hot-toast";

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    ordersCount: 0,
    productsCount: 0,
    categoriesCount: 0,
    totalRevenue: 0,
  });
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchProducts = async () => {
    try {
      const [productRes, orderRes, statsRes] = await Promise.all([
        Axios({ ...SummaryApi.getProduct }),
        Axios({ ...SummaryApi.allOrders }),
        Axios({ ...SummaryApi.adminStats }),
      ]);
      setProducts(productRes?.data?.data || []);
      setOrders(orderRes?.data?.data || []);
      setStats(statsRes?.data?.data || stats);
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async () => {
    try {
      await Axios({ ...SummaryApi.deleteProduct, data: { _id: confirmDelete } });
      toast.success("Product deleted");
      setConfirmDelete(null);
      fetchProducts();
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const togglePublish = async (item) => {
    try {
      await Axios({ ...SummaryApi.updateProduct, data: { _id: item._id, publish: !item.publish } });
      fetchProducts();
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const updateOrderStatus = async (orderId, delivery_status) => {
    try {
      await Axios({
        ...SummaryApi.updateOrderStatus,
        data: { _id: orderId, delivery_status },
      });
      toast.success("Order status updated");
      fetchProducts();
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="p-3 grid gap-5">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="app-surface p-3"><p className="text-sm text-gray-500">Orders</p><p className="text-2xl font-semibold">{stats.ordersCount}</p></div>
        <div className="app-surface p-3"><p className="text-sm text-gray-500">Products</p><p className="text-2xl font-semibold">{stats.productsCount}</p></div>
        <div className="app-surface p-3"><p className="text-sm text-gray-500">Categories</p><p className="text-2xl font-semibold">{stats.categoriesCount}</p></div>
        <div className="app-surface p-3"><p className="text-sm text-gray-500">Revenue</p><p className="text-2xl font-semibold">Rs {stats.totalRevenue}</p></div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {products.map((item) => (
          <div key={item._id} className="app-surface overflow-hidden">
            <img src={item?.image?.[0]} alt={item?.name} className="h-40 w-full object-cover" />
            <div className="p-2">
              <p className="font-semibold line-clamp-1">{item?.name}</p>
              <p className="text-sm">Rs {item?.price}</p>
              <div className="mt-2 flex gap-2">
                <button onClick={() => togglePublish(item)} className="px-2 py-1 rounded bg-neutral-100 text-neutral-700 hover:bg-neutral-200">
                  {item.publish ? "Unpublish" : "Publish"}
                </button>
                <button onClick={() => setConfirmDelete(item._id)} className="px-2 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="app-surface p-3">
        <h3 className="font-semibold mb-2">Order Management</h3>
        <div className="grid gap-2">
          {orders.map((order) => (
            <div key={order._id} className="border border-neutral-200 rounded-lg p-2 flex items-center justify-between">
              <div>
                <p className="font-medium">{order?.product_details?.name}</p>
                <p className="text-sm">Order: {order.orderId}</p>
                <p className="text-sm">Payment: {order.payment_status}</p>
              </div>
              <select
                value={order.delivery_status || "pending"}
                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                className="app-input max-w-[180px] p-1.5"
              >
                <option value="pending">pending</option>
                <option value="placed">placed</option>
                <option value="packed">packed</option>
                <option value="shipped">shipped</option>
                <option value="delivered">delivered</option>
                <option value="cancelled">cancelled</option>
              </select>
            </div>
          ))}
        </div>
      </div>
      {confirmDelete && (
        <ConfirmBox
          close={() => setConfirmDelete(null)}
          cancel={() => setConfirmDelete(null)}
          confirm={handleDelete}
          message="Delete this product?"
        />
      )}
    </section>
  )
}

export default ProductAdmin