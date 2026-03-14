import { useEffect, useState } from "react";
import Directory from "../components/Directory";
import AddEmployeeForm from "../components/AddEmployeeForm";

import type { Department } from "../types";
import { employeeRepo } from "../repository/employeeRepo";
import { employeeService, type CreateEmployeeResult } from "../services/employeeService";

export default function EmployeesPage() {
  var repo = employeeRepo();
  var service = employeeService(repo);

  var [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    async function loadDepartments() {
      var loadedDepartments = await service.getDepartments();
      setDepartments(loadedDepartments);
    }

    loadDepartments();
  }, []);

  async function createEmployee(
    first: string,
    last: string,
    dept: string
  ): Promise<CreateEmployeeResult> {
    var result = await service.createEmployee(first, last, dept);

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