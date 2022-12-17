import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="w-full min-h-[100vh] h-[100vh]">
      <div className="w-full max-w-[1250px] mx-auto px-6 ">
        <Header></Header>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default Layout;
