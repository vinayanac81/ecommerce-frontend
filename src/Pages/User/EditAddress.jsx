import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AxiosUserInstance from "./AxiosUserInstance";
import NavBar from "../../Components/User/NavBar";
import toast from "react-hot-toast";

const EditAddress = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  useEffect(() => {
    getAddress();
  }, []);
  const getAddress = async () => {
    try {
      const { data } = await AxiosUserInstance.get("/get-address");
      if (data.success) {
        console.log(data);
        setaddressData({
          ...addressData,
          address: data.address.address,
          firstName: data.address.first_name,
          lastName: data.address.last_name,
          email: data.address.email,
          phoneNumber: data.address.phone_number,
          pincode: data.address.pincode,
          place: data.address.place,
          state: data.address.state,
          district: data.address.district,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateChanges = async () => {
    try {
      const { data } = await AxiosUserInstance.post("/update-address", {
        addressId: id,
        addressData,
      });
      console.log(data);
      if (data.success) {
        navigate("/account");
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <NavBar />

        <div className="bg-gray-700 h-screen text-white px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex  justify-center text-xl">
              <h2>Delivery Address</h2>
            </div>
            <div className="flex mt-5 max-w-4xl gap-4">
              <div className="w-1/2 gap-2 flex flex-col">
                <label htmlFor="">First Name</label>
                <input
                  type="text"
                  onChange={(e) =>
                    setaddressData({
                      ...addressData,
                      firstName: e.target.value,
                    })
                  }
                  value={addressData.firstName}
                  className="bg-white rounded text-gray-700 px-4 py-2"
                />
              </div>
              <div className="w-1/2 gap-2 flex flex-col">
                <label htmlFor="">Last Name</label>
                <input
                  type="text"
                  value={addressData.lastName}
                  className="bg-white rounded text-gray-700 px-4 py-2"
                />
              </div>
            </div>
            <div className="w-full mt-4 flex gap-2 flex-col">
              <label htmlFor="">Address</label>
              <textarea
                type="text"
                value={addressData.address}
                className="bg-white rounded text-gray-700 px-4 py-2"
              />
            </div>
            <div className="flex mt-5 max-w-4xl gap-4">
              <div className="w-1/3 gap-2 flex flex-col">
                <label htmlFor="">Place</label>
                <input
                  type="text"
                  value={addressData.place}
                  className="bg-white rounded text-gray-700 px-4 py-2"
                />
              </div>
              <div className="w-1/3  gap-2 flex flex-col">
                <label htmlFor="">District</label>
                <input
                  type="text"
                  value={addressData.district}
                  className="bg-white rounded text-gray-700 px-4 py-2"
                />
              </div>
              <div className="w-1/3 gap-2 flex flex-col">
                <label htmlFor="">State</label>
                <input
                  type="text"
                  value={addressData.state}
                  className="bg-white rounded text-gray-700 px-4 py-2"
                />
              </div>
            </div>
            <div className="flex mt-5 max-w-4xl gap-4">
              <div className="w-1/3 gap-2 flex flex-col">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  value={addressData.email}
                  className="bg-white rounded text-gray-700 px-4 py-2"
                />
              </div>
              <div className="w-1/3 gap-2 flex flex-col">
                <label htmlFor="">Pincode</label>
                <input
                  type="text"
                  value={addressData.pincode}
                  className="bg-white rounded text-gray-700 px-4 py-2"
                />
              </div>
              <div className="w-1/3 gap-2 flex flex-col">
                <label htmlFor="">Phone</label>
                <input
                  type="text"
                  value={addressData.phoneNumber}
                  className="bg-white rounded text-gray-700 px-4 py-2"
                />
              </div>
            </div>
            <div className="flex gap-5">
              <button
                onClick={updateChanges}
                className="px-4 py-2 mt-2 bg-blue-600 rounded hover:bg-blue-800"
              >
                Update changes
              </button>
              <Link to={"/account"}>
                <button className="px-4 py-2 mt-2 bg-gray-500 rounded hover:bg-gray-800">
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAddress;
