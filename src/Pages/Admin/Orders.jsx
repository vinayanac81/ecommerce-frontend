import React, { useEffect, useState } from "react";
import LeftLayout from "../../Components/Admin/LeftLayout";
import AxiosInstance, { BaseUrl } from "../../Constants";
import { Button } from "flowbite-react";
import toast from "react-hot-toast";
import Header from "../../Components/Admin/Header";
import { useNavigate } from "react-router-dom";
const Orders = () => {
  const navigate = useNavigate();
  const [bookingList, setbookingList] = useState([]);
  const [list, setlist] = useState({
    placed: true,
    shipped: false,
    delivered: false,
    cancelled: false,
  });
  const getBookingList = async () => {
    try {
      const { data } = await AxiosInstance.get("/admin/get-booking-list", {
        params: { type: list },
      });
      console.log(data);
      setbookingList(data?.orders);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBookingList();
  }, [list]);
  const handleNavigate = (id) => {
    navigate(`/admin/order/view/${id}`);
  };
  const handleStatus = async (id, type, method, price, userId, products) => {
    try {
      if (type === "ship") {
        const { data } = await AxiosInstance.post("/admin/ship-order", {
          orderId: id,
        });
        if (data.success) {
          setlist({
            ...list,
            placed: true,
            shipped: false,
            cancelled: false,
            delivered: false,
          });
          toast.success(data.message);
        }
      } else if (type === "cancel") {
        const { data } = await AxiosInstance.post("/admin/cancel-order", {
          orderId: id,
          paymentMethod: method,
          price,
          userId,
          products,
        });
        if (data.success) {
          setlist({
            ...list,
            placed: true,
            shipped: false,
            cancelled: false,
            delivered: false,
          });
          toast.success(data.message);
        }
      } else if (type === "delivered") {
        const { data } = await AxiosInstance.post("/admin/delivered-order", {
          orderId: id,
        });
        if (data.success) {
          setlist({
            ...list,
            placed: false,
            shipped: true,
            cancelled: false,
            delivered: false,
          });
          toast.success(data.message);
        }
      } else if (type === "return") {
        const { data } = await AxiosInstance.post("/admin/return-order", {
          orderId: id,
          paymentMethod: method,
          price,
          userId,
          products,
        });
        if (data.success) {
          setlist({
            ...list,
            placed: false,
            shipped: true,
            cancelled: false,
            delivered: false,
          });
          toast.success(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div x-data="setup()" class="{ 'dark': isDark }">
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
          <Header />
          <LeftLayout active="orders" />
          <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
            <div className="flex flex-wrap gap-2 justify-between px-4 py-4">
              <button
                onClick={() =>
                  setlist({
                    ...list,
                    placed: true,
                    shipped: false,
                    cancelled: false,
                    delivered: false,
                  })
                }
                className={`px-4 py-2 rounded outline-sky-700 hover:bg-blue-500 outline ${
                  list.placed && "bg-blue-500 outline-0  text-white"
                }`}
              >
                Pending orders
              </button>
              <button
                onClick={() =>
                  setlist({
                    ...list,
                    placed: false,
                    shipped: true,
                    cancelled: false,
                    delivered: false,
                  })
                }
                className={`px-4 py-2 rounded hover:bg-blue-500 outline-sky-700 outline ${
                  list.shipped && "bg-blue-500 outline-0  text-white"
                }`}
              >
                Shipped orders
              </button>
              <button
                onClick={() =>
                  setlist({
                    ...list,
                    placed: false,
                    shipped: false,
                    cancelled: false,
                    delivered: true,
                  })
                }
                className={`px-4 py-2 rounded hover:bg-blue-500 outline-sky-700 outline ${
                  list.delivered && "bg-blue-500 outline-0  text-white"
                }`}
              >
                Delivered orders
              </button>
              <button
                onClick={() =>
                  setlist({
                    ...list,
                    placed: false,
                    shipped: false,
                    cancelled: true,
                    delivered: false,
                  })
                }
                className={`px-4 py-2 rounded hover:bg-blue-500 outline-sky-700 outline ${
                  list.cancelled && "bg-blue-500 outline-0  text-white"
                }`}
              >
                Cancelled orders
              </button>
            </div>
            {list.placed && (
              <>
                <div className="mt-2 mx-4">
                  <div className="w-full overflow-hidden rounded-lg shadow-xs">
                    <div className="w-full overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                            <th className="px-4 text-center py-3">Order id</th>
                            <th className="px-4 text-center py-3">Name</th>
                            <th className="px-4 text-center py-3">Mobile</th>
                            <th className="px-4 text-center py-3">Amount</th>

                            <th className="px-4 text-center py-3">
                              Order update
                            </th>
                            <th className="px-4 text-center py-3">View</th>
                            <th className="px-4 text-center py-3">Cancel</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                          {bookingList.map((item, id) => {
                            return (
                              <>
                                <tr className="bg-gray-50  h-14  dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                                  <td className="px-4  text-center py-3">
                                    <div className="flex items-center text-sm">
                                      <div className="flex justify-center w-full">
                                        <p className="font-semibold ">
                                          {item?._id}
                                        </p>
                                      </div>
                                    </div>
                                  </td>

                                  <td className="px-4  py-3 text-center text-xs">
                                    <span className="px-2 py-1 font-semibold leading-tight ">
                                      {item?.address?.first_name}{" "}
                                      {item?.address?.last_name}
                                    </span>
                                  </td>

                                  <td className="px-4 py-3 text-center text-xs">
                                    <span className="px-2 py-1 font-semibold leading-tight ">
                                      {item?.address?.phone_number}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3 text-center text-xs">
                                    <span className="px-2 py-1 font-semibold leading-tight ">
                                      {item?.after_discount}
                                    </span>
                                  </td>

                                  <td className="text-center">
                                    <button
                                      onClick={() =>
                                        handleStatus(item._id, "ship")
                                      }
                                      className="px-2  py-2 bg-green-600 text-white rounded hover:bg-green-800"
                                    >
                                      Ship
                                    </button>
                                  </td>
                                  <td className="text-center">
                                    <button
                                      onClick={() => handleNavigate(item._id)}
                                      className="px-2  py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
                                    >
                                      View
                                    </button>
                                  </td>
                                  <td className="text-center">
                                    <button
                                      onClick={() =>
                                        handleStatus(
                                          item._id,
                                          "cancel",
                                          item?.payment_method,
                                          item?.after_discount,
                                          item?.user_id,
                                          item?.products
                                        )
                                      }
                                      className="px-2  py-2 bg-red-600 text-white rounded hover:bg-red-800"
                                    >
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
                      <span className="flex items-center col-span-3">
                        {" "}
                        Showing
                      </span>
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
              </>
            )}
            {list.shipped && (
              <>
                <div className="mt-2 mx-4">
                  <div className="w-full overflow-hidden rounded-lg shadow-xs">
                    <div className="w-full overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                            <th className="px-4 text-center py-3">Order id</th>
                            <th className="px-4 text-center py-3">Name</th>
                            <th className="px-4 text-center py-3">Mobile</th>
                            <th className="px-4 text-center py-3">Amount</th>

                            <th className="px-4 text-center py-3">
                              Order update
                            </th>
                            <th className="px-4 text-center py-3">View</th>
                            <th className="px-4 text-center py-3">Return</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                          {bookingList.map((item, id) => {
                            return (
                              <>
                                <tr className="bg-gray-50  h-14  dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                                  <td className="px-4  text-center py-3">
                                    <div className="flex items-center text-sm">
                                      <div className="flex justify-center w-full">
                                        <p className="font-semibold ">
                                          {item?._id}
                                        </p>
                                      </div>
                                    </div>
                                  </td>

                                  <td className="px-4  py-3 text-center text-xs">
                                    <span className="px-2 py-1 font-semibold leading-tight ">
                                      {item?.address?.first_name}{" "}
                                      {item?.address?.last_name}
                                    </span>
                                  </td>

                                  <td className="px-4 py-3 text-center text-xs">
                                    <span className="px-2 py-1 font-semibold leading-tight ">
                                      {item?.address?.phone_number}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3 text-center text-xs">
                                    <span className="px-2 py-1 font-semibold leading-tight ">
                                      {item?.after_discount}
                                    </span>
                                  </td>

                                  <td className="text-center">
                                    <button
                                      onClick={() =>
                                        handleStatus(item._id, "delivered")
                                      }
                                      className="px-2  py-2 bg-green-600 text-white rounded hover:bg-green-800"
                                    >
                                      Delivered
                                    </button>
                                  </td>
                                  <td className="text-center">
                                    <button
                                      onClick={() => handleNavigate(item._id)}
                                      className="px-2  py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
                                    >
                                      View
                                    </button>
                                  </td>
                                  <td className="text-center">
                                    <button
                                      onClick={() =>
                                        handleStatus(
                                          item._id,
                                          "return",
                                          item?.payment_method,
                                          item?.after_discount,
                                          item?.user_id,
                                          item?.products
                                        )
                                      }
                                      className="px-2  py-2 bg-red-600 text-white rounded hover:bg-red-800"
                                    >
                                      Return
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
                      <span className="flex items-center col-span-3">
                        {" "}
                        Showing
                      </span>
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
              </>
            )}
            {list.delivered && (
              <>
                <div className="mt-2 mx-4">
                  <div className="w-full overflow-hidden rounded-lg shadow-xs">
                    <div className="w-full overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                            <th className="px-4 text-center py-3">Order id</th>
                            <th className="px-4 text-center py-3">Name</th>
                            <th className="px-4 text-center py-3">Mobile</th>
                            <th className="px-4 text-center py-3">Amount</th>

                            <th className="px-4 text-center py-3">
                              Payment status
                            </th>
                            <th className="px-4 text-center py-3">View</th>
                            <th className="px-4 text-center py-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                          {bookingList.map((item, id) => {
                            return (
                              <>
                                <tr className="bg-gray-50  h-14  dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                                  <td className="px-4  text-center py-3">
                                    <div className="flex items-center text-sm">
                                      <div className="flex justify-center w-full">
                                        <p className="font-semibold ">
                                          {item?._id}
                                        </p>
                                      </div>
                                    </div>
                                  </td>

                                  <td className="px-4  py-3 text-center text-xs">
                                    <span className="px-2 py-1 font-semibold leading-tight ">
                                      {item?.address?.first_name}{" "}
                                      {item?.address?.last_name}
                                    </span>
                                  </td>

                                  <td className="px-4 py-3 text-center text-xs">
                                    <span className="px-2 py-1 font-semibold leading-tight ">
                                      {item?.address?.phone_number}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3 text-center text-xs">
                                    <span className="px-2 py-1 font-semibold leading-tight ">
                                      {item?.after_discount}
                                    </span>
                                  </td>

                                  <td className="px-4 py-3 text-center text-xs">
                                    <span className="px-2 py-1 font-semibold leading-tight ">
                                      {item?.payment_status
                                        .charAt(0)
                                        .toUpperCase() +
                                        item?.payment_status.slice(1)}
                                    </span>
                                  </td>
                                  <td className="text-center">
                                    <button
                                      onClick={() => handleNavigate(item._id)}
                                      className="px-2  py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
                                    >
                                      View
                                    </button>
                                  </td>
                                  <td className="text-center">
                                    <button className="px-2  py-2 bg-pink-600 text-white rounded hover:bg-pink-800">
                                      Delivered
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
                      <span className="flex items-center col-span-3">
                        {" "}
                        Showing
                      </span>
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
              </>
            )}
            {list.cancelled && (
              <>
                <div className="mt-2 mx-4">
                  <div className="w-full overflow-hidden rounded-lg shadow-xs">
                    <div className="w-full overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                            <th className="px-4 text-center py-3">Order id</th>
                            <th className="px-4 text-center py-3">Name</th>
                            <th className="px-4 text-center py-3">Mobile</th>
                            <th className="px-4 text-center py-3">Amount</th>

                            <th className="px-4 text-center py-3">
                              Order status
                            </th>
                            <th className="px-4 text-center py-3">View</th>
                            {/* <th className="px-4 text-center py-3">Status</th> */}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                          {bookingList.map((item, id) => {
                            return (
                              <>
                                <tr className="bg-gray-50  h-14  dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                                  <td className="px-4  text-center py-3">
                                    <div className="flex items-center text-sm">
                                      <div className="flex justify-center w-full">
                                        <p className="font-semibold ">
                                          {item?._id}
                                        </p>
                                      </div>
                                    </div>
                                  </td>

                                  <td className="px-4  py-3 text-center text-xs">
                                    <span className="px-2 py-1 font-semibold leading-tight ">
                                      {item?.address?.first_name}{" "}
                                      {item?.address?.last_name}
                                    </span>
                                  </td>

                                  <td className="px-4 py-3 text-center text-xs">
                                    <span className="px-2 py-1 font-semibold leading-tight ">
                                      {item?.address?.phone_number}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3 text-center text-xs">
                                    <span className="px-2 py-1 font-semibold leading-tight ">
                                      {item?.after_discount}
                                    </span>
                                  </td>

                                  <td className="px-4 py-3 text-center text-xs">
                                    <span className="px-2 py-1 font-semibold leading-tight ">
                                      {item?.order_status
                                        .charAt(0)
                                        .toUpperCase() +
                                        item?.order_status.slice(1)}
                                    </span>
                                  </td>
                                  <td className="text-center">
                                    <button
                                      onClick={() => handleNavigate(item._id)}
                                      className="px-2  py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
                                    >
                                      View
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
                      <span className="flex items-center col-span-3">
                        {" "}
                        Showing
                      </span>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
