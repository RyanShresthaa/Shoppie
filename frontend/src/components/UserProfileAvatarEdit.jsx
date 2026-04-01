import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import updatedAvatar from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";


const UserProfileAvatarEdit = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleUploadAvatarImage = async(e) => {
      const file = e.target.files[0]

      const formData = new FormData()
      formData.append('avatar', file)

      setLoading(true)
      try {
        const response = await Axios({
         ...SummaryApi.uploadAvatar,
         data : formData
      })
      const {data : responseData} = response
      dispatch(updatedAvatar(responseData.data.avatar))
      } catch (error) {
        AxiosToastError(error)
    } finally{
        setLoading(false)
    }


  }

  const handleSubmit = (e) => e.preventDefault();
  return (
    <section className="fixed inset-0 z-50 bg-neutral-900/60 flex items-center justify-center">
      <div className="bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center">
        <button  onClick={()=>window.history.back()} className=" text-neutral-900 w-fit block ml-auto">
            <AiFillCloseCircle size={20}/>
        </button>
        <div className="w-16 h-16 bg-black flex items-center justify-center rounded-full drop-shadow-md overflow-hidden">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
          ) : (
            <FaRegUserCircle size={65} />
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="uploadProfile">
            <div className="border border-black hover:bg-green-400 px-4 py-2 rounded text-sm my-3 cursor-pointer">
              {loading ? "Uploading..." : "Upload"}
            </div>
          </label>
          <input onChange={handleUploadAvatarImage} type="file" id="uploadProfile" className="hidden" />
        </form>
      </div>
    </section>
  );
};

export default UserProfileAvatarEdit;
