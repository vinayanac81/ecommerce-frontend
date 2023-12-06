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
import { useSelector } from "react-redux";
import { FaWallet } from "react-icons/fa";
import AxiosUserInstance from "./AxiosUserInstance";
import toast from "react-hot-toast";
import { BaseUrl, ReferralBaseUrl } from "../../Constants";
import { useNavigate } from "react-router-dom";
import copy from "copy-to-clipboard";
import { GrLogout } from "react-icons/gr";
const UserProfile = () => {
  const navigate = useNavigate();
  const textRef = useRef();
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
    navigate("/login");
    toast.success("Logout Successfully");
  };
  return (
    <div className="h-screen dark:bg-gray-700">
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
          <div className="overflow-y-auto  overflow-x-hidden flex flex-col justify-between flex-grow">
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
          <div className="h-full mx-auto  flex  ml-14 mt-20 mb-10 md:ml-64">
            <div className="w-[30%] mx-20">
              <Card className="max-w-sm">
                <div className="flex flex-col items-center pb-10">
                  {userDetails.image === "" ? (
                    <>
                      <div className="h-28 w-28 ">
                        <div className="rounded-full bg-gray-700 flex justify-center items-center text-6xl w-full h-full">
                          {userDetails.first_name.slice(0, 1)}{" "}
                          {userDetails.last_name.slice(0, 1)}
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
            <div className="">
              <div className="px-10 flex  text-white">
                <h2 className=" text-lg tracking-wide truncate">
                  Account Settings
                </h2>
              </div>
              <div className="px-10 mt-4  items-center text-sm tracking-wide truncate text-white flex gap-5">
                <label htmlFor="">First Name</label>
                <input
                  type="text"
                  className="rounded border md:w-96 ml-7 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-50 outline-none py-2 px-4 "
                  name=""
                  id=""
                />
              </div>
              <div className="px-10 items-center mt-4 text-sm tracking-wide truncate text-white flex gap-5">
                <label htmlFor="">Last Name</label>
                <input
                  type="text"
                  className="rounded  md:w-96 border ml-7 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-50 outline-none py-2 px-4 "
                  name=""
                  id=""
                />
              </div>

              <div className="px-10 items-center mt-4 text-sm tracking-wide truncate text-white flex gap-5">
                <label htmlFor="">Email Address</label>
                <input
                  type="text"
                  className="rounded  md:w-96  border ml-1 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-50 outline-none py-2 px-4 "
                  name=""
                  id=""
                />
              </div>
              <div className="px-10 mt-4 items-center text-sm tracking-wide truncate text-white flex gap-5">
                <label htmlFor="">Mobile Number</label>
                <input
                  type="text"
                  className="rounded border   md:w-96  border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-50 outline-none py-2 px-4 "
                  name=""
                  id=""
                />
              </div>
              <div className="mt-6 px-10 flex gap-8">
                <button className="text-sm bg-blue-600 hover:bg-blue-800 rounded tracking-wide truncate text-white px-4 py-2 ">
                  Update changes
                </button>
                <button className="text-sm bg-gray-500 hover:bg-gray-800 rounded tracking-wide truncate text-white px-4 py-2 ">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {checkActive.password && (
        <>
          <div className="h-full    ml-14 mt-20 mb-10 md:ml-64">
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
          <div className="h-full    ml-14 mt-20 mb-10 md:ml-64">
            <Card className="max-w-md mx-auto">
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
          <div className="h-full    ml-14 mt-20 mb-10 md:ml-64">
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
          <div className="h-full    ml-14 mt-20 mb-10 md:ml-64">
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
// <div className="">
//   <NavBar />
//   <Modal
//     show={openModal}
//     size="md"
//     onClose={() => setopenModal(false)}
//     popup
//   >
//     <Modal.Header />
//     <div className="flex  w-full items-center justify-center">
//       <Label
//         htmlFor="dropzone-file"
//         className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
//       >
//         <div className="flex flex-col items-center justify-center pb-6 pt-5">
//           <svg
//             className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 20 16"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//             />
//           </svg>
//           <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//             <span className="font-semibold">Click to upload</span> or drag
//             and drop
//           </p>
//           <p className="text-xs text-gray-500 dark:text-gray-400">
//             SVG, PNG, JPG or GIF (MAX. 800x400px)
//           </p>
//         </div>
//         <FileInput
//           onChange={handleImage}
//           id="dropzone-file"
//           className="hidden"
//         />
//       </Label>
//     </div>
//   </Modal>
//   <div className="dark:bg-gray-700 px-10 h-screen">
//     <div className=" pt-10 ">
//       <div className="md:max-w-4xl  max-w-md mx-auto rounded  font-bold text-white text-cente flex flex-col ">
//         <div className="flex bg-gray-400 py-6 justify-center">
//           User Profile
//         </div>
//         <div className="h-full  mt-5">
//           <div className=" block h-[30rem]  md:flex">
//             <div className="w-full md:w-2/5 p-4 sm:p-6  lg:p-8 bg-white shadow-md">
//               <div className="flex justify-end">
//                 <button
//                   onClick={() => setopenModal(true)}
//                   className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
//                 >
//                   Edit
//                 </button>
//               </div>

//               <div className="w-full p-8 mx-2 flex justify-center">
//                 <div className="w-40 h-40 rounded-full">
//                   {userDetails?.image ? (
//                     <>
//                       <div className="">
//                         <img
//                           className="w-40 h-40 rounded-full"
//                           src={`${BaseUrl}/images/${userDetails?.image}`}
//                           alt="Rounded avatar"
//                         />
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <div className="">
//                         <svg
//                           className=" w-48 h-48 bg-black rounded-full text-gray-400 -left-1"
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
//                             clipRule="evenodd"
//                           ></path>
//                         </svg>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//             <div className="w-full  md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
//               <div className="rounded  shadow p-">
//                 <div className="flex py-4 flex-wrap  gap-5 justify-evenly  bg-blac w-full">
//                   <div className=" flex justify-center">
//                     <button
//                       onClick={() =>
//                         setcheckActive({
//                           ...checkActive,
//                           profile: true,
//                           wallet: false,
//                           referral:false,
//                           address: false,
//                         })
//                       }
//                       className={`py-2 px-4 rounded ${
//                         checkActive.profile
//                           ? "bg-pink-500"
//                           : "bg-gray-600 hover:bg-gray-800"
//                       }  `}
//                     >
//                       Profile
//                     </button>
//                   </div>
//                   <div className="  flex justify-center">
//                     <button
//                       onClick={() => {
//                         setcheckActive({
//                           ...checkActive,
//                           wallet: true,
//                           profile: false,
//                           referral:false,
//                           address: false,
//                         });
//                       }}
//                       className={`py-2 px-4 rounded ${
//                         checkActive.wallet
//                           ? "bg-pink-500"
//                           : "bg-gray-600 hover:bg-gray-800"
//                       }  `}
//                     >
//                       {" "}
//                       Wallet
//                     </button>
//                   </div>

//                   <div className="  flex justify-center">
//                     <button
//                       onClick={getAddress}
//                       className={`py-2 px-4 rounded ${
//                         checkActive.address
//                           ? "bg-pink-500"
//                           : "bg-gray-600 hover:bg-gray-800"
//                       }  `}
//                     >
//                       Address
//                     </button>
//                   </div>
//                   <div className="  flex justify-center">
//                     <button
//                       onClick={() => {
//                         setcheckActive({
//                           ...checkActive,
//                           wallet: false,
//                           referral: true,
//                           profile: false,
//                           address: false,
//                         });
//                       }}
//                       className={`py-2 px-4 rounded ${
//                         checkActive.referral
//                           ? "bg-pink-500"
//                           : "bg-gray-600 hover:bg-gray-800"
//                       }  `}
//                     >
//                       Referral
//                     </button>
//                   </div>
//                 </div>
//                 <div className="text-black pb-4 px-6">
//                   {checkActive.profile && (
//                     <>
//                       <div className="">
//                         <div className="pb-6 px-4">
//                           <label
//                             htmlFor="name"
//                             className="font-semibold text-gray-700 block pb-1"
//                           >
//                             First name
//                           </label>
//                           <div className="flex">
//                             <input
//                               id="name"
//                               className="border-1  bg-slate-700 text-black  rounded-r px-4 py-2 w-full"
//                               type="text"
//                               value={userProfile.firstname}
//                             />
//                           </div>
//                         </div>
//                         <div className="pb-6 px-4">
//                           <label
//                             htmlFor="name"
//                             className="font-semibold text-gray-700 block pb-1"
//                           >
//                             Last name
//                           </label>
//                           <div className="flex">
//                             <input
//                               id="name"
//                               className="border-1 text-black  bg-slate-700  rounded-r px-4 py-2 w-full"
//                               type="text"
//                               value={userProfile.lastname}
//                             />
//                           </div>
//                         </div>
//                         <div className="pb-4 px-4 ">
//                           <label
//                             htmlFor="email"
//                             className="font-semibold text-gray-700 block pb-1"
//                           >
//                             Email
//                           </label>
//                           <input
//                             id="email"
//                             className="border-1  bg-slate-700 text-black mb-5  rounded-r px-4 py-2 w-full"
//                             type="email"
//                             value={userProfile.email}
//                           />
//                           <Button color="warning">Update changes</Button>
//                         </div>
//                       </div>
//                     </>
//                   )}
//                   {checkActive.wallet && (
//                     <>
//                       <div className="flex flex-col justify-center gap-10 items-center h-40">
//                         <div className="px-10 flex justify-center  items-center">
//                           <span className="text-black">
//                             Total : {userDetails?.wallet} Rupees
//                           </span>
//                         </div>
//                         <div className="flex mt- items-center justify-center">
//                           {" "}
//                           <Button color="cyan">Add amount to wallet</Button>
//                         </div>
//                       </div>
//                     </>
//                   )}
//                   {checkActive.address && (
//                     <>
//                       {ifAddress ? (
//                         <>
//                           <div className="flex  w-full h-20 flex-wrap rounded text-white bg-gray-600">
//                             <div className="p-4 w-[80%] text-sm">
//                               First Name:{address.first_name},Last Name:
//                               {address.last_name},Phone Number:
//                               {address.phone_number},Place:{address.place}
//                               ....
//                             </div>
//                             <div className="w-[20%] flex justify-center items-center  gap-2 flex-col">
//                               <button className="bg-emerald-600 rounded py-1 px-2">
//                                 Edit
//                               </button>
//                               <button className="bg-blue-600 py-1 px-2 rounded">
//                                 View
//                               </button>
//                             </div>
//                           </div>
//                         </>
//                       ) : (
//                         <>
//                           <div className="flex flex-col  gap-7 h-40 justify-center items-center">
//                             <span>No address found</span>
//                             <button
//                               onClick={createAddress}
//                               className="bg-primary-600 px-4 py-2 text-white hover:bg-primary-800 rounded"
//                             >
//                               Add Address
//                             </button>
//                           </div>
//                         </>
//                       )}
//                     </>
//                   )}
//                   {checkActive.referral && (
//                     <>
//                       <div class="flex flex-col h-40">
//                         <div
//                           class=" mb-3 w-full"
//                           data-te-input-wrapper-init
//                         >
//                           <div className="mb-2">
//                             <label
//                               className="dark:text-gray-800"
//                               htmlFor=""
//                             >
//                               Referral link
//                             </label>
//                           </div>
//                           <div className="flex gap-4">
//                             <input
//                               type="text"
//                               value={`${ReferralBaseUrl}/${userDetails.referral_code}`}
//                               class="peer text-sm text-gray-800 block bg-slate-300 min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
//                               id="copy-target"
//                               ref={textRef}
//                             />
//                             <div className="">
//                               <button
//                                 id="copy-button"
//                                 type="button"
//                                 onClick={copyToClipboard}
//                                 data-te-clipboard-init
//                                 data-te-clipboard-target="#copy-target"
//                                 data-te-ripple-init
//                                 data-te-ripple-color="light"
//                                 class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
//                               >
//                                 Copy
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                        {
//                         referralCount===0?(<>
//                         <div className=" px-4 py-2 mt-4 cursor-pointer bg-yellow-600 mx-auto flex items-center border-2 rounded h-10 border-gray-800 ">
//                         You have no referrals
//                         </div>
//                         </>):(<>
//                           <div className="flex">
//                           <span> {userDetails?.referral} Referrals</span>
//                          <button className="bg-emerald-600 px-4 py3 hover:bg-emerald-800">View referrals</button>
//                         </div>
//                         </>)
//                        }
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
