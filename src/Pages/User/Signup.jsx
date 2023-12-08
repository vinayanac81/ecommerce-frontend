import React, { useState } from "react";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import toast from "react-hot-toast";
import AxiosUserInstance from "./AxiosUserInstance";
import OTPInput from "otp-input-react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [openModal, setopenModal] = useState(false);
  const [signupData, setsignupData] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
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
        console.log(data);
        if (data.success) {
          toast.success(data.message);
          setopenModal(true);
        } else if (data.emailExist) {
          toast.error(data.message);
        } else {
          toast.error("Please try again");
        }
      } else {
        toast.error("password doesn't match");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const submitOtp = async (e) => {
    try {
      e.preventDefault();
      console.log(otp);
      const { data } = await AxiosUserInstance.post("/auth/user/verify-otp", {
        otp,
      });
      console.log(data);
      if (data.success === true) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
        setOtp("");
        setopenModal(false);
        navigate("/signup");
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

          <Button onClick={handleSubmit} type="submit">
            Register new account
          </Button>
        </form>
        <Modal
          show={openModal}
          size="md"
          popup
          onClose={() => setopenModal(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">
                ENTER OTP
              </h3>

              <div className=" flex justify-center">
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container outline-none border-none text-black"
                />
              </div>
              <div className="w-full flex justify-center">
                <Button onClick={submitOtp}>Verify OTP</Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Signup;
