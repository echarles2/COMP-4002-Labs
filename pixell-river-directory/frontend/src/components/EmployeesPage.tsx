import { useEffect, useState } from "react";
import Directory from "../components/Directory";
import AddEmployeeForm from "../components/AddEmployeeForm";

import {
  getDepartments,
  createEmployee as createEmployeeApi,
  type Department,
  type CreateEmployeeResponse
} from "../apis/employeeApi";

export default function EmployeesPage() {

  var [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    async function loadDepartments() {
      var loadedDepartments = await getDepartments();
      setDepartments(loadedDepartments);
    }

    loadDepartments();
  }, []);

  async function createEmployee(
    first: string,
    last: string,
    dept: string
  ): Promise<CreateEmployeeResponse> {
    var result = await createEmployee(first, last, dept);

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