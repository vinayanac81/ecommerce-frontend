import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export function AdminAuth() {
  const token = localStorage.getItem("admin-token");
  return token ? <Outlet /> : <Navigate to={"/admin"} />;
}

export function AdminLoginAuth() {
  const token = localStorage.getItem("admin-token");
  return token ? <Navigate to={"/admin/dashboard"} /> : <Outlet />;
}

export function UserAuth() {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to={"/"} />;
}

export function UserLoginAuth() {
  const token = localStorage.getItem("token");
  return token ? <Navigate to={"/"} /> : <Outlet />;
}
