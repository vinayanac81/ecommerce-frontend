import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { BaseUrl } from "../../Constants";
import AxiosUserInstance from "../../Pages/User/AxiosUserInstance";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserCart } from "../../Toolkit/UserSlice";
const Card = ({ products }) => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
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
    <div>
      <div className="max-w-md cursor-pointer w-[20rem] h-[22rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full h-[13rem]">
          {" "}
          <a href="">
            <img
              className="rounded-t-lg h-full  w-full"
              src={`${BaseUrl}/images/${products?.image}`}
              alt=""
            />
          </a>
        </div>
        <div className="px-5 py-1">
          <a href="">
            <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {products?.product_name}
            </h5>
          </a>
          <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
            {/* {court?.type} */}
          </p>
          <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
            Price : {products?.price} , Stock: {products?.stock} pieces
          </p>
          {/* <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
            {court?.address}
          </p> */}
          <div className="mt-3  flex justify-between">
            <button
              type="button"
              onClick={() => handleAddtoCart(products?._id, products?.stock)}
              className="text-white flex gap-1 bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Add to cart
              {/* <span className="text-xl"><MdDelete /></span> */}
            </button>
            <Link to={`/product/view/${products._id}`}>
              <button
                type="button"
                className="text-white flex gap-1 bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                View details
                {/* <span className="text-xl"><FaArrowRight /></span> */}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
