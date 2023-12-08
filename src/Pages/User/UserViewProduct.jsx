import React, { useEffect, useState } from "react";
import NavBar from "../../Components/User/NavBar";
import { Card } from "flowbite-react";
import AxiosUserInstance from "./AxiosUserInstance";
import { useNavigate, useParams } from "react-router-dom";
import { BaseUrl } from "../../Constants";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserCart } from "../../Toolkit/UserSlice";
const UserViewProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [productData, setproductData] = useState({});
  useEffect(() => {
    getProductData();
  }, []);
  const getProductData = async () => {
    try {
      setloading(true);
      const { data } = await AxiosUserInstance.get("/get-single-product-data", {
        params: {
          productId: id,
        },
      });
      console.log(data);
      setloading(false);
      if (data.success) {
        setproductData(data.productData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addToCart = async (id) => {
    try {
      const { data } = await AxiosUserInstance.post(
        "/add-to-cart",
        {},
        { params: { id } }
      );
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("cart", data.cart_count);
        dispatch(setUserCart(data.cart_count));
      } else {
        toast.error("Unauthorized user,Please Login");
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
  const handleAddtoCart = (id, stock) => {
    if (stock === 0) {
      toast.error("Not stock");
    } else {
      addToCart(id);
    }
  };
  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
      <NavBar />
      {loading === true ? (
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
      ) : (
        <>
          <div className="">
            <div className="md:flex md:flex-row flex flex-col md:gap-16 gap-5 mt-5 items-center md:items-start justify-center">
              <Card
                className="w-80 md:w-[25%] items-center"
                // imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
                // imgSrc={`${BaseUrl}/images/${productData.image}`}
              >
                <img
                  className="w-80 h-40 md:h-60"
                  src={`${BaseUrl}/images/${productData.image}`}
                  alt=""
                />
                <a href="#">
                  <h5 className="text-xl uppercase font-semibold tracking-tight text-gray-900 dark:text-white">
                    {productData?.product_name}
                  </h5>
                </a>
                <div className="md:mb-5 mb-0 md:mt-2.5 mt-0 flex  items-center">
                  <svg
                    className="h-5 w-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    className="h-5 w-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    className="h-5 w-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    className="h-5 w-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    className="h-5 w-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                    5.0
                  </span>
                  <span className="bg-blue-800 py-2 cursor-pointer px-4 rounded ml-auto">
                    {productData.stock > 0 ? "In Stock" : "Out of stock"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {productData.price}
                  </span>
                  <button
                    onClick={() =>
                      handleAddtoCart(productData._id, productData.stock)
                    }
                    className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                  >
                    Add to cart
                  </button>
                </div>
              </Card>
              <Card className="w-80 md:w-[25%] h-full md:h-full">
                <h5 className="mb-2 text-md uppercase font-bold text-gray-900 dark:text-white">
                  Name :{" "}
                  <span className="md:text-md text-sm uppercase">
                    {" "}
                    {productData.product_name}
                  </span>
                </h5>
                <h5 className="mb-2 md:text-md text-sm uppercase font-bold text-gray-900 dark:text-white">
                  Brand :{" "}
                  <span className="text-md uppercase">
                    {" "}
                    {productData.sub_category}
                  </span>
                </h5>
                <h5 className="mb-2 text-md uppercase font-bold text-gray-900 dark:text-white">
                  Category :{" "}
                  <span className="text-md uppercase">
                    {" "}
                    {productData.category}
                  </span>
                </h5>
                <h5 className="mb-2 text-sm uppercase font-bold text-gray-900 dark:text-white">
                  Stock :{" "}
                  <span className="text-md uppercase">
                    {" "}
                    {productData.stock} pieces available
                  </span>
                </h5>
                <p className="mb-2 text-base text-gray-500 dark:text-gray-400 sm:text-lg">
                  Description : {productData.description}
                </p>
                <div className="items-center justify-center space-y-4 sm:flex sm:space-x-4 sm:space-y-0">
                  <a
                    href="#"
                    className="inline-flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-2.5 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 sm:w-auto"
                  >
                    <div className="text-left">
                      <div className="-mt-1 font-sans px-4 py-2 text-sm font-semibold">
                        Add to wishlist
                      </div>
                    </div>
                  </a>
                </div>
              </Card>
            </div>
            {/* <div className="mt-10 text-center mb-10 text-4xl uppercase font-bold">
          Reviews
        </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default UserViewProduct;
