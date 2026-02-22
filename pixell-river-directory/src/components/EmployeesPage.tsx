import { useState } from "react";
import Directory from "../components/Directory";
import AddEmployeeForm from "../components/AddEmployeeForm";
import departmentsData from "../data/departments.json";
import type { Department } from "../types";

export default function EmployeesPage() {
  var [departments, setDepartments] = useState<Department[]>(
    departmentsData as Department[]
  );

  function addEmployee(firstName: string, lastName: string, departmentName: string) {
    setDepartments((prev) =>
      prev.map((dept) => {
        if (dept.name !== departmentName) return dept;

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
    <>
      <Directory departments={departments} />
      <AddEmployeeForm departments={departments} onAddEmployee={addEmployee} />
    </>
  );
}
