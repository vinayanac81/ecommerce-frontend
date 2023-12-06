import React, { useEffect, useState } from "react";
import LeftLayout from "../../Components/Admin/LeftLayout";
import AxiosInstance, { BaseUrl } from "../../Constants";
import { Avatar } from "flowbite-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../../Components/Admin/Header";
const AdminUsers = () => {
  const [limit, setlimit] = useState(5);
  const [page, setpage] = useState(1);
  const [users, setusers] = useState([]);
  const [totalUsers, settotalUsers] = useState("");
  const [totalPages, settotalPages] = useState("");
  const [loading, setloading] = useState(true);
  const [showingList, setshowingList] = useState({
    initial: "",
    final: "",
  });
  let pages = [];
  const getAllUSers = async () => {
    try {
      setloading(true);
      const { data } = await AxiosInstance.get("/admin/get-all-users", {
        params: { limit, page },
      });
      // console.log(data?.users[1].image);
      setloading(false);
      if (data?.success) {
        const total = data.totalPages;
        if (page === 1) {
          if (data?.totalUsers <= limit) {
            setshowingList({
              ...showingList,
              initial: 1,
              final: data?.totalUsers,
            });
          } else {
            setshowingList({ ...showingList, initial: 1, final: limit });
          }
        } else {
          let ini = (page - 1) * limit;
          let fin = ini + limit;
          if (fin >= data?.totalUsers) {
            fin = data?.totalUsers;
          }
          setshowingList({
            ...showingList,
            initial: ini + 1,
            final: fin,
          });
        }

        settotalUsers(data?.totalUsers);
        settotalPages(total);
        setusers(data?.users);
      }
    } catch (error) {
      console.log(error);
    }
  };
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  useEffect(() => {
    getAllUSers();
  }, []);
  const handleUser = async (status, userId) => {
    try {
      if (status === "block") {
        const { data } = await AxiosInstance.post("/admin/block-user", {
          userId,
        });
        if (data.success) {
          getAllUSers();
          toast.success(data?.message);
        }
      } else {
        const { data } = await AxiosInstance.post("/admin/unblock-user", {
          userId,
        });
        if (data.success) {
          getAllUSers();
          toast.success(data?.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div x-data="setup()" className="{ 'dark': isDark }">
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
          <Header />
          <LeftLayout active="users" />
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
            <div className="mt-4 mx-4">
              <div className="w-full overflow-hidden rounded-lg shadow-xs">
                <div className="w-full overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                        <th className="px-4 text-center py-3">Name</th>
                        <th className="px-4 text-center py-3">Image</th>
                        <th className="px-4 text-center py-3">Email</th>
                        <th className="px-4 text-center py-3">Number</th>
                        <th className="px-4 text-center py-3">Block</th>
                        <th className="px-4 text-center py-3">View</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                      {users.map((user, id) => {
                        return (
                          <>
                            <tr className="bg-gray-50 h-20  dark:bg-black  hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                              <td className="px-4 py-3">
                                <div className="flex items-center justify-center text-sm">
                                  <div>
                                    <p className="font-semibold">
                                      {user.first_name} {user?.last_name}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 text-center   text-sm">
                                {user?.image !== "" ? (
                                  <>
                                    <Avatar
                                      alt="User settings"
                                      size={"md"}
                                      img={`${BaseUrl}/images/${user?.image}`}
                                      rounded
                                    />
                                  </>
                                ) : (
                                  <>
                                    <Avatar rounded />
                                  </>
                                )}
                              </td>
                              <td className="px-4 text-center text-xs">
                                <span className="px-2 py-1 font-semibold leading-tight ">
                                  {" "}
                                  {user?.email}{" "}
                                </span>
                              </td>
                              <td className="px-4 text-center text-xs">
                                <span className="px-2 py-1 font-semibold leading-tight ">
                                  {user?.mobile !== "" ? (
                                    <>{user.mobile}</>
                                  ) : (
                                    <>not available</>
                                  )}
                                </span>
                              </td>
                              <td className="text-center ">
                                {user?.block ? (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleUser("unblock", user?._id)
                                      }
                                      className="px-2  py-2 bg-emerald-600 text-white rounded hover:bg-emerald-800"
                                    >
                                      Unblock
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    onClick={() =>
                                      handleUser("block", user?._id)
                                    }
                                    className="px-2  py-2 bg-yellow-600 text-white rounded hover:bg-yellow-800"
                                  >
                                    Block
                                  </button>
                                )}
                              </td>
                              <td className="text-center">
                                <Link to={`/admin/view-user/${user?._id}`}>
                                  {" "}
                                  <button className="px-2  py-2 bg-blue-600 text-white rounded hover:bg-blue-800">
                                    View
                                  </button>
                                </Link>{" "}
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
                    Showing {showingList.initial} - {showingList.final} of{" "}
                    {totalUsers}
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
                              <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
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

export default AdminUsers;
