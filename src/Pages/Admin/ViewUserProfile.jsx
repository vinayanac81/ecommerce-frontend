import React, { useEffect, useState } from "react";
import { Card, Dropdown } from "flowbite-react";
import { Avatar } from "flowbite-react";
import AxiosInstance, { BaseUrl } from "../../Constants";
import { useParams } from "react-router-dom";
const ViewUserProfile = () => {
  const { id } = useParams();
  const [userData, setuserData] = useState();
  const [loading, setloading] = useState(true)
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    try {
      setloading(true)
      const { data } = await AxiosInstance.get("/admin/view-user", {
        params: { userId: id },
      });
      setloading(false)
      if (data.success) {
        console.log(data);
        setuserData(data?.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full bg-gray-900 h-screen flex justify-center items-center">
      <Card className="max-w-lg">
        <div className="flex justify-end px-4 pt-4">
          <Dropdown inline label="">
            <Dropdown.Item>
              <a
                href="/admin/users"
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
               Back
              </a>
            </Dropdown.Item>
          </Dropdown>
        </div>
        <div className="flex flex-col items-center pb-10">
          {userData?.image !== "" ? (
            <>
              <Avatar
                alt="User settings"
                size={"lg"}
                img={`${BaseUrl}/images/${userData?.image}`}
                rounded
              />
            </>
          ) : (
            <>
              <Avatar size={"xl"} rounded />
            </>
          )}
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {userData?.first_name} {userData?.last_name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
          {userData?.email}
          </span>
          <div className="mt-4 flex space-x-3 lg:mt-6">
            <a
              href="#"
              className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              View orders
            </a>
            <a
              href="#"
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              Block
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ViewUserProfile;
