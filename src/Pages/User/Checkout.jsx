import React, { useEffect, useState } from "react";
import NavBar from "../../Components/User/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import AxiosUserInstance from "./AxiosUserInstance";
import toast from "react-hot-toast";
import { BaseUrl } from "../../Constants";
import { useDispatch } from "react-redux";
import { setUserCart } from "../../Toolkit/UserSlice";
const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setproduct] = useState({});
  const [address, setaddress] = useState({});
  const [walletAmount, setwalletAmount] = useState("");
  const [discountAvailbale, setdiscountAvailbale] = useState(false);
  const [discountAmount, setdiscountAmount] = useState("");
  const [couponCode, setcouponCode] = useState("");
  const [paymentDetails, setpaymentDetails] = useState({
    cod: false,
    online: false,
    wallet: false,
    address: false,
    addressId: "",
    amount: "",
    discount_price: "",
    after_discount: "",
  });
  const handleAddress = (status, id) => {
    console.log(status, id);
    if (status === false) {
      setpaymentDetails({ ...paymentDetails, address: true, addressId: id });
    } else {
      setpaymentDetails({ ...paymentDetails, address: false, addressId: "" });
    }
  };
  console.log(product);
  const [loading, setloading] = useState(false);
  const getProducts = async () => {
    try {
      const { data } = await AxiosUserInstance.get("/get-product", {
        params: { id },
      });
      console.log(data);
      if (data.success) {
        setaddress(data.address);
        setwalletAmount(data.wallet.wallet);
        setpaymentDetails({
          ...paymentDetails,
          amount: data?.product?.total_price,
        });
        setproduct(data?.product);
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
  useEffect(() => {
    getProducts();
  }, []);
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
              arr: false,
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
                params: { productId: id, product, arr: false },
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
                  localStorage.setItem("cart", result?.data?.cart?.cart_count);
                  dispatch(setUserCart(result?.data?.cart?.cart_count));
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
      window.scroll(0, 0);
      console.log(paymentDetails);
      if (paymentDetails.wallet) {
        toast.error("Insufficient amount in your wallet...");
      }
      if (paymentDetails.cod) {
        const { data } = await AxiosUserInstance.post(
          "/order",
          { product },
          { params: { paymentDetails, productId: id, arr: false } }
        );
        console.log(data);
        if (data.success) {
          toast.success("Order successfully");
          localStorage.setItem("cart", data?.cart?.cart_count);
          dispatch(setUserCart(data?.cart?.cart_count));
          navigate("/order-success", { state: { method: "COD" } });
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
          { params: { paymentDetails, totalAmount: paymentDetails.amount } }
        );
        console.log(data);
        if (data.success) {
          handleOpenRazorpay(data.data);
        }
      }
    } catch (error) {}
  };
  const paymentMethod = (method) => {
    console.log(method);
    if (method === "COD") {
      setpaymentDetails({
        ...paymentDetails,
        cod: true,
        online: false,
        wallet: false,
      });
    } else if (method === "WALLET") {
      setpaymentDetails({
        ...paymentDetails,
        cod: false,
        online: false,
        wallet: true,
      });
    } else {
      setpaymentDetails({
        ...paymentDetails,
        cod: false,
        online: true,
        wallet: false,
      });
    }
  };
  const handleCoupon = async () => {
    try {
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
        setdiscountAmount(parseInt(data.discount));
      } else if (data.invalidCoupon) {
      } else if (data.tokenExp || data.noToken) {
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <NavBar />
      <div>
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
        <div className="grid sm:px-10  lg:grid-cols-2 lg:px-20 xl:px-32">
          <div className="px-4  pt-8">
            <p className="text-xl font-medium">Order Summary</p>
            <p className="text-gray-400">
              Check your items. And select a suitable shipping method.
            </p>
            <div className="mt-8  space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
              <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                <img
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src={`${BaseUrl}/images/${product?.image}`}
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">{product?.product_name}</span>
                  <span className="float-right text-gray-400">
                    {product?.category}
                  </span>
                  <div className="flex gap-4">
                    <p className="mt-auto text-sm font-bold">
                      Price : {product?.total_price}
                    </p>
                    <p className="mt-auto text-sm font-bold">
                      Quantity : {product?.quantity}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-8 text-lg font-medium">Payment Method</p>
            <form className="mt-5 grid gap-6">
              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_3"
                  onChange={() => paymentMethod("WALLET")}
                  type="radio"
                  checked={paymentDetails.wallet}
                  name=""
                />
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
                <label
                  className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                  htmlFor="radio_3"
                >
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">WALLET</span>
                    <span className="px-4">{walletAmount} Rupees</span>
                    <p className="text-slate-500 text-sm leading-6">
                      Delivery: 2-4 Days
                    </p>
                  </div>
                </label>
              </div>
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
                    <span className="mt-2 font-semibold">Cash on delivery</span>
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
                    <span className="mt-2 font-semibold">Online payment</span>
                    <p className="text-slate-500 text-sm leading-6">
                      Delivery: 2-4 Days
                    </p>
                  </div>
                </label>
              </div>
            </form>
          </div>
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium">Payment Details</p>
            <p className="text-gray-400">
              Complete your order by providing your payment details.
            </p>
            <p className="text-xl mt-4 font-medium">Select payment address</p>
            {address ? (
              <>
                <div className="w-full border-gray-300 border-2 my-3 rounded  flex">
                  <div className="w-[70%] font-bold p-4">
                    First Name : {address.first_name} , Last Name :{" "}
                    {address.last_name} , Email : {address.email} , Phone Number
                    : {address.phone_number} , Place : {address.place}......
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
              <div className="mt-2 pt-2 items-center flex gap-4  border-t">
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
              <div className="mt-3 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Subtotal</p>
                  <p className="font-semibold text-gray-900">
                    {product?.total_price}
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
                  <p className="text-sm font-medium text-gray-900">Shipping</p>
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
    </div>
  );
};

export default Checkout;
