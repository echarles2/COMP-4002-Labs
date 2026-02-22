import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";

import logo from "../assets/logo.svg";

export default function Layout() {
  return (
    <div className="page">
      <Header logoSrc={logo} />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
