import React, { useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import toast from "react-hot-toast";
import AxiosUserInstance from "./AxiosUserInstance";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const [signupData, setsignupData] = useState({
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: "",
    email: "",
  });
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (signupData.password === signupData.confirm_password) {
        console.log("OK");
        const { data } = await AxiosUserInstance.post(
          "/auth/user/signup",
          {},
          { params: { signupData } }
        );
        if (data.success) {
          toast.success(data.message);
          navigate("/login");
        }else{
            toast.error("Please try again")
        }
      } else {
        toast.error("password doesn't match");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen bg-gray-900 ">
      <div className="flex px-16 justify-center w-full h-full items-center">
        <form className="flex w-full   max-w-lg flex-col gap-4">
          <div className="text-white text-center text-xl font-bold">
            Signup new account
          </div>
          <div className="flex gap-5">
            <div className="w-1/2">
              <div className="mb-2 block">
                <Label htmlFor="first_name" value="First Name" />
              </div>
              <TextInput
                value={signupData.first_name}
                onChange={(e) =>
                  setsignupData({ ...signupData, first_name: e.target.value })
                }
                id="first_name"
                type="text"
                required
                shadow
              />
            </div>{" "}
            <div className="w-1/2">
              <div className="mb-2 block">
                <Label htmlFor="last_name" value="Last Name" />
              </div>
              <TextInput
                value={signupData.last_name}
                onChange={(e) =>
                  setsignupData({ ...signupData, last_name: e.target.value })
                }
                id="last_name"
                type="text"
                required
                shadow
              />
            </div>{" "}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              value={signupData.email}
              onChange={(e) =>
                setsignupData({ ...signupData, email: e.target.value })
              }
              type="email"
              placeholder="email@gamil.com"
              required
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput
              value={signupData.password}
              onChange={(e) =>
                setsignupData({ ...signupData, password: e.target.value })
              }
              id="password"
              type="password"
              required
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="confirm-password" value="Confirm Password" />
            </div>
            <TextInput
              value={signupData.confirm_password}
              onChange={(e) =>
                setsignupData({
                  ...signupData,
                  confirm_password: e.target.value,
                })
              }
              id="confirm-password"
              type="password"
              required
              shadow
            />
          </div>
          {/* <div className="flex items-center gap-2">
        <Checkbox id="agree" />
        <Label htmlFor="agree" className="flex">
          I agree with the&nbsp;
          <Link href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
            terms and conditions
          </Link>
        </Label>
      </div> */}
          <Button onClick={handleSubmit} type="submit">
            Register new account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
