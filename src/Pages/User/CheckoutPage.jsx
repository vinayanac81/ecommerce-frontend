import React, { useEffect, useState } from "react";
import NavBar from "../../Components/User/NavBar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AxiosUserInstance from "./AxiosUserInstance";
import { TEInput } from "tw-elements-react";
import { TETextarea } from "tw-elements-react";
import { BaseUrl } from "../../Constants";
import { setUserCart } from "../../Toolkit/UserSlice";
import toast from "react-hot-toast";
const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setproduct] = useState([]);
  const [address, setaddress] = useState({});
  const [discountAvailbale, setdiscountAvailbale] = useState(false);
  const [discountAmount, setdiscountAmount] = useState("");
  const [couponCode, setcouponCode] = useState("");
  const [paymentDetails, setpaymentDetails] = useState({
    cod: false,
    online: false,
    address: false,
    addressId: "",
    amount: "",
    discount_price: "",
    after_discount: "",
  });
  const getProducts = async () => {
    try {
      const { data } = await AxiosUserInstance.get("/get-cart-products");
      if (data.success) {
        console.log(data);
        setaddress(data.address);
        setproduct(data?.cart?.cart_products);
        let product = data?.cart?.cart_products;
        const totalAmount = product?.reduce(
          (acc, curr) => acc + curr.total_price,
          0
        );
        setpaymentDetails({ ...paymentDetails, amount: totalAmount });
      } else if (data.tokenExp || data.noToken) {
        toast.error("Please login");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("cart");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddress = (status, id) => {
    console.log(status, id);
    if (status === false) {
      setpaymentDetails({ ...paymentDetails, address: true, addressId: id });
    } else {
      setpaymentDetails({ ...paymentDetails, address: false, addressId: "" });
    }
  };
  const handleCoupon = async () => {
    try {
      console.log("OK");
      const { data } = await AxiosUserInstance.post("/apply-coupon", {
        couponCode,
        amount: paymentDetails.amount,
      });
      if (data.success) {
        toast.success(data.message);
        let amt = parseInt(data.discount);
        setdiscountAvailbale(true);
        setpaymentDetails({
          ...paymentDetails,
          discount_price: data.discount,
          after_discount: paymentDetails.amount - amt,
        });

        // setpaymentDetails({
        //   ...paymentDetails,
        //   amount: paymentDetails.amount - amt,
        // });
        setdiscountAmount(parseInt(data.discount));
      } else if (data.invalidCoupon) {
      } else if (data.tokenExp || data.noToken) {
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(paymentDetails);
  // const totalPrice = product?.reduce(
  //   (acc, curr) => acc + curr.price * curr.count,
  //   0
  // );
  useEffect(() => {
    getProducts();
  }, []);
  const paymentMethod = (method) => {
    console.log(method);
    if (method === "COD") {
      setpaymentDetails({ ...paymentDetails, cod: true, online: false });
    } else {
      setpaymentDetails({ ...paymentDetails, cod: false, online: true });
    }
  };
  const handleOpenRazorpay = async (data) => {
    console.log(data.id);
    let token;
    const options = {
      key: "rzp_test_mn6BBcws8w4dnR",
      amount: Number(data.amount),
      currency: data.currency,
      name: "PHONE HOUSE",
      description: "Nothing",
      order_id: data.id,
      handler: async (response) => {
        token = localStorage.getItem("token");
        await AxiosUserInstance.post(
          "/create-order",
          { product },
          {
            params: {
              orderId: response.razorpay_order_id,
              paymentDetails,
              arr: true,
            },
          }
        ).then(async (res) => {
          if (res.data.success) {
            console.log(res.data);
            token = localStorage.getItem("token");
            await AxiosUserInstance.post(
              "/verify",
              { response },
              {
                params: { product, arr: true },
              }
            ).then((result) => {
              if (result.data.success) {
                if (result.data.cart === null) {
                  toast.success("Paymnet successfully");
                  localStorage.setItem("cart", 0);
                  dispatch(setUserCart(0));
                  navigate("/order-success", { state: { method: "ONLINE" } });
                } else {
                  toast.success("Payment successfully");
                  localStorage.setItem("cart", data?.cart?.cart_count);
                  dispatch(setUserCart(data?.cart?.cart_count));
                  navigate("/order-success", { state: { method: "ONLINE" } });
                }
              } else {
                toast.error(result.data.message);
              }
            });
          } else {
            toast.error("something error");
          }
        });
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  const handleOrder = async (e) => {
    try {
      e.preventDefault();
      console.log(paymentDetails);
      window.scrollTo(0, 0);
      if (paymentDetails.cod) {
        const { data } = await AxiosUserInstance.post(
          "/order",
          { product },
          {
            params: {
              paymentDetails,
              totalAmount: paymentDetails.amount,
              arr: true,
            },
          }
        );
        console.log(data);
        if (data.success) {
          if (data.cart === null) {
            console.log("o");
            toast.success("Order successfully");
            localStorage.setItem("cart", 0);
            dispatch(setUserCart(0));
            navigate("/order-success", { state: { method: "COD" } });
          } else {
            toast.success("Order successfully");
            localStorage.setItem("cart", data?.cart?.cart_count);
            dispatch(setUserCart(data?.cart?.cart_count));
            navigate("/order-success", { state: { method: "COD" } });
          }
        } else if (data.tokenExp || data.noToken) {
          toast.error("Please login");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          localStorage.removeItem("cart");
        }
      } else if (paymentDetails.online) {
        const { data } = await AxiosUserInstance.post(
          "/order",
          {},
          { params: { paymentDetails } }
        );
        console.log(data);
        if (data.success) {
          handleOpenRazorpay(data.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="">
        <NavBar />
        {product?.length > 0 && (
          <>
            <div>
              <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                <div className="px-4 pt-8">
                  <p className="text-xl font-medium">Order Summary</p>
                  <p className="text-gray-400">
                    Check your items. And select a suitable shipping method.
                  </p>
                  {product.map((item, id) => {
                    return (
                      <>
                        <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                          <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                            <img
                              className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                              src={`${BaseUrl}/images/${item?.image}`}
                              alt
                            />
                            <div className="flex w-full uppercase flex-col px-4 py-4">
                              <span className="font-semibold">
                                {item?.product_name}
                              </span>
                              <span className="float-right uppercase text-gray-400">
                                {item?.category}
                              </span>
                           
                              <div className="flex gap-4">
                              <p className="mt-auto text-sm font-bold">
                              Price : {item?.total_price}
                              </p>
                              <p className="mt-auto text-sm font-bold">
                              Quantity :  {item?.quantity}
                              </p>
                              </div>
                             
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                  <p className="mt-8 text-lg font-medium">Shipping Methods</p>
                  <form className="mt-5 grid gap-6">
                    <div className="relative">
                      <input
                        className="peer hidden"
                        id="radio_1"
                        onChange={() => paymentMethod("COD")}
                        type="radio"
                        checked={paymentDetails.cod}
                        name=""
                        // defaultChecke
                      />
                      <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
                      <label
                        className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                        htmlFor="radio_1"
                      >
                        {/* <img
                    className="w-14 object-contain"
                    src="/images/naorrAeygcJzX0SyNI4Y0.png"
                    alt
                  /> */}
                        <div className="ml-5">
                          <span className="mt-2 font-semibold">
                            Cash on delivery
                          </span>
                          <p className="text-slate-500 text-sm leading-6">
                            Delivery: 2-4 Days
                          </p>
                        </div>
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        className="peer hidden"
                        id="radio_2"
                        checked={paymentDetails.online}
                        onChange={() => paymentMethod("ONLINE")}
                        type="radio"
                        name="radio"
                        // defaultChecke
                      />
                      <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
                      <label
                        className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                        htmlFor="radio_2"
                      >
                        {/* <img
                    className="w-14 object-contain"
                    src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                    alt
                  /> */}
                        <div className="ml-5">
                          <span className="mt-2 font-semibold">
                            Online payment
                          </span>
                          <p className="text-slate-500 text-sm leading-6">
                            Delivery: 2-4 Days
                          </p>
                        </div>
                      </label>
                    </div>
                  </form>
                  <p className="text-xl mt-4 font-medium">
                    Select payment address
                  </p>
                  {address ? (
                    <>
                      <div className="w-full border-gray-300 border-2 my-3 rounded  flex">
                        <div className="w-[70%] font-bold p-4">
                          First Name : {address.first_name} , Last Name :{" "}
                          {address.last_name} , Email : {address.email} , Phone
                          Number : {address.phone_number} , Place :{" "}
                          {address.place}......
                        </div>
                        <div className="w-[30%] flex justify-center items-center">
                          <input
                            type="radio"
                            checked={paymentDetails.address}
                            onClick={() =>
                              handleAddress(paymentDetails.address, address._id)
                            }
                            className="w-8 h-8 "
                            name=""
                            id=""
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  <div className>
                    <div className="mt-5 pt-5 items-center flex gap-4  border-t">
                      <input
                        placeholder="Enter coupon code"
                        className="bg-gray-600 py-2 rounded text-white px-4"
                        type="text"
                        name=""
                        onChange={(e) => setcouponCode(e.target.value)}
                        value={couponCode}
                        id=""
                      />
                      <button
                        onClick={handleCoupon}
                        className="px-4 py-2 text-white  bg-blue-500 rounded"
                      >
                        Apply Coupon
                      </button>
                    </div>
                    {discountAvailbale && (
                      <>
                        <p className="text-sm mt-2 font-medium text-gray-900">
                          Coupon applied
                        </p>
                      </>
                    )}

                    <div className="mt-2 border-t border-b py-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          Subtotal
                        </p>
                        <p className="font-semibold text-gray-900">
                          {paymentDetails?.amount}
                        </p>
                      </div>
                      {discountAvailbale && (
                        <>
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">
                              Discount
                            </p>
                            <p className="font-semibold text-gray-900">
                              {discountAmount}
                            </p>
                          </div>
                        </>
                      )}
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          Shipping
                        </p>
                        <p className="font-semibold text-gray-900">Free</p>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">Total</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {paymentDetails?.amount - discountAmount}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleOrder}
                    className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
