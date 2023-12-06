import React, { useState } from "react";
import NavBar from "../../Components/User/NavBar";
import AxiosUserInstance from "./AxiosUserInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddAddress = () => {
    const navigate=useNavigate()
  const [addressData, setaddressData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    pincode: "",
    address: "",
    place: "",
    district: "",
    state: "",
  });
  const addAddress = async () => {
    try {
        console.log(addressData);
      const { data } = await AxiosUserInstance.post("/add-address", {
        address: addressData,
      });
      if(data.success){
        navigate("/profile")
        toast.success(data.message)

      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <NavBar />

      <div className="bg-gray-700 h-screen text-white px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex  justify-center text-xl">
            <h2>Please fill address correctly...</h2>
          </div>
          <div className="flex mt-5 max-w-4xl gap-4">
            <div className="w-1/2 gap-2 flex flex-col">
              <label htmlFor="">First Name</label>
              <input
                type="text"
                onChange={(e) =>
                  setaddressData({ ...addressData, firstName: e.target.value })
                }
                value={addAddress.firstName}
                className="bg-white rounded text-gray-700 px-4 py-2"
              />
            </div>
            <div className="w-1/2 gap-2 flex flex-col">
              <label htmlFor="">Last Name</label>
              <input
                type="text"
                onChange={(e) =>
                  setaddressData({ ...addressData, lastName: e.target.value })
                }
                value={addAddress.lastName}
                className="bg-white rounded text-gray-700 px-4 py-2"
              />
            </div>
          </div>
          <div className="w-full mt-4 flex gap-2 flex-col">
            <label htmlFor="">Address</label>
            <textarea
              type="text"
              onChange={(e) =>
                setaddressData({ ...addressData, address: e.target.value })
              }
              value={addAddress.address}
              className="bg-white rounded text-gray-700 px-4 py-2"
            />
          </div>
          <div className="flex mt-5 max-w-4xl gap-4">
            <div className="w-1/3 gap-2 flex flex-col">
              <label htmlFor="">Place</label>
              <input
                type="text"
                onChange={(e) =>
                  setaddressData({ ...addressData, place: e.target.value })
                }
                value={addAddress.place}
                className="bg-white rounded text-gray-700 px-4 py-2"
              />
            </div>
            <div className="w-1/3  gap-2 flex flex-col">
              <label htmlFor="">District</label>
              <input
                type="text"
                onChange={(e) =>
                  setaddressData({ ...addressData, district: e.target.value })
                }
                value={addAddress.district}
                className="bg-white rounded text-gray-700 px-4 py-2"
              />
            </div>
            <div className="w-1/3 gap-2 flex flex-col">
              <label htmlFor="">State</label>
              <input
                type="text"
                onChange={(e) =>
                  setaddressData({ ...addressData, state: e.target.value })
                }
                value={addAddress.address}
                className="bg-white rounded text-gray-700 px-4 py-2"
              />
            </div>
          </div>
          <div className="flex mt-5 max-w-4xl gap-4">
            <div className="w-1/3 gap-2 flex flex-col">
              <label htmlFor="">Email</label>
              <input
                type="email"
                onChange={(e) =>
                  setaddressData({ ...addressData, email: e.target.value })
                }
                value={addAddress.email}
                className="bg-white rounded text-gray-700 px-4 py-2"
              />
            </div>
            <div className="w-1/3 gap-2 flex flex-col">
              <label htmlFor="">Pincode</label>
              <input
                type="text"
                onChange={(e) =>
                  setaddressData({ ...addressData, pincode: e.target.value })
                }
                value={addAddress.pincode}
                className="bg-white rounded text-gray-700 px-4 py-2"
              />
            </div>
            <div className="w-1/3 gap-2 flex flex-col">
              <label htmlFor="">Phone</label>
              <input
                type="text"
                onChange={(e) =>
                  setaddressData({
                    ...addressData,
                    phoneNumber: e.target.value,
                  })
                }
                value={addAddress.phoneNumber}
                className="bg-white rounded text-gray-700 px-4 py-2"
              />
            </div>
          </div>
          <div className="flex gap-5 mt-5 justify-center">
            <button
              onClick={addAddress}
              className="bg-primary-600 py-2 px-4 rounded hover:bg-primary-800"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
