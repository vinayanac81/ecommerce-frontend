import React, { useEffect, useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import AxiosUserInstance from "./AxiosUserInstance";
import { GoogleLogin } from "@react-oauth/google";
import { gapi } from "gapi-script";
import toast from "react-hot-toast";
import { setUserCart, setUserDetails } from "../../Toolkit/UserSlice";
import { useDispatch } from "react-redux";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({
        clientId:
          "24219942433-5uope9u4er40bgvqvb2kl3srnqjb1q8s.apps.googleusercontent.com",
      });
    });
  }, []);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await AxiosUserInstance.post(
        "/auth/user/login",
        {},
        { params: { loginData } }
      );
      if (data.success) {
        console.log(data);
        toast.success(data.message);
        localStorage.setItem("token", data.token);
        var tokenId = data.token;
        var decoded = jwt_decode(tokenId);
        // console.log(decoded);
        localStorage.setItem("user", JSON.stringify(decoded));
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
        localStorage.setItem("cart", data.cart_count);
        dispatch(setUserCart(data.cart_count));
        dispatch(setUserDetails(decoded));
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const responseGoogleSuccess = async (response) => {
    try {
      console.log("ok");
      const { data } = await AxiosUserInstance.post("/auth/user/google-login", {
        idToken: response.credential,
      });
      console.log(data);
      if (data.success) {
        console.log(data);
        toast.success(data.message);
        localStorage.setItem("token", data.token);
        var tokenId = data.token;
        var decoded = jwt_decode(tokenId);
        // console.log(decoded);
        localStorage.setItem("user", JSON.stringify(decoded));
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
        localStorage.setItem("cart", data.cart_count);
        dispatch(setUserCart(data.cart_count));
        dispatch(setUserDetails(decoded));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const responseGoogleError = (response) => {
    console.log(response);
  };
  return (
    <div className="dark:bg-gray-800 text-white h-screen">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-white text-center  text-2xl font-bold leading-9 tracking-tight ">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 "
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={loginData.email}
                  onChange={(e) =>
                    setloginData({ ...loginData, email: e.target.value })
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 "
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) =>
                    setloginData({ ...loginData, password: e.target.value })
                  }
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="flex w-full mt-3 px-4 justify-evenly ">
            <div className="flex    cursor-pointer items-center">
              {" "}
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                  responseGoogleSuccess(credentialResponse);
                }}
                onError={() => {
                  toast.error("Login Failed");
                  console.log("Login Failed");
                }}
              />
            </div>
          </div>
          {/* <div class="px-6 mt-4 sm:px-0 max-w-sm">
            <button
              type="button"
              class="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
            >
              <svg
                class="mr-2 -ml-1 w-4 h-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Sign in with Google<div></div>
            </button>
          </div> */}
          <p className="mt-5 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to={"/signup"}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
