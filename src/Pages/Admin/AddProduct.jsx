import React, { useEffect, useState } from "react";
import LeftLayout from "../../Components/Admin/LeftLayout";
import AxiosInstance from "../../Constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Admin/Header";
const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [productData, setproductData] = useState({
    productName: "",
    price: "",
    stock: "",
    description: "",
    category: "",
    subCategory: "",
  });
  const [categories, setcategories] = useState([]);
  const [brands, setbrands] = useState([]);
  const [imageUploaded, setimageUploaded] = useState(false);
  const [image, setimage] = useState("");
  useEffect(() => {
    getCategoryAndBrand();
  }, []);
  const getCategoryAndBrand = async () => {
    try {
      setloading(true);
      const { data } = await AxiosInstance.get("/admin/get-category-and-brand");
      console.log(data);
      setloading(false);
      if (data.success) {
        setcategories(data.category);
        setbrands(data.brand);
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
  const handleClick = async (e) => {
    try {
      e.preventDefault();
      let fileData = new FormData();
      fileData.append("image", image);
      const { data } = await AxiosInstance.post(
        "/admin/add-product",
        fileData,
        {
          params: { productData, image },
        },

        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        navigate("/admin/products");
      } else if (data.noToken || data.tokenExp) {
        localStorage.removeItem("admin");
        localStorage.removeItem("admin-token");
        toast.error(data.message);
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleImage = (e) => {
    setimage(e.target.files[0]);
    setimageUploaded(true);
  };
  return (
    <div>
      <div x-data="setup()" class="{ 'dark': isDark }">
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
          <div className="h-full  ml-14 mt-14 mb-10 md:ml-64">
            <div className="flex md:max-w-lg  mx-auto mt-10 max-w-sm  flex-col">
              <h2 className="text-2xl font-bold flex justify-center">
                Add Product
              </h2>
              <div className="mt-4 flex flex-col gap-3 px-4">
                <label htmlFor="productName">Name</label>
                <input
                  name="productName"
                  className="rounded bg-gray-600 py-2 px-2 "
                  type="text"
                  onChange={(e) =>
                    setproductData({
                      ...productData,
                      productName: e.target.value,
                    })
                  }
                  value={setproductData.productName}
                />
              </div>
              <div className="mt-4 flex flex-col gap-3 px-4">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  className="rounded bg-gray-600 py-2 px-2 "
                  type="text"
                  onChange={(e) =>
                    setproductData({
                      ...productData,
                      description: e.target.value,
                    })
                  }
                  value={setproductData.description}
                />
              </div>
              <div className="mt-4 flex flex-col gap-3 px-4">
                <label htmlFor="category">Category</label>
                <select
                  name="category"
                  className="rounded bg-gray-600 py-2 px-2 "
                  type="text"
                  onChange={(e) =>
                    setproductData({
                      ...productData,
                      category: e.target.value.toLowerCase(),
                    })
                  }
                  value={setproductData.category}
                >
                  <option value="select">Select</option>
                  {categories.map((category) => {
                    return (
                      <>
                        {" "}
                        <option value={category.category_name}>
                          {category.category_name}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
              <div className="mt-4 flex flex-col gap-3 px-4">
                <label htmlFor="subCategory">Sub Category</label>
                <select
                  name="subCategory"
                  className="rounded bg-gray-600 py-2 px-2 "
                  type="text"
                  onChange={(e) =>
                    setproductData({
                      ...productData,
                      subCategory: e.target.value.toLowerCase(),
                    })
                  }
                  value={setproductData.subCategory}
                >
                  <option value="select">Select</option>
                  {brands.map((brand) => {
                    return (
                      <>
                        <option value={brand.brand_name}>
                          {brand.brand_name}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
              <div className="mt-4 flex flex-col gap-3 px-4">
                <label htmlFor="price">Price</label>
                <input
                  name="price"
                  className="rounded bg-gray-600 py-2 px-2 "
                  type="text"
                  onChange={(e) =>
                    setproductData({ ...productData, price: e.target.value })
                  }
                  value={setproductData.price}
                />
              </div>
              <div className="mt-4 flex flex-col gap-3 px-4">
                <label htmlFor="stock">Stock</label>
                <input
                  name="stock"
                  onChange={(e) =>
                    setproductData({ ...productData, stock: e.target.value })
                  }
                  value={setproductData.stock}
                  className="rounded bg-gray-600 py-2 px-2 "
                  type="text"
                />
              </div>
              {imageUploaded ? (
                <>
                  <div className="mt-4 flex flex-col gap-3 px-4">
                    <img
                      className="w-20"
                      src={URL.createObjectURL(image)}
                      alt=""
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
              <div className="mt-4 flex flex-col gap-3 px-4">
                <label htmlFor="image">Image</label>
                <input
                  name="image"
                  className="rounded bg-gray-600 py-2 px-2 "
                  type="file"
                  onChange={handleImage}
                />
              </div>
              <div className="flex px-4 mt-2 justify-center">
                <button
                  onClick={handleClick}
                  className="py-2 w-full px-4 bg-green-500 rounded mt-3 mb-3 hover:bg-green-600"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
