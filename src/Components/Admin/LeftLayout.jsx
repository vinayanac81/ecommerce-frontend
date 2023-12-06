import React, { useEffect, useState } from "react";
import { MdOutlineCategory } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { GrGallery } from "react-icons/gr";
import { MdOutlineAssignment } from "react-icons/md";
const LeftLayout = ({ active }) => {
  const [activeState, setactiveState] = useState({
    dashboard: false,
    products: false,
    users: false,
    category: false,
    brands: false,
    banner: false,
    orders: false,
    coupon: false,
    salesReport: false,
  });
  const handleActive = (active) => {
    if (active === "dashboard") {
      setactiveState({ ...active, dashboard: true });
    } else if (active === "products") {
      setactiveState({ ...active, products: true });
    } else if (active === "users") {
      setactiveState({ ...active, users: true });
    } else if (active === "category") {
      setactiveState({ ...active, category: true });
    } else if (active === "brands") {
      setactiveState({ ...active, brands: true });
    } else if (active === "banner") {
      setactiveState({ ...active, banner: true });
    } else if (active === "orders") {
      setactiveState({ ...active, orders: true });
    } else if (active === "sales_report") {
      setactiveState({ ...active, salesReport: true });
    } else if (active === "coupon") {
      setactiveState({ ...active, coupon: true });
    }
  };
  useEffect(() => {
    handleActive(active);
  }, []);
  return (
    <div>
      <div className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-blue-900 dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar">
        <div className="overflow-y-auto  overflow-x-hidden flex flex-col justify-between flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5 hidden md:block">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
                  Main
                </div>
              </div>
            </li>
            <li>
              <a
                href="/admin/dashboard"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className={`w-5 h-5 ${
                      activeState.dashboard && " text-blue-600"
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
                  onClick={() =>
                    setactiveState({
                      dashboard: true,
                    })
                  }
                  className={`w-5 ml-2 h-5 ${
                    activeState.dashboard && " text-blue-600"
                  }`}
                >
                  Dashboard
                </span>
              </a>
            </li>
            <li>
              <a
                href="/admin/products"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className={`w-5 h-5 ${
                      activeState.products && " text-blue-600"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokewidth="1.5"
                    stroke="currentColor"
                    // className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </span>
                <span
                  className={`ml-2 text-sm tracking-wide truncate ${
                    activeState.products && " text-blue-600"
                  }`}
                >
                  Products
                </span>
              </a>
            </li>
            <li>
              <a
                href="/admin/users"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className={`w-5 h-5 ${
                      activeState.users && " text-blue-600"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokewidth="1.5"
                    stroke="currentColor"
                    // className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    />
                  </svg>
                </span>
                <span
                  className={`ml-2 text-sm tracking-wide truncate ${
                    activeState.users && " text-blue-600"
                  }`}
                >
                  Users
                </span>
              </a>
            </li>
            <li>
              <a
                href="/admin/category"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span
                  className={`inline-flex justify-center ${
                    activeState.category && "text-blue-600"
                  } text-2xl items-center ml-4`}
                >
                  <MdOutlineCategory />
                </span>
                <span
                  className={`ml-2 text-sm tracking-wide truncate ${
                    activeState.category && " text-blue-600"
                  }`}
                >
                  Category
                </span>
              </a>
            </li>
            <li>
              <a
                href="/admin/brand"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span
                  className={`inline-flex justify-center ${
                    activeState.brands && "text-blue-600"
                  } text-2xl items-center ml-4`}
                >
                  <BiCategory />
                </span>
                <span
                  className={`ml-2 text-sm tracking-wide truncate ${
                    activeState.brands && " text-blue-600"
                  }`}
                >
                  Brands
                </span>
              </a>
            </li>
            {/* <li>
              <a
                href="#"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span className="inline-flex text-2xl justify-center items-center ml-4">
                  <GrGallery />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Banner
                </span>
              </a>
            </li> */}
            <li>
              <a
                href="/admin/orders"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span
                  className={`inline-flex justify-center ${
                    activeState.orders && "text-blue-600"
                  } text-2xl items-center ml-4`}
                >
                  <MdOutlineAssignment />
                </span>
                <span
                  className={`ml-2 text-sm tracking-wide truncate ${
                    activeState.orders && " text-blue-600"
                  }`}
                >
                  Orders
                </span>
              </a>
            </li>
            <li>
              <a
                href="/admin/coupen"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span
                  className={`inline-flex justify-center ${
                    activeState.coupon && "text-blue-600"
                  } text-2xl items-center ml-4`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                    />
                  </svg>
                </span>
                <span
                  className={`ml-2 text-sm tracking-wide truncate ${
                    activeState.coupon && " text-blue-600"
                  }`}
                >
                  Coupon
                </span>
              </a>
            </li>
            <li className="px-5 hidden md:block">
              <div className="flex flex-row items-center mt-5 h-8">
                <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
                  Settings
                </div>
              </div>
            </li>
            <li>
              <a
                href="#"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokelinecap="round"
                      strokelinejoin="round"
                      strokewidth="{2}"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Profile
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokelinecap="round"
                      strokelinejoin="round"
                      strokewidth="{2}"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokelinecap="round"
                      strokelinejoin="round"
                      strokewidth="{2}"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Settings
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
  );
};

export default LeftLayout;
