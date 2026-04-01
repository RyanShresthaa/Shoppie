import React, { useEffect, useState } from 'react'
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import ConfirmBox from "../components/ConfirmBox";

const initialData = {
  address_line: "",
  city: "",
  state: "",
  pincode: "",
  country: "Nepal",
  mobile: "",
};

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState(initialData);
  const [deleteId, setDeleteId] = useState(null);

  const fetchAddress = async () => {
    try {
      const response = await Axios({ ...SummaryApi.getAddress });
      setAddresses(response?.data?.data || []);
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  const addAddress = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({ ...SummaryApi.addAddress, data: form });
      if (response?.data?.success) {
        toast.success("Address added");
        setForm(initialData);
        fetchAddress();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const deleteAddress = async () => {
    try {
      await Axios({ ...SummaryApi.deleteAddress, data: { _id: deleteId } });
      setDeleteId(null);
      toast.success("Address deleted");
      fetchAddress();
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="p-3 grid lg:grid-cols-[360px,1fr] gap-4">
      <form onSubmit={addAddress} className="app-surface p-3 grid gap-2 h-fit">
        <h2 className="font-semibold">Add Address</h2>
        <input className="app-input" placeholder="Address line" value={form.address_line} onChange={(e) => setForm((p) => ({ ...p, address_line: e.target.value }))} />
        <input className="app-input" placeholder="City" value={form.city} onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))} />
        <input className="app-input" placeholder="State" value={form.state} onChange={(e) => setForm((p) => ({ ...p, state: e.target.value }))} />
        <input className="app-input" placeholder="Pincode" value={form.pincode} onChange={(e) => setForm((p) => ({ ...p, pincode: e.target.value }))} />
        <input className="app-input" placeholder="Country" value={form.country} onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))} />
        <input className="app-input" placeholder="Mobile" value={form.mobile} onChange={(e) => setForm((p) => ({ ...p, mobile: e.target.value }))} />
        <button className="app-btn app-btn-primary">Save Address</button>
      </form>
      <div className="grid sm:grid-cols-2 gap-3">
        {addresses.map((address) => (
          <div key={address._id} className="app-surface p-3">
            <p>{address.address_line}</p>
            <p>{address.city}, {address.state}</p>
            <p>{address.country} - {address.pincode}</p>
            <p>{address.mobile}</p>
            <button onClick={() => setDeleteId(address._id)} className="mt-2 px-2 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200">Delete</button>
          </div>
        ))}
      </div>
      {deleteId && (
        <ConfirmBox
          close={() => setDeleteId(null)}
          cancel={() => setDeleteId(null)}
          confirm={deleteAddress}
          message="Delete this address?"
        />
      )}
    </section>
  )
}

export default Address