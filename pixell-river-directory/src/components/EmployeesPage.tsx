import { useState } from "react";
import Directory from "../components/Directory";
import AddEmployeeForm from "../components/AddEmployeeForm";

import type { Department } from "../types";
import { employeeRepo } from "../repository/employeeRepo";
import { employeeService, type CreateEmployeeResult } from "../services/employeeService";

export default function EmployeesPage() {
  var repo = employeeRepo();
  var service = employeeService(repo);

  var [departments, setDepartments] = useState<Department[]>(repo.getDepartments());

  function createEmployee(first: string, last: string, dept: string): CreateEmployeeResult {
    var result = service.createEmployee({
      departments: departments,
      firstName: first,
      lastName: last,
      departmentName: dept
    });

    if (result.ok) {
      setDepartments(result.departments);
    }

    return result;
  }

  return (
    <>
      <Directory departments={departments} />
      <AddEmployeeForm
        departments={departments}
        onCreateEmployee={createEmployee}
      />
    </>
  );
}