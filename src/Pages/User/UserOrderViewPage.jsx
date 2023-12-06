import React, { useEffect, useState } from "react";
import NavBar from "../../Components/User/NavBar";
import { useParams } from "react-router-dom";
import AxiosUserInstance from "./AxiosUserInstance";
import { Avatar, Card } from "flowbite-react";
import { BaseUrl } from "../../Constants";
const UserOrderViewPage = () => {
  const { id } = useParams();
  const [loading, setloading] = useState(true);
  const [addressData, setaddressData] = useState({});
  const [orders, setorders] = useState([]);
  const [userData, setuserData] = useState({});
  const [orderFulldata, setorderFulldata] = useState({});
  useEffect(() => {
    getOrderDetails();
  }, []);
  const getOrderDetails = async () => {
    try {
      setloading(true);
      const { data } = await AxiosUserInstance.get("/get-order-details", {
        params: { orderId: id },
      });
      console.log(data);
      setloading(false);
      if (data.success) {
        setorderFulldata(data?.orderdata[0]);
        setaddressData(data?.orderdata[0]?.address);
        setorders(data?.orderdata[0]?.products);
        setuserData(data?.orderdata[0]?.user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
      <NavBar />
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
      <div className="h-full flex flex-col  mt-14 mb-10 ">
        <div className="mt-4 mx-4">
          <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                    <th className="px-4 text-center py-3">Product Name</th>
                    <th className="px-4 text-center py-3">Image</th>
                    <th className="px-4 text-center py-3">Brand</th>
                    <th className="px-4 text-center py-3">Category</th>
                    <th className="px-4 text-center py-3">Quantity</th>
                    <th className="px-4 text-center py-3">Price</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                  {orders?.map((order, id) => {
                    return (
                      <>
                        <tr className="bg-gray-50 h-20  dark:bg-black  hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center text-sm">
                              <div>
                                <p className="font-semibold uppercase">
                                  {order?.product_name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 text-center   text-sm">
                            {order?.image !== "" ? (
                              <>
                                <Avatar
                                  alt="User settings"
                                  size={"md"}
                                  img={`${BaseUrl}/images/${order?.image}`}
                                  rounded
                                />
                              </>
                            ) : (
                              <>
                                <Avatar rounded />
                              </>
                            )}
                          </td>
                          <td className="px-4 uppercase text-center text-xs">
                            <span className="px-2 py-1 font-semibold leading-tight ">
                              {order.sub_category}
                            </span>
                          </td>
                          <td className="px-4 uppercase text-center text-xs">
                            <span className="px-2 py-1 font-semibold leading-tight ">
                              {order.category}
                            </span>
                          </td>
                          <td className="px-4 text-center text-xs">
                            <span className="px-2 py-1 font-semibold leading-tight ">
                              {order.quantity}
                            </span>
                          </td>
                          <td className="px-4 text-center text-xs">
                            <span className="px-2 py-1 font-semibold leading-tight ">
                              {order?.total_price}
                            </span>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
              <span className="flex items-center justify-center col-span-12">
                {orders.length === 1 ? (
                  <>{orders.length} Product Ordered</>
                ) : (
                  <>{orders.length} Products Ordered</>
                )}
              </span>
              <span className="col-span-2" />
            </div>
          </div>
        </div>
        <div className="mt-4 mx-4">
          <div className="h-full  md:justify-center w-full items-center md:items-start md:flex flex gap-5 md:gap-5 flex-col md:flex-row  mt-3 mb- ">
            <div className="md:w-[40%] w-[90%]  md:mb-0 ">
              <Card className="max-w-md">
                <span className="text-center uppercase">Payment Data</span>
                <div className="flex flex-col items-cente pb-12">
                  <h5 className="mb-1  mt-2 text-sm font-medium text-gray-900 dark:text-white">
                    <span className="uppercase"> Order id </span>:{" "}
                    {orderFulldata._id}
                  </h5>
                  <h5 className="mb-1 uppercase text-sm font-medium text-gray-900 dark:text-white">
                    Date : {orderFulldata?.date?.slice(0, 10)}
                  </h5>
                  <h5 className="mb-1 uppercase  text-sm font-medium text-gray-900 dark:text-white">
                    Payment method :{" "}
                    {orderFulldata.payment_method === "COD"
                      ? "Cash on delivery"
                      : "ONLINE"}
                  </h5>
                  <h5 className="mb-1 uppercase  text-sm font-medium text-gray-900 dark:text-white">
                    Payment status : {orderFulldata.payment_status}
                  </h5>
                  <h5 className="mb-1 uppercase  text-sm font-medium text-gray-900 dark:text-white">
                    order status : {orderFulldata.order_status}
                  </h5>
                  <h5 className="mb-1 uppercase  text-sm font-medium text-gray-900 dark:text-white">
                    discount : {orderFulldata.discount_price} Rupees
                  </h5>
                  <h5 className="mb-1 uppercase  text-sm font-medium text-gray-900 dark:text-white">
                    Price : {orderFulldata.after_discount} Rupees
                  </h5>
                </div>
              </Card>
            </div>
            <div className="md:w-[40%] w-[90%] mb-4 md:mb-0 ">
              <Card className="max-w-md">
                <span className="text-center uppercase">User Data</span>
                <div className="flex flex-col items-center ">
                  {userData.image === "" ? (
                    <>
                      <div className="h-28 w-28 ">
                        <div className="rounded-full bg-gray-700 flex justify-center items-center text-6xl w-full h-full">
                          {userData.first_name.slice(0, 1)}{" "}
                          {userData.last_name.slice(0, 1)}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="">
                        <img
                          className="w-28 h-28 rounded-full"
                          src={`${BaseUrl}/images/${userData?.image}`}
                          alt="Rounded avatar"
                        />
                      </div>
                    </>
                  )}

                  <h5 className="mb-1 uppercase mt- text-md font-medium text-gray-900 dark:text-white">
                    {userData.first_name} {userData.last_name}
                  </h5>
                  <h5 className="mb-1 uppercase text-sm font-medium text-gray-900 dark:text-white">
                    Number :{" "}
                    {userData.mobile === undefined
                      ? "not available"
                      : userData.mobile}
                  </h5>
                  <h5 className="mb-1 uppercase  text-sm font-medium text-gray-900 dark:text-white">
                    {userData.email}
                  </h5>
                  <span className="text-sm text-gray-500 dark:text-gray-400"></span>
                  <div className="mt-4 flex space-x-3 md:mt-0">
                    <a
                      href="/"
                      className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                    >
                      Go home
                    </a>
                    <a
                      href="/booking"
                      className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    >
                      Go orders
                    </a>
                  </div>
                </div>
              </Card>
            </div>
            <div className="md:w-[40%] w-[90%]  md:mb-0 ">
              <Card className="max-w-md">
                <span className="text-center uppercase">Address Data</span>
                <div className="flex flex-col items-cente pb-7">
                  <h5 className="mb-1  uppercase mt-2 text-sm font-medium text-gray-900 dark:text-white">
                    full name : {addressData.first_name}
                  </h5>
                  <h5 className="mb-1 uppercase text-sm font-medium text-gray-900 dark:text-white">
                    email : {addressData.email}
                  </h5>
                  <h5 className="mb-1 uppercase  text-sm font-medium text-gray-900 dark:text-white">
                    Phone Number :{addressData.phone_number}
                  </h5>
                  <h5 className="mb-1 uppercase  text-sm font-medium text-gray-900 dark:text-white">
                    address : {addressData.address}
                  </h5>
                  <h5 className="mb-1 uppercase  text-sm font-medium text-gray-900 dark:text-white">
                    pincode : {addressData.pincode}
                  </h5>
                  <h5 className="mb-1 uppercase  text-sm font-medium text-gray-900 dark:text-white">
                    Place : {addressData.place}
                  </h5>
                  <h5 className="mb-1 uppercase  text-sm font-medium text-gray-900 dark:text-white">
                    district : {addressData.district}
                  </h5>
                  <h5 className="mb-1 uppercase  text-sm font-medium text-gray-900 dark:text-white">
                    state : {addressData.state}
                  </h5>
                </div>
              </Card>
            </div>
            {/* <div className="">
              <div className="px-10 flex  text-white">
                <h2 className=" text-lg tracking-wide truncate">
                  Account Settings
                </h2>
              </div>
              <div className="px-10 mt-4  items-center text-sm tracking-wide truncate text-white flex gap-5">
                <label htmlFor="">First Name</label>
                <input
                  type="text"
                  className="rounded border md:w-96 ml-7 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-50 outline-none py-2 px-4 "
                  name=""
                  id=""
                />
              </div>
              <div className="px-10 items-center mt-4 text-sm tracking-wide truncate text-white flex gap-5">
                <label htmlFor="">Last Name</label>
                <input
                  type="text"
                  className="rounded  md:w-96 border ml-7 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-50 outline-none py-2 px-4 "
                  name=""
                  id=""
                />
              </div>

              <div className="px-10 items-center mt-4 text-sm tracking-wide truncate text-white flex gap-5">
                <label htmlFor="">Email Address</label>
                <input
                  type="text"
                  className="rounded  md:w-96  border ml-1 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-50 outline-none py-2 px-4 "
                  name=""
                  id=""
                />
              </div>
              <div className="px-10 mt-4 items-center text-sm tracking-wide truncate text-white flex gap-5">
                <label htmlFor="">Mobile Number</label>
                <input
                  type="text"
                  className="rounded border   md:w-96  border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-50 outline-none py-2 px-4 "
                  name=""
                  id=""
                />
              </div>
              <div className="mt-6 px-10 flex gap-8">
                <button className="text-sm bg-blue-600 hover:bg-blue-800 rounded tracking-wide truncate text-white px-4 py-2 ">
                  Update changes
                </button>
                <button className="text-sm bg-gray-500 hover:bg-gray-800 rounded tracking-wide truncate text-white px-4 py-2 ">
                  Cancel
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrderViewPage;
