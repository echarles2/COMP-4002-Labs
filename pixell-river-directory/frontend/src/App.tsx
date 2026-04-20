import "./styles.css";
import logo from "./assets/logo.svg";

import Header from "./components/Header";
import Footer from "./components/Footer";
import EmployeesPage from "./components/EmployeesPage";
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'

export default function App() {
  return (
    <div className="page">
      <Header logoSrc={logo}/>
      <EmployeesPage />
      <Footer />
    </div>
  );
}
