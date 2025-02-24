import React from "react";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

export default function Layout() {
  return (
    <>
      {/* <Nav /> */}
      <Sidebar/>
      <div className="container">
        <Outlet />
      </div>

      {/* <Footer /> */}
    </>
  );
}
