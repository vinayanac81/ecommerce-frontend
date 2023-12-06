import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import NavBar from "../../Components/User/NavBar";
import AxiosUserInstance from "./AxiosUserInstance";
import { BaseUrl } from "../../Constants";

const BookedProduct = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const { id } = location.state;
  const [orderDetails, setorderDetails] = useState({});
  const getOrderDetail = async () => {
    try {
      const { data } = await AxiosUserInstance.get("/get-booked-detail", {
        params: { id, orderId },
      });
      console.log(data);
      setorderDetails(data?.bookedProduct);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrderDetail();
  }, []);
  console.log(orderDetails);
  return (
    <div>
      <NavBar />
    </div>
  );
};

export default BookedProduct;
