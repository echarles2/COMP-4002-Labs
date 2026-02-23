import type { Department, Employee } from "../types";
import type { employeeRepo } from "../repository/employeeRepo";

type FieldError = {
  field: "firstName" | "department";
  message: string;
};

export type CreateEmployeeResult =
  | { ok: true; departments: Department[] }
  | { ok: false; errors: FieldError[] };

type CreateEmployeeArgs = {
  departments: Department[];
  firstName: string;
  lastName: string;
  departmentName: string;
};

export function employeeService(repo: ReturnType<typeof employeeRepo>) {
  function createEmployee(args: CreateEmployeeArgs): CreateEmployeeResult {
    var errors: FieldError[] = [];

    var deptExists = args.departments.some((d) => d.name === args.departmentName);
    if (!deptExists) {
      errors.push({ field: "department", message: "Please select an existing department." });
    }

    if (args.firstName.trim().length < 3) {
      errors.push({ field: "firstName", message: "First name must be at least 3 characters." });
    }

    if (errors.length > 0) {
      return { ok: false, errors: errors };
    }

    var employee: Employee = { firstName: args.firstName.trim() };
    if (args.lastName.trim().length > 0) {
      employee.lastName = args.lastName.trim();
    }

    var updated = repo.createEmployee(args.departments, args.departmentName, employee);
    return { ok: true, departments: updated };
  }

  return { createEmployee };
}