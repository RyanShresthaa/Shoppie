import AddressModel from "../models/address.model.js";

export const addAddressController = async (req, res) => {
  try {
    const payload = req.body || {};
    const created = await AddressModel.create({ ...payload, userId: req.userId });
    return res.json({ message: "Address added", data: created, error: false, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message || error, error: true, success: false });
  }
};

export const getAddressController = async (req, res) => {
  try {
    const data = await AddressModel.find({ userId: req.userId }).sort({ createdAt: -1 });
    return res.json({ data, error: false, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message || error, error: true, success: false });
  }
};

export const updateAddressController = async (req, res) => {
  try {
    const { _id, ...rest } = req.body || {};
    const updated = await AddressModel.findOneAndUpdate({ _id, userId: req.userId }, rest, { new: true });
    return res.json({ message: "Address updated", data: updated, error: false, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message || error, error: true, success: false });
  }
};

export const deleteAddressController = async (req, res) => {
  try {
    const { _id } = req.body || {};
    await AddressModel.deleteOne({ _id, userId: req.userId });
    return res.json({ message: "Address deleted", error: false, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message || error, error: true, success: false });
  }
};
