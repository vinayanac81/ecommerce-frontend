import React, { useEffect, useState } from "react";
import NavBar from "../../Components/User/NavBar";
import AxiosUserInstance from "./AxiosUserInstance";
import { BaseUrl } from "../../Constants";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Booking = () => {
  const navigate = useNavigate();
  const [bookingList, setbookingList] = useState([]);
  const getBookingList = async () => {
    try {
      console.log("OK");
      const { data } = await AxiosUserInstance.get("/get-booking-list");
      console.log(data);
      if (data?.success) {
        setbookingList(data?.bookingList);
      } else if (data?.tokenExp || data?.noToken) {
        toast.error("Please login");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("cart");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBookingList();
  }, []);
  const handleNavigate = (orderId) => {
    navigate(`/order/view/${orderId}`);
  };
  return (
    <div>
      <div className="dark:bg-gray-700">
        <NavBar />
        <div className="mt-4 mx-4">
          <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                    <th className="px-4 text-center py-3">Date</th>
                    <th className="px-4 text-center py-3">Address</th>
                    <th className="px-4 text-center py-3">Pincode</th>
                    <th className="px-4 text-center py-3">Mobile Number</th>
                    <th className="px-4 text-center py-3">Amount</th>
                    <th className="px-4 text-center py-3">Payment</th>
                    <th className="px-4 text-center py-3">Status</th>
                    <th className="px-4 text-center py-3">Detail</th>
                    <th className="px-4 text-center py-3">Cancel</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                  {bookingList.map((item, id) => {
                    return (
                      <>
                        <tr className="bg-gray-50 h-14  dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                          <td className="px-4 text-center ">
                            <div className="flex items-center text-sm">
                              <div className="flex justify-center w-full">
                                <p className="font-semibold ">
                                  {item?.date?.slice(0, 10)}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-4  py-3 text-center text-xs">
                            <span className="px-2 py-1 font-semibold leading-tight ">
                              {item?.address?.address}
                            </span>
                          </td>

                          <td className="px-4 py-3 text-center text-xs">
                            <span className="px-2 py-1 font-semibold leading-tight ">
                              {item?.address?.pincode}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center text-xs">
                            <span className="px-2 py-1 font-semibold leading-tight ">
                              {item?.address?.phone_number}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center  text-xs">
                            <span className="px-2 py-1 font-semibold leading-tight ">
                              {item?.discount_price}
                            </span>
                          </td>

                          <td className="px-4 py-3 text-center text-xs">
                            <span className="px-2 py-1 font-semibold leading-tight ">
                              {item?.payment_method}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center text-xs">
                            <span className="px-2 py-1 font-semibold leading-tight ">
                              {item?.order_status.charAt(0).toUpperCase() +
                                item?.order_status.slice(1)}
                            </span>
                          </td>
                          <td className="text-center">
                            <button
                              onClick={() => handleNavigate(item?._id)}
                              className="px-2  py-2 bg-emerald-600 text-white rounded hover:bg-emerald-800"
                            >
                              View
                            </button>
                          </td>
                          <td className="text-center">
                            <button className="px-2  py-2 bg-red-600 text-white rounded hover:bg-red-800">
                              Cancel
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
              <span className="flex items-center col-span-3"> Showing</span>
              <span className="col-span-2" />
              <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                <nav aria-label="Table navigation">
                  <ul className="inline-flex items-center">
                    <li>
                      <button
                        className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                        aria-label="Previous"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                            fillRule="evenodd"
                          />
                        </svg>
                      </button>
                    </li>

                    <li>
                      <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"></button>
                    </li>

                    <li>
                      <button
                        className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                        aria-label="Next"
                      >
                        <svg
                          className="w-4 h-4 fill-current"
                          aria-hidden="true"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                            fillRule="evenodd"
                          />
                        </svg>
                      </button>
                    </li>
                  </ul>
                </nav>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
