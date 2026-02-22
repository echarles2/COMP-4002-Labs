import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/employees">Employees</NavLink>
      <NavLink to="/organization">Organization</NavLink>
    </nav>
  );
}
