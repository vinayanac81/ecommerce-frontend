import React, { useEffect, useState } from "react";
import LeftLayout from "../../Components/Admin/LeftLayout";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance, { BaseUrl } from "../../Constants";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import toast from "react-hot-toast";
import Header from "../../Components/Admin/Header";
const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useState([]);
  const [showingList, setshowingList] = useState({
    initial: "",
    final: "",
  });
  const [limit, setlimit] = useState(5);
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(true);
  const [totalpage, settotalpage] = useState([]);
  const [productsCount, setproductsCount] = useState("");
  const [openModal, setopenModal] = useState(false);
  const [productId, setproductId] = useState("");
  const [productStatus, setproductStatus] = useState("");
  let pages = [];
  const getAllProducts = async () => {
    try {
      setloading(true);
      window.scroll(0, 0);
      const { data } = await AxiosInstance.get("/admin/all-products", {
        params: { limit, page },
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
        const total = data.totalPages;
        if (page === 1) {
          setshowingList({ ...showingList, initial: 1, final: limit });
        } else {
          let ini = (page - 1) * limit;
          let fin = ini + limit;
          if (fin >= data?.totalProducts) {
            fin = data?.totalProducts;
          }
          setshowingList({
            ...showingList,
            initial: ini + 1,
            final: fin,
          });
        }

        setproductsCount(data?.totalProducts);
        settotalpage(total);
        setproducts(data?.products);
      }
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
  useEffect(() => {
    getAllProducts();
  }, [page]);
  for (let i = 1; i <= totalpage; i++) {
    pages.push(i);
  }
  const handleNavigate = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };
  const handleDisable = (id, status) => {
    setproductId(id);
    setproductStatus(status);
    setopenModal(true);
  };
  const handleViewProduct = (id) => {
    navigate(`/admin/view-product/${id}`);
  };
  const disableProduct = async () => {
    try {
      console.log(productId);
      const { data } = await AxiosInstance.post("/admin/disableProduct", {
        productId,
        productStatus,
      });
      setopenModal(false);
      if (data.success) {
        toast.success(data.message);
        getAllProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div x-data="setup()" class="{ 'dark': isDark }">
        <div className=""></div>

        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
          <Header />
          <LeftLayout active="products" />
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
          <div className="h-full flex flex-col ml-14 mt-14 mb-10 md:ml-64">
            <div className="mt-10 mb-2 flex justify-end w-full px-10">
              <Link to={"/admin/add-product"}>
                {" "}
                <button className="bg-green-500  hover:bg-green-600 items-center flex gap-2 py-2 px-4 rounded">
                  <span>Add Product</span>{" "}
                  <span>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-4 h-4 "
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                  </span>
                </button>
              </Link>
            </div>
            <div id="modalForDeletePopup">
              <Modal
                show={openModal}
                size="md"
                onClose={() => setopenModal(false)}
                popup
              >
                <Modal.Header />
                <Modal.Body>
                  <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure to {productStatus} the product?
                    </h3>
                    <div className="flex  justify-center gap-4">
                      <Button color="failure" onClick={disableProduct}>
                        {"Yes, I'm sure"}
                      </Button>
                      <Button color="gray" onClick={() => setopenModal(false)}>
                        No, cancel
                      </Button>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
            <div className="mt-4 mx-4">
              <div className="w-full overflow-hidden rounded-lg shadow-xs">
                <div className="w-full overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                        <th className="px-4 py-3">Product</th>
                        <th className="px-4 py-3">Image</th>
                        <th className="px-4 py-3">Description</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Barand Name</th>
                        <th className="px-4 py-3">Price</th>
                        <th className="px-4 py-3">Stock</th>
                        <th className="px-4 text-center py-3">Option</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                      {products.map((product, id) => {
                        return (
                          <>
                            <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                              <td className="px-4 py-3">
                                <div className="flex items-center text-sm">
                                  <div>
                                    <p className="font-semibold">
                                      {product.product_name}
                                    </p>
                                    {/* <p className="text-xs text-gray-600 dark:text-gray-400">10x Developer</p> */}
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <div
                                  className="relative hidde w-20 h-20
                                 mr-3 rounded-full md:block"
                                >
                                  <img
                                    className="object-contain w-full h-full rounded-full"
                                    src={`${BaseUrl}/images/${product?.image}`}
                                    alt
                                    loading="lazy"
                                  />
                                  <div
                                    className="absolute inset-0 rounded-full shadow-inner"
                                    aria-hidden="true"
                                  />
                                </div>
                              </td>
                              <td className="px-4 py-3 text-xs">
                                <span className="px-2 py-1 font-semibold leading-tight ">
                                  {" "}
                                  {product?.description}{" "}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {product?.category}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {product?.sub_category}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {product?.price}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {product?.stock}
                              </td>
                              <td className="px-4 py-3 flex h-28 flex-col md:flex-row justify-center items-center   md:flex gap-2 text-sm">
                                <button
                                  onClick={() => handleNavigate(product?._id)}
                                  className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-800"
                                >
                                  Edit
                                </button>
                                {product?.disable ? (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleDisable(product?._id, "enable")
                                      }
                                      className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-800"
                                    >
                                      Enable
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleDisable(product?._id, "disable")
                                      }
                                      className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-800"
                                    >
                                      Disable
                                    </button>
                                  </>
                                )}

                                <button
                                  onClick={() =>
                                    handleViewProduct(product?._id)
                                  }
                                  className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-800"
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
                    Showing {showingList?.initial} - {showingList?.final} of{" "}
                    {productsCount}
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

                        {pages.map((num, id) => {
                          return (
                            <li>
                              {" "}
                              <button
                                onClick={() => setpage(num)}
                                className={`px-3 py-1 rounded-md ${
                                  num === page && "bg-blue-500"
                                } focus:outline-none focus:shadow-outline-purple`}
                              >
                                {num}
                              </button>
                            </li>
                          );
                        })}

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

export default AdminProducts;
