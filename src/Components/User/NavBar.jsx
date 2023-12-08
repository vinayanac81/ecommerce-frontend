import React, { useEffect, useState } from "react";
import { BsFillCartFill } from "react-icons/bs";
import { Avatar, Dropdown, Button, Navbar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineLogin } from "react-icons/hi";
import { googleLogout } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AxiosUserInstance from "../../Pages/User/AxiosUserInstance";
import { BaseUrl } from "../../Constants";
import { setUserCart, setUserDetails } from "../../Toolkit/UserSlice";
const NavBar = ({ name }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categories, setcategories] = useState([]);
  const [brands, setbrands] = useState([]);
  const [handleActive, sethandleActive] = useState({
    home: false,
    shop: false,
    category: false,
    brand: false,
  });
  const { userDetails, userCart } = useSelector((state) => state.user);
  const getInitialData = async () => {
    try {
      const { data } = await AxiosUserInstance.get("/get-navbar-data");
      // console.log(data);
      setbrands(data?.brands);
      setcategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getInitialData();
    sethandleActive({ ...handleActive, [name]: true });
  }, [name]);
  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    navigate("/");
    dispatch(setUserDetails(""));
    dispatch(setUserCart(0));
    toast.success("Logout Successfully");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleRoute = (name) => {
    if (name === "account") {
      navigate("/account");
    } else {
      navigate("/booking");
    }
  };
  const handleBrand = (name, brand) => {
    navigate(`/filter/brand/${name}`);
  };
  const handleCategory = (name) => {
    navigate(`/filter/category/${name}`);
  };
  return (
    <div className="">
      <Navbar fluid>
        <Navbar.Brand href="/">
          <span className="self-center pl- md:pl-24 whitespace-nowrap text-md md:text-xl font-semibold dark:text-white">
            PHONE HOUSE
          </span>
        </Navbar.Brand>
        <div className="flex md:gap-5 md:px-6 md:order-2">
          <div className="flex relative items-center text-gray-500 mr-3 text-2xl md:text-4xl">
            <Link to={"/cart"}>
              <BsFillCartFill />
              <span className="md:w-4 w-3.5 flex justify-center rounded-full text-xs  text-white left-1.5 md:left-3  top-3 absolute h-4">
                {userCart}
              </span>
            </Link>
          </div>

          {userDetails?.email ? (
            <>
              {!userDetails?.image || userDetails.image==="" ? (
                <>
                  <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                      <Avatar
                        placeholderInitials={userDetails.first_name.slice(0, 1)}
                        rounded
                      />
                    }
                  >
                    <Dropdown.Header>
                      <span className="block text-sm">
                        {userDetails.first_name} {userDetails.last_name}
                      </span>
                      <span className="block truncate text-sm font-medium">
                        {userDetails?.email}
                      </span>
                    </Dropdown.Header>
                    <Dropdown.Item onClick={() => handleRoute("account")}>
                      Account
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleRoute("booking")}>
                      Orders
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      Log out
                    </Dropdown.Item>
                  </Dropdown>
                </>
              ) : (
                <>
                    <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                      <Avatar
                        alt="User settings"
                        img={`${BaseUrl}/images/${userDetails?.image}`}
                        rounded
                      />
                    }
                  >
                    <Dropdown.Header>
                      <span className="block text-sm">
                        {userDetails.first_name} {userDetails.last_name}
                      </span>
                      <span className="block truncate text-sm font-medium">
                        {userDetails?.email}
                      </span>
                    </Dropdown.Header>
                    <Dropdown.Item onClick={() => handleRoute("account")}>
                      Account
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleRoute("booking")}>
                      Orders
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      Log out
                    </Dropdown.Item>
                  </Dropdown>
                 
                </>
              )}
            </>
          ) : (
            <>
              <button
                className="px-4 py-2 bg-blue-600 flex rounded text-white items-center hover:bg-blue-800"
                onClick={handleLogin}
              >
                Login
                <HiOutlineLogin className="ml-1 h-5 w-5" />
              </button>
            </>
          )}

          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          {handleActive.home === true ? (
            <>
              <Navbar.Link href="/" active>
                Home
              </Navbar.Link>
            </>
          ) : (
            <>
              <Navbar.Link href="/">Home</Navbar.Link>
            </>
          )}

          {handleActive.shop === true ? (
            <>
              <Navbar.Link href="/shop" active>
                Shop
              </Navbar.Link>
            </>
          ) : (
            <>
              <Navbar.Link href="/shop">Shop</Navbar.Link>
            </>
          )}
          {handleActive.category === true ? (
            <>
              <Navbar.Link active>
                <Dropdown arrowIcon={true} inline label="Category">
                  {categories.map((category) => {
                    return (
                      <>
                        <Dropdown.Item
                          onClick={() =>
                            handleCategory(category?.category_name)
                          }
                        >
                          {category?.category_name}
                        </Dropdown.Item>
                      </>
                    );
                  })}
                </Dropdown>
              </Navbar.Link>
            </>
          ) : (
            <>
              <Navbar.Link>
                <Dropdown arrowIcon={true} inline label="Category">
                  {categories.map((category) => {
                    return (
                      <>
                        <Dropdown.Item
                          onClick={() =>
                            handleCategory(category?.category_name)
                          }
                        >
                          {category?.category_name}
                        </Dropdown.Item>
                      </>
                    );
                  })}
                </Dropdown>
              </Navbar.Link>
            </>
          )}
          {handleActive.brand === true ? (
            <>
              <Navbar.Link active>
                <Dropdown arrowIcon={true} inline label="Brand">
                  {brands.map((brand) => {
                    return (
                      <>
                        <Dropdown.Item
                          onClick={() =>
                            handleBrand(brand?.brand_name, "brand")
                          }
                        >
                          {brand?.brand_name}
                        </Dropdown.Item>
                      </>
                    );
                  })}
                </Dropdown>
              </Navbar.Link>
            </>
          ) : (
            <>
              <Navbar.Link>
                <Dropdown arrowIcon={true} inline label="Brand">
                  {brands.map((brand) => {
                    return (
                      <>
                        <Dropdown.Item
                          onClick={() =>
                            handleBrand(brand?.brand_name, "brand")
                          }
                        >
                          {brand?.brand_name}
                        </Dropdown.Item>
                      </>
                    );
                  })}
                </Dropdown>
              </Navbar.Link>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
