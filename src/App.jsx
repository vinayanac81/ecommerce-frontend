import { Toaster } from "react-hot-toast";
import AdminLogin from "./Pages/Admin/AdminLogin";
import Home from "./Pages/User/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminProducts from "./Pages/Admin/AdminProducts";
import AdminUsers from "./Pages/Admin/AdminUsers";
import AddProduct from "./Pages/Admin/AddProduct";
import EditProduct from "./Pages/Admin/EditProduct";
import ViewProduct from "./Pages/Admin/ViewProduct";
import AdminCategory from "./Pages/Admin/AdminCategory";
import Brand from "./Pages/Admin/Brand";
import Login from "./Pages/User/Login";
import Signup from "./Pages/User/Signup";
import Cart from "./Pages/User/Cart";
import Checkout from "./Pages/User/Checkout";
import PaymentSuccess from "./Pages/User/PaymentSuccess";
import CheckoutPage from "./Pages/User/CheckoutPage";
import Booking from "./Pages/User/Booking";
import BookedProduct from "./Pages/User/BookedProduct";
import Orders from "./Pages/Admin/Orders";
import Shop from "./Pages/User/Shop";
import Brands from "./Pages/User/Brands";
import Category from "./Pages/User/Category";
import UserProfile from "./Pages/User/UserProfile";
import Coupen from "./Pages/Admin/Coupen";
import AddCoupen from "./Pages/Admin/AddCoupen";
import AddAddress from "./Pages/User/AddAddress";
import {
  AdminAuth,
  AdminLoginAuth,
  UserAuth,
  UserLoginAuth,
} from "./Authorization/Authorization";
import ViewUserProfile from "./Pages/Admin/ViewUserProfile";
import Validation from "./Pages/Validation";
import ViewAddress from "./Pages/User/ViewAddress";
import EditAddress from "./Pages/User/EditAddress";
import UserViewProduct from "./Pages/User/UserViewProduct";
import OrderViewPage from "./Pages/Admin/OrderViewPage";
import UserOrderViewPage from "./Pages/User/UserOrderViewPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/filter/brand/:type" element={<Brands />} />
          <Route path="/filter/category/:type" element={<Category />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/view/:id" element={<UserViewProduct />} />
          <Route element={<UserLoginAuth />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route element={<UserAuth />}>
            <Route path="/add-address" element={<AddAddress />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/account" element={<UserProfile />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<PaymentSuccess />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/view-address/:id" element={<ViewAddress />} />
            <Route path="/edit-address/:id" element={<EditAddress />} />
            <Route path="/order/view/:id" element={<UserOrderViewPage />} />
          </Route>

          {/* Admin Routes */}
          {/* <Route element={<AdminLoginAuth />}> */}
          <Route path="/admin" element={<AdminLogin />} />
          {/* </Route> */}
          <Route path="/validation" element={<Validation />} />
          {/* <Route element={<AdminAuth />}> */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/order/view/:id" element={<OrderViewPage />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/edit-product/:id" element={<EditProduct />} />
          <Route path="/admin/view-user/:id" element={<ViewUserProfile />} />
          <Route path="/admin/view-product/:id" element={<ViewProduct />} />
          <Route path="/admin/category" element={<AdminCategory />} />
          <Route path="/admin/brand" element={<Brand />} />
          <Route path="/admin/coupen" element={<Coupen />} />
          <Route path="/admin/add-coupen" element={<AddCoupen />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
