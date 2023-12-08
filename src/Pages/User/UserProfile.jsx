import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../Components/User/NavBar";
import { MdOutlineCategory } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { GrGallery } from "react-icons/gr";
import { MdOutlineAssignment } from "react-icons/md";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";

import { Tabs } from "flowbite-react";
import { FaAddressCard } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { Banner, Modal, FileInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { FaWallet } from "react-icons/fa";
import AxiosUserInstance from "./AxiosUserInstance";
import toast from "react-hot-toast";
import { BaseUrl, ReferralBaseUrl } from "../../Constants";
import { useNavigate } from "react-router-dom";
import copy from "copy-to-clipboard";
import { GrLogout } from "react-icons/gr";
import { setUserCart, setUserDetails } from "../../Toolkit/UserSlice";
const UserProfile = () => {
  const navigate = useNavigate();
  const textRef = useRef();
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.user);
  const [referralCode, setreferralCode] = useState("");
  const [checkActive, setcheckActive] = useState({
    account: true,
    address: false,
    wallet: false,
    password: false,
    referral: false,
  });
  const [userProfile, setuserProfile] = useState({
    firstname: userDetails?.first_name,
    lastname: userDetails?.last_name,
    email: userDetails?.email,
    number: userDetails?.number,
  });
  const [referralCount, setreferralCount] = useState("");
  const [openModal, setopenModal] = useState(false);
  const [image, setimage] = useState("");
  const [ifAddress, setifAddress] = useState(false);
  const [address, setaddress] = useState({});
  const [password, setpassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [referrals, setreferrals] = useState([]);
  const handleImage = async (e) => {
    try {
      setimage(e.target.files[0]);
      let fileData = new FormData();
      fileData.append("profile", e.target.files[0]);
      const { data } = await AxiosUserInstance.post(
        "/update-profile-image",
        fileData,
        {
          params: { userId: userDetails?._id },
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.reload();
      } else if (data.noToken || data.tokenExp) {
        localStorage.clear();
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAddress = async () => {
    try {
      const { data } = await AxiosUserInstance.get("/get-address");
      console.log(data);
      if (data.success) {
        setifAddress(true);
        setaddress(data.address);
        setcheckActive({
          ...checkActive,
          account: false,
          referral: false,
          password: false,
          wallet: false,
          address: true,
        });
      } else if (data.noAddress) {
        setifAddress(false);
        setcheckActive({
          ...checkActive,
          account: false,
          wallet: false,
          password: false,
          address: true,
          referral: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const createAddress = () => {
    navigate("/add-address");
  };
  const viewAddress = (addressId) => {
    navigate(`/view-address/${addressId}`);
  };
  const editAddress = (addressId) => {
    navigate(`/edit-address/${addressId}`);
  };
  const deleteAddress = async (addressId) => {
    const { data } = await AxiosUserInstance.post("/delete-address", {
      addressId,
    });
    if (data.success) {
      getAddress();
      toast.success(data.message);
    }
  };
  const copyToClipboard = () => {
    let copyText = textRef.current.value;
    let isCopy = copy(copyText);
    if (isCopy) {
      toast.success("Copied to Clipboard");
    }
  };
  const handlePasswordChange = async (e) => {
    try {
      e.preventDefault();
      if (password.confirmPassword !== password.newPassword) {
        return toast.error("Password doesn't match...");
      }
      const { data } = await AxiosUserInstance.post("/update-password", {
        password,
      });
      if (data.success) {
        setpassword({
          ...password,
          newPassword: "",
          confirmPassword: "",
          oldPassword: "",
        });
        toast.success(data?.message);
      } else if (data.passwordError) {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "unauthorized user") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
        toast.error("Please login");
      }
    }
  };
  const getReferral = async () => {
    try {
      const { data } = await AxiosUserInstance.get("/get-referral-data");
      if (data.success) {
        console.log(data);
        setreferralCount(data?.totalReferrals);
        setreferrals(data?.referralData?.referrals);
        setreferralCode(data?.referralData?.referral_code);
        setcheckActive({
          ...checkActive,
          account: false,
          referral: true,
          password: false,
          wallet: false,
          address: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.setItem("cart", 0);
    dispatch(setUserDetails(""));
    dispatch(setUserCart(0));
    navigate("/");
    toast.success("Logout Successfully");
  };
  return (
    <div className="min:h-screen pb-20 dark:bg-gray-900">
      <NavBar />
      <Modal
        show={openModal}
        size="md"
        onClose={() => setopenModal(false)}
        popup
      >
        <Modal.Header />
        <div className="flex  w-full items-center justify-center">
          <Label
            htmlFor="dropzone-file"
            className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <FileInput
              onChange={handleImage}
              id="dropzone-file"
              className="hidden"
            />
          </Label>
        </div>
      </Modal>
      <div>
        <div className="fixed flex flex-col top-15 left-0 w-14 hover:w-64 md:w-64 bg-blue-900 dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar">
          <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
            <ul className="flex flex-col py-4 space-y-1">
              <li className="px-5 hidden md:block">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
                    Settings
                  </div>
                </div>
              </li>
              <li>
                <a className="relative flex gap- flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
                  <span className="inline-flex justify-center items-center ml-4">
                    <svg
                      className={`w-5 h-5 ${
                        checkActive.account && " text-blue-600"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokelinecap="round"
                        strokelinejoin="round"
                        strokewidth="{2}"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </span>
                  <span
                    className={`ml-2 text-sm tracking-wide truncate ${
                      checkActive.account && " text-blue-600"
                    }`}
                  >
                    Account
                  </span>
                </a>
              </li>
              <li onClick={() => setcheckActive({ password: true })}>
                <a className="relative flex gap- cursor-pointer flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
                  <span className="inline-flex justify-center items-center ml-4">
                    <span
                      className={`w-5 h-5 ${
                        checkActive.password && " text-blue-600"
                      }`}
                    >
                      <RiLockPasswordFill />
                    </span>
                  </span>
                  <span
                    className={`ml-2 text-sm tracking-wide truncate ${
                      checkActive.password && " text-blue-600"
                    }`}
                  >
                    Password
                  </span>
                </a>
              </li>
              <li
                className="cursor-pointer "
                onClick={() => setcheckActive({ wallet: true })}
              >
                <a className="relative flex gap- flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
                  <span className="inline-flex justify-center items-center ml-4">
                    <span
                      className={`w-5 h-5 hover:text-blue-800 ${
                        checkActive.wallet && " text-blue-600"
                      }`}
                    >
                      <FaWallet />
                    </span>
                  </span>
                  <span
                    className={`ml-2 text-sm tracking-wide truncate ${
                      checkActive.wallet && " text-blue-600"
                    }`}
                  >
                    Wallet
                  </span>
                </a>
              </li>
              <li className="cursor-pointer" onClick={getAddress}>
                <a className="relative flex gap- flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
                  <span className="inline-flex justify-center items-center ml-4">
                    <span
                      className={`w-5 h-5 ${
                        checkActive.address && " text-blue-600"
                      }`}
                    >
                      <FaAddressCard />
                    </span>
                  </span>
                  <span
                    className={`ml-2 text-sm tracking-wide truncate ${
                      checkActive.address && " text-blue-600"
                    }`}
                  >
                    Address
                  </span>
                </a>
              </li>
              <li className="cursor-pointer" onClick={getReferral}>
                <a className="relative flex gap- flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
                  <span className="inline-flex justify-center items-center ml-4">
                    <span
                      className={`ml- text-xl tracking-wide truncate ${
                        checkActive.referral && " text-blue-600"
                      }`}
                    >
                      <FaUsers />
                    </span>
                  </span>
                  <span
                    className={`ml-2 text-sm tracking-wide truncate ${
                      checkActive.referral && " text-blue-600"
                    }`}
                  >
                    Referral
                  </span>
                </a>
              </li>
              <li className="cursor-pointer" onClick={handleLogout}>
                <a className="relative flex gap- flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
                  <span className="inline-flex justify-center items-center ml-4">
                    <span className="text-white">
                      <GrLogout />
                    </span>
                  </span>
                  <span
                    className={`ml-2 text-sm tracking-wide truncate ${
                      checkActive.logout && " text-blue-600"
                    }`}
                  >
                    Logout
                  </span>
                </a>
              </li>
            </ul>
            <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">
              Copyright @{new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
      {checkActive.account && (
        <>
          <div className="h-screen mx-auto flex flex-col md:items-start items-center md:flex md:flex-row  ml-14 mt-4 md:mt-20 mb-10 md:ml-64">
            <div className="md:w-[30%] justify-cente fle w-[70%] md:mx-20">
              <Card className="max-w-sm">
                <div className="flex flex-col items-center pb-10">
                  {!userDetails.image ? (
                    <>
                      <div className="h-28 w-28 ">
                        <div className="rounded-full bg-pink-700 text-white flex justify-center items-center text-7xl w-full h-full">
                          {userDetails.first_name.slice(0, 1)}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="">
                        <img
                          className="w-40 h-40 rounded-full"
                          src={`${BaseUrl}/images/${userDetails?.image}`}
                          alt="Rounded avatar"
                        />
                      </div>
                    </>
                  )}

                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {userDetails.first_name}
                  </h5>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {userDetails.email}
                  </span>
                  <div className="mt-4 flex space-x-3 lg:mt-6">
                    <a
                      onClick={() => setopenModal(true)}
                      className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                    >
                      Upload photo
                    </a>
                    <a
                      href="/"
                      className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    >
                      Go Home
                    </a>
                  </div>
                </div>
              </Card>
            </div>
            <div className="mt-5 md:w-[50%]  w-[70%]">
              <div className="md:px-10 flex  text-white">
                <h2 className=" text-lg tracking-wide truncate">
                  Account Settings
                </h2>
              </div>
              <div className="md:pl-10  relative mt-4 md:mb-8  items-center text-sm tracking-wide truncate text-white md:flex md:flex-row gap-5">
                <label className="w-[14%]" htmlFor="">
                  First Name
                </label>
                <input
                  type="text"
                  value={userDetails.first_name}
                  className="rounded border w-full md:w md:ml-l border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-50 outline-none py-2 px-4 "
                  name=""
                  id=""
                />
                <button className="absolute px-4 bg-blue-600 hover:bg-blue-800 z-2 py-2.5 md:py-2.5 right-0 md:top-0 top-5 md:right-0 ">
                  Update
                </button>
              </div>
              <div className="md:pl-10  relative mt-4 md:mb-8 items-center text-sm tracking-wide truncate text-white md:flex md:flex-row gap-5">
                <label className="w-[14%]" htmlFor="">
                  Last Name
                </label>
                <input
                  type="text"
                  value={userDetails.last_name}
                  className="rounded border w-full md:w md:ml-l border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-50 outline-none py-2 px-4 "
                  name=""
                  id=""
                />
                <button className="absolute px-4 bg-blue-600 hover:bg-blue-800 z-2 py-2.5 md:py-2.5 right-0 md:top-0 top-5 md:right-0 ">
                  Update
                </button>
              </div>
              <div className="md:pl-10  relative mt-4 md:mb-8 items-center text-sm tracking-wide truncate text-white md:flex md:flex-row gap-5">
                <label className="w-[14%]" htmlFor="">
                  Email
                </label>
                <input
                  type="text"
                  value={userDetails.email}
                  className="rounded border w-full md:w md:ml-l border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-50 outline-none py-2 px-4 "
                  name=""
                  id=""
                />
                <button className="absolute px-4 bg-blue-600 hover:bg-blue-800 z-2 py-2.5 md:py-2.5 right-0 md:top-0 top-5 md:right-0 ">
                  Update
                </button>
              </div>
              <div className="md:pl-10  relative mt-4  items-center text-sm tracking-wide truncate text-white md:flex md:flex-row gap-5">
                <label className="w-[14%]" htmlFor="">
                  Mobile
                </label>
                <input
                  type="text"
                  value={userDetails.mobile ? "" : userDetails?.mobile}
                  className="rounded border w-full md:w md:ml-l border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-50 outline-none py-2 px-4 "
                  name=""
                  id=""
                />
                <button className="absolute px-4 bg-blue-600 hover:bg-blue-800 z-2 py-2.5 md:py-2.5 right-0 md:top-0 top-5 md:right-0 ">
                  Update
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {checkActive.password && (
        <>
          <div className="h-screen    ml-14 mt-20 mb-10 md:ml-64">
            <Card className="max-w-md mx-auto">
              <form className="flex flex-col gap-4">
                <div>
                  <div className="">
                    <h2 className="text-white text-center ">Change Password</h2>
                  </div>
                  <div className="mb-2 block">
                    <Label value="Old password" />
                  </div>
                  <TextInput
                    type="password"
                    value={password.oldPassword}
                    onChange={(e) =>
                      setpassword({ ...password, oldPassword: e.target.value })
                    }
                    placeholder=""
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label value="New password" />
                  </div>
                  <TextInput
                    value={password.newPassword}
                    onChange={(e) =>
                      setpassword({ ...password, newPassword: e.target.value })
                    }
                    type="password"
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label value="Confirm password" />
                  </div>
                  <TextInput
                    value={password.confirmPassword}
                    onChange={(e) =>
                      setpassword({
                        ...password,
                        confirmPassword: e.target.value,
                      })
                    }
                    type="password"
                    required
                  />
                </div>

                <Button onClick={handlePasswordChange} type="submit">
                  Update
                </Button>
              </form>
            </Card>
          </div>
        </>
      )}
      {checkActive.wallet && (
        <>
          <div className="h-screen  ml-14  md:ml-0 mt-8 md:mt-20 mb-10 ">
            <Card className="w-[80%] md:w-[25%] mx-auto">
              <form className="flex flex-col gap-4">
                <div>
                  <div className="">
                    <h2 className="text-white text-center ">WALLET</h2>
                  </div>
                  <div className="mb-2 mt-6 flex justify-center text-6xl text-white text-center mx-auto ">
                    <FaWallet />
                  </div>
                  <div className="flex text-white text-xl justify-center">
                    {userDetails.wallet}
                  </div>
                </div>
                <div className=" flex justify-evenly">
                  <Button onClick={handlePasswordChange} type="submit">
                    Deposit
                  </Button>
                  <Button onClick={handlePasswordChange} type="submit">
                    Withdrow
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </>
      )}
      {checkActive.address && (
        <>
          <div className="h-screen    ml-14 mt-20 mb-10 md:ml-64">
            <Card className="max-w-md mx-auto">
              <form className="flex flex-col gap-4">
                <div>
                  <div className="">
                    <h2 className="text-white text-center ">ADDRESS</h2>
                  </div>
                  <div className="mb-2 mt-3 flex justify-center text-4xl text-white text-center mx-auto ">
                    <FaAddressCard />
                  </div>
                </div>
                {ifAddress ? (
                  <>
                    <div className="w-full text-sm tracking-wide truncat text-white bg-gray-500 border-gray-300 border-2 my-3 rounded  flex">
                      <div className="w-[80%] font-bold p-4">
                        First Name : {address.first_name} , Last Name :{" "}
                        {address.last_name} , Email : {address.email} , Phone
                        Number : {address.phone_number} , Place :{" "}
                        {address.place}......
                      </div>
                      <div className="w-[20%]  flex  justify-center items-center">
                        <button
                          onClick={() => viewAddress(address._id)}
                          className="px-4 rounded hover:bg-blue-800 py-2 bg-blue-600"
                        >
                          View
                        </button>
                      </div>
                    </div>
                    <div className=" flex justify-evenly">
                      <Button
                        onClick={() => editAddress(address._id)}
                        type="submit"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteAddress(address._id)}
                        type="submit"
                      >
                        Delete
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex text-white text-xl justify-center">
                      No address found
                    </div>
                    <div className=" flex justify-center">
                      <Button onClick={createAddress} type="submit">
                        Add address
                      </Button>
                    </div>
                  </>
                )}
              </form>
            </Card>
          </div>
        </>
      )}
      {checkActive.referral && (
        <>
          <div className="h-screen    ml-14 mt-20 mb-10 md:ml-64">
            <Card className="max-w-md mx-auto">
              <form className="flex flex-col gap-4">
                <div>
                  <div className="">
                    <h2 className="text-white text-center ">
                      REFERRAL INFORMATION
                    </h2>
                  </div>
                  <div className="mb-2 mt-3 flex justify-center text-4xl text-white text-center mx-auto ">
                    <FaUsers />
                  </div>
                  <div className="">
                    <div className="mb-2 block">
                      <Label value="Referral code" />
                    </div>
                    <div className="flex gap-2">
                      <TextInput
                        type="text"
                        className="w-[80%]"
                        ref={textRef}
                        value={` ${ReferralBaseUrl}/${referralCode} `}
                      />
                      <button
                        id="copy-button"
                        type="button"
                        onClick={copyToClipboard}
                        data-te-clipboard-init
                        data-te-clipboard-target="#copy-target"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
                {referralCount === 0 ? (
                  <>
                    <div className="w-full text-sm tracking-wide truncat text-white bg-gray-500 border-gray-300 border-2 my-3 rounded  flex">
                      <div className="w-[100%] text-center font-bold p-4">
                        You have {referralCount} referrals...
                      </div>
                      {/* <div className="w-[20%]  flex  justify-center items-center">
                        <button
                          onClick={() => viewAddress(address._id)}
                          className="px-4 rounded hover:bg-blue-800 py-2 bg-blue-600"
                        >
                          View
                        </button>
                      </div> */}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-full text-sm tracking-wide truncat text-white bg-gray-500 border-gray-300 border-2 my-3 rounded  flex">
                      <div className="w-[60%]  font-bold p-4">
                        You have {referralCount} referrals...
                      </div>
                      <div className="w-[40%]  flex  justify-center items-center">
                        <button
                          onClick={() => viewAddress(address._id)}
                          className="px-4 rounded hover:bg-blue-800 py-2 bg-blue-600"
                        >
                          View Referrals
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </form>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
