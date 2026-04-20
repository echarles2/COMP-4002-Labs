import { useEffect, useState } from "react";
import { Show, useAuth } from "@clerk/react";
import Directory from "../components/Directory";
import AddEmployeeForm from "../components/AddEmployeeForm";
import AuthRequiredNotice from "./AuthNotice";

import {
  getDepartments,
  createEmployee as createEmployeeApi,
  type Department,
  type CreateEmployeeResponse
} from "../apis/employeeApi";

export default function EmployeesPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const { getToken } = useAuth();

  useEffect(() => {
    async function loadDepartments() {
      const loadedDepartments = await getDepartments();
      setDepartments(loadedDepartments);
    }

    loadDepartments();
  }, []);

  async function createEmployee(
    first: string,
    last: string,
    dept: string
  ): Promise<CreateEmployeeResponse> {
    const token = await getToken();

    const result = await createEmployeeApi(
      {
        firstName: first,
        lastName: last,
        departmentName: dept
      },
      token
    );

    if (result.ok) {
      setDepartments(result.departments);
    }

    return result;
  }

  return (
    <>
      <Directory departments={departments} />

      <Show when="signed-in">
        <AddEmployeeForm
          departments={departments}
          onCreateEmployee={createEmployee}
        />
      </Show>

      <Show when="signed-out">
        <AuthRequiredNotice
          title="Add Employee"
          message="You can browse the directory without logging in, but you must log in to add a new employee."
        />
      </Show>
    </>
  );
}