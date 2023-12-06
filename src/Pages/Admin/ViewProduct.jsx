import React, { useEffect, useState } from "react";
import LeftLayout from "../../Components/Admin/LeftLayout";
import { useNavigate, useParams } from "react-router-dom";
import AxiosInstance, { BaseUrl } from "../../Constants";
import { Card } from "flowbite-react";
import Header from "../../Components/Admin/Header";
const ViewProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setproduct] = useState({});
  const [loading, setloading] = useState(false);
  const getProduct = async () => {
    try {
      setloading(true);
      const { data } = await AxiosInstance.get("/admin/get-product", {
        params: { id },
      });
      console.log(data);
      setloading(false);
      if (data.tokenExp || data.noToken) {
        toast.error(data.msg);
        localStorage.removeItem("admin");
        localStorage.removeItem("admin-token");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else if (data.success) {
        setproduct(data?.product);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  const handleNavigate = () => {
    navigate(`/admin/edit-product/${id}`);
  };
  return (
    <div>
      <div x-data="setup()" class="{ 'dark': isDark }">
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
          <Header />
          <LeftLayout active="products" />
          <div className="h-full flex flex-col ml-14 mt-14 mb-10 md:ml-64">
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
            <div className="">
              <div className="flex gap-16 mt-5 items-cente justify-center">
                <Card
                  className="min-w-md"
                  
                  // imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
                  // imgSrc={`${BaseUrl}/images/${product.image}`}
                >
                  <img className="w-80 h-96" src={`${BaseUrl}/images/${product.image}`} alt="" />
                  <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {product?.product_name}
                    </h5>
                  </a>
                  <div className="mb-5 mt-2.5 flex  items-center">
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
                      {product.stock > 0 ? "In Stock" : "Out of stock"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {product.price}
                    </span>
                    <button className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                      Disable
                    </button>
                  </div>
                </Card>
                <Card className="w-80 min:h-96 ">
                  <h5 className="mb-2 text-md uppercase font-bold text-gray-900 dark:text-white">
                    Name :{" "}
                    <span className="text-md uppercase">
                      {" "}
                      {product.product_name}
                    </span>
                  </h5>
                  <h5 className="mb-2 text-md uppercase font-bold text-gray-900 dark:text-white">
                    Brand :{" "}
                    <span className="text-md uppercase">
                      {" "}
                      {product.sub_category}
                    </span>
                  </h5>
                  <h5 className="mb-2 text-md uppercase font-bold text-gray-900 dark:text-white">
                    Category :{" "}
                    <span className="text-md uppercase">
                      {" "}
                      {product.category}
                    </span>
                  </h5>
                  <h5 className="mb-2 text-sm uppercase font-bold text-gray-900 dark:text-white">
                    Stock :{" "}
                    <span className="text-md uppercase">
                      {" "}
                      {product.stock} pieces available
                    </span>
                  </h5>
                  <p className="mb-5 text-base text-gray-500 dark:text-gray-400 sm:text-lg">
                    Description : {product.description}
                  </p>
                  <div className="items-center justify-center space-y-4 sm:flex sm:space-x-4 sm:space-y-0">
                    <a
                      onClick={handleNavigate}
                      className="inline-flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-2.5 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 sm:w-auto"
                    >
                      <div className="text-left">
                        <div className="-mt-1 font-sans px-4 py-2 text-sm font-semibold">
                          Edit
                        </div>
                      </div>
                    </a>
                  </div>
                </Card>
              </div>
              <div className="mt-10 text-center mb-10 text-4xl uppercase font-bold">
                Reviews
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
