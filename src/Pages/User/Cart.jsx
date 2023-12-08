import React, { useEffect, useState } from "react";
import NavBar from "../../Components/User/NavBar";
import AxiosUserInstance from "./AxiosUserInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../../Constants";

const Cart = () => {
  const navigate = useNavigate();
  const [cartProducts, setcartProducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [cartCount, setcartCount] = useState("");
  const [isCartEmpty, setisCartEmpty] = useState("");
  const getAllCartProducts = async (req, res) => {
    try {
      setloading(true);
      const { data } = await AxiosUserInstance.get("/get-cart-products");
      console.log(data);
      setloading(false);
      if (data.success) {
        if (data.cart === null) {
          localStorage.setItem("cart", 0);
          setcartCount(0);
        } else {
          setcartProducts(data.cart.cart_products);
          localStorage.setItem("cart", data?.cart?.cart_count);
          setcartCount(data?.cart.cart_count);
        }
      } else if (data.tokenExp || data.noToken) {
        toast.error("Please login");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("cart");
      }
    } catch (error) {
      console.log(error);
      if (
        error?.response?.data?.message === "unauthorized user" ||
        error?.response?.data?.message === "Unauthorized"
      ) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("cart");
        navigate("/");
        toast.error("Please login");
      }
    }
  };
  useEffect(() => {
    getAllCartProducts();
  }, []);
  const decrementCount = async (id, price, count) => {
    try {
      const { data } = await AxiosUserInstance.post(
        "/decrement-quantity",
        {},
        { params: { id, price, count } }
      );
      console.log(data);
      if (data.success) {
        let check = data?.cart?.cart_products;
        let pro = check.find((item) => item?.quantity === 0);
        if (pro?.quantity === 0) {
          console.log("OK");
          const { data } = await AxiosUserInstance.post(
            "/remove-from-cart",
            {},
            { params: { id: pro.product_id } }
          );
          if (data.success) {
            if (data?.cart?.cart_count === 0) {
              setcartCount(0);
            }
            toast.success(data.message);
            localStorage.setItem("cart", data?.cart?.cart_count);
            window.location.reload();
            // setcartProducts(data?.cart?.cart_products);
          }
        }
        setcartProducts(data?.cart.cart_products);
      } else if (data.tokenExp || data.noToken) {
        toast.error("Please login");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("cart");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const incrementCount = async (id, price, count) => {
    try {
      const { data } = await AxiosUserInstance.post(
        "/increment-quantity",
        {},
        { params: { id, price, count } }
      );
      console.log(data);
      if (data.success) {
        setcartProducts(data?.cart.cart_products);
      } else if (data.tokenExp || data.noToken) {
        toast.error("Please login");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("cart");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    const { data } = await AxiosUserInstance.post(
      "/remove-from-cart",
      {},
      { params: { id } }
    );
    if (data.success) {
      if (data?.cart?.cart_count === 0) {
        setcartCount(0);
      }
      setcartProducts(data?.cart.cart_products);
      localStorage.setItem("cart", data?.cart?.cart_count);
      // window.location.reload();
      toast.success(data.message);
    } else if (data.tokenExp || data.noToken) {
      toast.error("Please login");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("cart");
    }
  };
  const buyNow = (id) => {
    navigate(`/checkout/${id}`);
  };
  const totalPrice = cartProducts.reduce(
    (acc, curr) => acc + curr.total_price,
    0
  );
  const handleClick = () => {
    navigate("/checkout");
  };
  return (
    <div>
      <NavBar />
      <div className="">
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
        <section className="h-scree bg-gray-100 py-5 sm:py-7 lg:py-4">
          <div className="mx-auto px-4 sm:px-36 lg:px-20">
            <div className="flex items-center justify-center">
              <h1 className="text-2xl font-semibold text-gray-900">
                Your Cart
              </h1>
            </div>
            {cartCount === 0 ? (
              <>
                <div className="text-center">Cart is empty</div>
              </>
            ) : (
              <>
                <div className="mx-auto mt-8 max-w-md md:mt-4">
                  <div className="rounded-3xl bg-white shadow-lg">
                    <div className="px-4 py-6 sm:px-8 sm:py-10">
                      <div className="flow-root">
                        <ul className="-my-8">
                          {cartCount > 0 ? (
                            <>
                              {cartProducts.map((item) => {
                                return (
                                  <>
                                    <li className="flex flex-col space-y-3 py-7 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                                      <div className="shrink-0 relative">
                                        <span className="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">
                                          {item?.quantity}
                                        </span>
                                        <img
                                          className="h-24 w-24 max-w-full rounded-lg object-cover"
                                          src={`${BaseUrl}/images/${item?.image}`}
                                          alt
                                        />
                                      </div>
                                      <div className="relative flex flex-1 flex-col justify-between">
                                        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                          <div className="pr-8 sm:pr-5">
                                            <p className="text-base font-semibold text-gray-900">
                                              {item?.product_name}
                                            </p>
                                            <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                                              {item?.sub_category}
                                            </p>
                                            <p className="mx-0 mt-1  font-semibold mb-0 text-gray-900 text-sm ">
                                              {item?.total_price}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="absolute gap-2 top-0 right-0 flex flex-col sm:bottom-0 sm:top-">
                                          <div className="flex justify-center items-center bg-gray-70 rounded  gap-1 text-white text-2xl">
                                            <button
                                              onClick={() =>
                                                decrementCount(
                                                  item?.product_id,
                                                  item?.price,
                                                  item?.quantity
                                                )
                                              }
                                              className="bg-red-600 flex items-center justify-center rounded h-6 w-6"
                                            >
                                              -
                                            </button>{" "}
                                            <span className="text-gray-900 text-lg font-bold">
                                              {" "}
                                              {item?.quantity}
                                            </span>
                                            <button
                                              onClick={() =>
                                                incrementCount(
                                                  item?.product_id,
                                                  item?.price,
                                                  item?.quantity
                                                )
                                              }
                                              className="bg-blue-600 flex items-center justify-center rounded h-6 w-6"
                                            >
                                              +
                                            </button>
                                          </div>
                                          <div className="flex gap-4">
                                            <button
                                              type="button"
                                              onClick={() =>
                                                buyNow(item?.product_id)
                                              }
                                              className="flex  rounded bg-slate-700  p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                                            >
                                              Buy now
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() =>
                                                handleDelete(item?.product_id)
                                              }
                                              className="flex bg-slate-700 justify-center rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                                            >
                                              Remove
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  </>
                                );
                              })}
                            </>
                          ) : (
                            <></>
                          )}
                        </ul>
                      </div>
                   
                      <div className="mt-6 space-y-3 border-t border-b py-8">
                        <div className="flex items-center justify-between">
                          <p className="text-gray-400">Subtotal</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {totalPrice}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-400">Shipping</p>
                          <p className="text-lg font-semibold text-gray-900">
                            Free
                          </p>
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          Total
                        </p>
                        <p className="text-2xl font-semibold text-gray-900">
                          <span className="text-xs font-normal text-gray-400">
                            INR
                          </span>{" "}
                          {totalPrice}
                        </p>
                      </div>
                      <div className="mt-6 text-center">
                        <button
                          type="button"
                          onClick={handleClick}
                          className="group inline-flex w-full items-center justify-center rounded-md bg-orange-500 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                        >
                          Place Order
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Cart;
