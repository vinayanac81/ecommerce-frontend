import React, { useEffect, useState } from "react";
import AdminNav from "../../Components/Admin/AdminNav";
import LeftLayout from "../../Components/Admin/LeftLayout";
import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button, Card, Label, TextInput } from "flowbite-react";
import AxiosInstance from "../../Constants";
import toast from "react-hot-toast";
import Header from "../../Components/Admin/Header";
const Brand = () => {
    const [brand, setbrand] = useState("")
    const [brandData, setbrandData] = useState([]);
    const [loading, setloading] = useState(true)
  const [editPopup, seteditPopup] = useState(false);
  const [deletePopup, setdeletePopup] = useState(false);
  const [brandId, setbrandId] = useState("");
  const getBrand = async () => {
    try {
      setloading(true)
      const { data } = await AxiosInstance.get("/admin/get-brand");
      console.log(data);
      setloading(false)
      if (data.success) {
        setbrandData(data.brand);
      } else if (data.noToken || data.tokenExp) {
        toast.error(data.message);
        localStorage.removeItem("admin");
        localStorage.removeItem("admin-token");
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBrand();
  }, []);
  const addBrand = async (e) => {
    try {
      e.preventDefault();
      const { data } = await AxiosInstance.post(
        "/admin/add-brand",
        {},
        { params: { brand} }
      );
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        window.location.reload();
      } else if (data.noToken || data.tokenExp) {
        toast.error(data.message);
        localStorage.removeItem("admin");
        localStorage.removeItem("admin-token");
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (id) => {
    try {
      const { data } = await AxiosInstance.get("/admin/get-single-brand", {
        params: { id },
      });
      if (data.success) {
        console.log(data);
        setbrand(data.brand.brand_name.toLowerCase());
        setbrandId(data.brand._id);
        seteditPopup(true);
      } else if (data.noToken || data.tokenExp) {
        toast.error(data.message);
        localStorage.removeItem("admin");
        localStorage.removeItem("admin-token");
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete=(id)=>{
    setbrandId(id)
    setdeletePopup(true)
  }
  const modifyBrand = async (e) => {
    e.preventDefault()
    const { data } = await AxiosInstance.post(
      "/admin/edit-brand",
      {},
      { params: { brandId,brand } }
    );
    if (data.success) {
      toast.success(data.message);
      window.location.reload();
    } else if (data.noToken || data.tokenExp) {
      toast.error(data.message);
      localStorage.removeItem("admin");
      localStorage.removeItem("admin-token");
      navigate("/admin");
    }
  };
  const confirmDelete=async(req,res)=>{
    try {
      const {data}=await AxiosInstance.post("/admin/delete-brand",{},{params:{id:brandId}})
      if (data.success) {
        toast.success(data.message);
        window.location.reload();
      } else if (data.noToken || data.tokenExp) {
        toast.error(data.message);
        localStorage.removeItem("admin");
        localStorage.removeItem("admin-token");
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
    <div x-data="setup()" class="{ 'dark': isDark }">
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
       <Header/>
        <LeftLayout active="brands" />
        <div className="h-full flex flex-col ml-14 mt-14 mb-10 md:ml-64">
          <div className="p-8">
            <Card className="max-w-sm">
              <form className="flex flex-col gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="name" value="BRAND NAME" />
                  </div>
                  <TextInput
                    onChange={(e) => setbrand(e.target.value)}
                    id="name"
                    type="text"
                    required
                  />
                </div>
                <Button onClick={addBrand} color="green" type="submit">
                  ADD
                </Button>
              </form>
            </Card>
          </div>
          <div className="p-8">
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
              <div className="w-full overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                      <th className="px-4 py-3">Sl No</th>
                      <th className="px-4 py-3">Brand Name</th>
                      <th className="px-4 text-center py-3">Option</th>
                    </tr>
                  </thead>
                  <div className="">
                    <Modal
                      show={editPopup}
                      size="md"
                      onClose={() => seteditPopup(false)}
                      popup
                    >
                      <Modal.Header />
                      <Modal.Body>
                        <form className="flex flex-col gap-4">
                          <div>
                            <div className="mb-2 block">
                              <Label
                                htmlFor="name"
                                value="EDIT BRAND NAME"
                              />
                            </div>
                            <TextInput
                              onChange={(e) => setbrand(e.target.value)}
                              id="name"
                              type="text"
                              value={brand}
                              required
                            />
                          </div>
                          <Button
                            onClick={modifyBrand}
                            color="green"
                            type="submit"
                          >
                            SAVE
                          </Button>
                        </form>
                      </Modal.Body>
                    </Modal>
                  </div>
                  <div className="">
                  <Modal show={deletePopup} size="md" onClose={() => setdeletePopup(false)} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this brand?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={confirmDelete}>
              {"Yes, I'm sure"}
            </Button>
            <Button color="gray" onClick={() => setdeletePopup(false)}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
                  </div>
                  <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                    {brandData.map((brand, id) => {
                      return (
                        <>
                          <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                            <td className="px-4  py-3">
                              <div className="flex items-center text-sm">
                                <div>
                                  <p className="font-semibold">{id + 1}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {brand?.brand_name}
                            </td>
                            <td className="px-4 py-3 justify-center flex gap-4 text-xs">
                              <Button
                                onClick={() => handleEdit(brand?._id)}
                                color="blue"
                                type="submit"
                              >
                                Edit
                              </Button>
                              <Button
                                onClick={() => handleDelete(brand?._id)}
                                color="red"
                                type="submit"
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Brand;
