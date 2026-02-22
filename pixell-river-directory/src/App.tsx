import { useState } from "react";
import "./styles.css";
import logo from "./assets/logo.svg";

import Header from "./components/Header";
import Directory from "./components/Directory";
import Footer from "./components/Footer";
import AddEmployeeForm from "./components/AddEmployeeForm.tsx";

import departmentsData from "./data/departments.json";
import type { Department } from "./types";

export default function App() {
  var [departments, setDepartments] = useState<Department[]>(
    departmentsData as Department[]
  );

  function addEmployee(firstName: string, lastName: string, departmentName: string) {
    setDepartments((old) =>
      old.map((dept) => {
        if (dept.name !== departmentName) {
          return dept;
        }

        return {
          name: dept.name,
          employees: dept.employees.concat({
            firstName: firstName,
            lastName: lastName || undefined
          })
        };
      })
    );
  }

  return (
    <div className="page">
      <Header logoSrc={logo} />
      <Directory departments={departments} />
      <AddEmployeeForm
        departments={departments}
        onAddEmployee={addEmployee}
      />
      <Footer />
    </div>
  );
}
