import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { useGlobalContext } from "../provider/GlobalProvider";

const initialData = {
  address_line: "",
  city: "",
  state: "",
  pincode: "",
  country: "Nepal",
  mobile: "",
};

const AddAddress = ({ close }) => {
  const [form, setForm] = useState(initialData);
  const { fetchAddress } = useGlobalContext();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.addAddress,
        data: {
          ...form,
          pincode: form.pincode === "" ? "" : Number(form.pincode),
          mobile: form.mobile === "" ? "" : Number(form.mobile),
        },
      });
      if (response?.data?.success) {
        toast.success(response.data.message || "Address added");
        if (fetchAddress) await fetchAddress();
        setForm(initialData);
        close?.();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
        <button
          type="button"
          aria-label="Close"
          onClick={close}
          className="absolute right-3 top-3 text-neutral-600 hover:text-neutral-900"
        >
          <IoClose size={24} />
        </button>
        <h2 className="mb-3 font-semibold">Add address</h2>
        <form onSubmit={submit} className="grid gap-2">
          <input
            className="rounded border p-2"
            placeholder="Address line"
            value={form.address_line}
            onChange={(e) =>
              setForm((p) => ({ ...p, address_line: e.target.value }))
            }
            required
          />
          <input
            className="rounded border p-2"
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
            required
          />
          <input
            className="rounded border p-2"
            placeholder="State"
            value={form.state}
            onChange={(e) => setForm((p) => ({ ...p, state: e.target.value }))}
          />
          <input
            className="rounded border p-2"
            placeholder="Pincode"
            value={form.pincode}
            onChange={(e) =>
              setForm((p) => ({ ...p, pincode: e.target.value }))
            }
            required
          />
          <input
            className="rounded border p-2"
            placeholder="Country"
            value={form.country}
            onChange={(e) =>
              setForm((p) => ({ ...p, country: e.target.value }))
            }
            required
          />
          <input
            className="rounded border p-2"
            placeholder="Mobile"
            value={form.mobile}
            onChange={(e) =>
              setForm((p) => ({ ...p, mobile: e.target.value }))
            }
            required
          />
          <button
            type="submit"
            className="mt-2 rounded bg-green-600 py-2 font-medium text-white hover:bg-green-700"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;
