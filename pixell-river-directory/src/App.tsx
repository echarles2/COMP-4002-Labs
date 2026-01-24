import "./styles.css";
import logo from "./assets/logo.svg";

import Header from "./components/Header";
import Directory from "./components/Directory";
import Footer from "./components/Footer";

import departmentsData from "./data/departments.json";
import type { Department } from "./types";

export default function App() {
  var departments = departmentsData as Department[];

  return (
    <div className="page">
      <Header
        logoSrc={logo}
      />

      <Directory departments={departments} />

      <Footer />
    </div>
  );
}
