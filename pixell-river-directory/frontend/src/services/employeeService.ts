import type { Department } from "../types";
import type { employeeRepo } from "../repository/employeeRepo";

type FieldError = {
  field: "firstName" | "department";
  message: string;
};

export type CreateEmployeeResult =
  | { ok: true; departments: Department[] }
  | { ok: false; errors: FieldError[] };

export function employeeService(repo: ReturnType<typeof employeeRepo>) {
  async function getDepartments(): Promise<Department[]> {
    return repo.getDepartments();
  }

  async function createEmployee(
    firstName: string,
    lastName: string,
    departmentName: string
  ): Promise<CreateEmployeeResult> {
    return repo.createEmployee(firstName, lastName, departmentName);
  }

  return {
    getDepartments,
    createEmployee
  };
}