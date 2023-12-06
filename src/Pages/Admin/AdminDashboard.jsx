import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { Avatar } from "flowbite-react";
import LeftLayout from "../../Components/Admin/LeftLayout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AxiosInstance, { BaseUrl } from "../../Constants";
import Header from "../../Components/Admin/Header";
import toast from "react-hot-toast";
import { RevenueData } from "../Admin/Data";
import BarChart from "../../Components/Admin/BarChart";
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [totalOrders, settotalOrders] = useState("");
  const [totalUsers, settotalUsers] = useState("");
  const [totalAmount, settotalAmount] = useState("");
  const [payments, setpayments] = useState([]);
  const [incomeData, setincomeData] = useState({
    labels: RevenueData.map((data) => data.month),
    datasets: [
      {
        label: "Income Generated",
        data: RevenueData.map((data) => data.Profit),
        backgroundColor:["red","green","blue","yellow","cyan","black"]
      },
    ],
  });
  const { adminDetails } = useSelector((state) => state.admin);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      setloading(true);
      const { data } = await AxiosInstance.get("/admin/get-dashboard-data");
      console.log(data);
      setloading(false);
      settotalAmount(data?.amount);
      settotalOrders(data?.totalOrders);
      settotalUsers(data?.totalUsers);
      setpayments(data?.payments);
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message === "unauthorized user") {
        localStorage.removeItem("admin");
        localStorage.removeItem("admin-token");
        navigate("/admin");
        toast.error("Please login");
      }
    }
  };
  return (
    <div>
      <div x-data="setup()" className="{ 'dark': isDark }">
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
          <Header />
          <LeftLayout active="dashboard" />
          {loading && (
            <>
              <div className="w-full  h-screen flex justify-center items-center">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </>
          )}
          <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
            <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4 gap-4">
              {/* <div className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                  <svg
                    width={30}
                    height={30}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="text-right">
                  <p className="text-2xl">1,257</p>
                  <p>Visitors</p>
                </div>
              </div> */}
              <div className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                  <svg
                    width={30}
                    height={30}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <div className="text-right">
                  <p className="text-2xl">{totalOrders}</p>
                  <p>Orders</p>
                </div>
              </div>
              <div className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokewidth="1.5"
                    stroke="currentColor"
                    className="w-6 text-black h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    />
                  </svg>
                </div>
                <div className="text-right">
                  <p className="text-2xl">{totalUsers}</p>
                  <p>Users</p>
                </div>
              </div>
              <div className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                  <svg
                    width={30}
                    height={30}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="text-right">
                  <p className="text-2xl">{totalAmount}</p>
                  <p>Balances</p>
                </div>
              </div>
            </div>
            <div style={{height:540}} className="flex justify-center">
              <BarChart chartData={incomeData} />
            </div>
            <div className="mt-4 mx-4">
              <div className="flex mb-4 uppercase text-md justify-center ">
                <h2>Today orders</h2>
              </div>
              <div className="w-full overflow-hidden rounded-lg shadow-xs">
                <div className="w-full overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                        <th className="px-4 py-3">Client</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                      {payments.map((data) => {
                        return (
                          <>
                            <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                              <td className="px-4 py-3">
                                <div className="flex items-center text-sm">
                                  <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                    {data?.user?.image !== "" ? (
                                      <>
                                        <Avatar
                                          alt="User settings"
                                          img={`${BaseUrl}/images/${data?.user?.image}`}
                                          rounded
                                        />
                                      </>
                                    ) : (
                                      <>
                                        <Avatar rounded />
                                      </>
                                    )}

                                    <div
                                      className="absolute inset-0 rounded-full shadow-inner"
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <div>
                                    <p className="font-semibold">
                                      {data?.user?.first_name}{" "}
                                      {data?.user?.last_name}
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                      {data?.user?.email}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {data?.after_discount}
                              </td>
                              <td className="px-4 py-3 text-xs">
                                <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                  {" "}
                                  {data?.payment_status}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {new Date(data?.date).toString().slice(0, 15)}
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
                    Showing 1 - 10 of 100{" "}
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
                          <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                            1
                          </button>
                        </li>
                        <li>
                          <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                            2
                          </button>
                        </li>
                        <li>
                          <button className="px-3 py-1 text-white dark:text-gray-800 transition-colors duration-150 bg-blue-600 dark:bg-gray-100 border border-r-0 border-blue-600 dark:border-gray-100 rounded-md focus:outline-none focus:shadow-outline-purple">
                            3
                          </button>
                        </li>
                        <li>
                          <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                            4
                          </button>
                        </li>
                        <li>
                          <span className="px-3 py-1">...</span>
                        </li>
                        <li>
                          <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                            8
                          </button>
                        </li>
                        <li>
                          <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                            9
                          </button>
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
      </div>
    </div>
  );
};

export default AdminDashboard;
