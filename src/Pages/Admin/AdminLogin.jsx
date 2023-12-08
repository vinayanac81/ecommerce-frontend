import React, { useState } from "react";
import AxiosInstance from "../../Constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdminDetails } from "../../Toolkit/AdminSlice";
const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, setlogin] = useState({
    email: "Vinayanac7777@gmail.com",
    password: "Vinayanac",
  });
  const handleLogin = async (e) => {
    try {
      console.log("CLicked");
      e.preventDefault();
      const { data } = await AxiosInstance.post(
        "/auth/admin/login",
        {},
        { params: { login } }
      );
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("admin-token", data.token);
        var tokenId = data.token;
        var decoded = jwt_decode(tokenId);
        console.log(decoded);
        localStorage.setItem("admin", JSON.stringify(decoded));
        function jwt_decode(token) {
          var base64Url = token.split(".")[1];
          var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          var jsonPayload = decodeURIComponent(
            window
              .atob(base64)
              .split("")
              .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join("")
          );

          return JSON.parse(jsonPayload);
        }
        dispatch(setAdminDetails(decoded));
        navigate("/admin/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="container mt-20 mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div
              className="w-1/2 h-[70vh] bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1634979149798-e9a118734e93?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
                objectFit: "fit",
                backgroundPosition: "cover",
              }}
            />
            <div className="w-full md:mt-20 lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4  text-2xl text-center">Admin Login</h3>
              <form
                // onClick={handleLogin}
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
              >
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    onChange={(e) =>
                      setlogin({ ...login, email: e.target.value })
                    }
                    value={login?.email}
                    placeholder="Email"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    onChange={(e) =>
                      setlogin({ ...login, password: e.target.value })
                    }
                    value={login?.password}
                    type="password"
                    placeholder="******************"
                  />
                </div>

                <div className="mb-6 text-center">
                  <button
                    onClick={handleLogin}
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Log in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
