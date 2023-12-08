import React from 'react'

const Common = () => {
  return (
    <div>
         if (
        error?.response?.data?.message === "unauthorized user" ||
        error?.response?.data?.message === "Unauthorized"
      ) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("cart");
        navigate("/");
        toast.error("Please login");
      }
 window.scrollTo(0, 0)
      
    </div>
  )
}

export default Common