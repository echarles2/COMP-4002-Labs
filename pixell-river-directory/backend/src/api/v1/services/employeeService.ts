import type { CreateEmployeeResult, Department, Employee } from "../types";
import type { employeeRepository } from "../repositories/employeeRepository";

type CreateEmployeeArgs = {
  firstName: string;
  lastName: string;
  departmentName: string;
};

export function employeeService(repo: ReturnType<typeof employeeRepository>) {
  function getDepartments(): Department[] {
    return repo.getDepartments();
  }

  function createEmployee(args: CreateEmployeeArgs): CreateEmployeeResult {
    var errors: { field: "firstName" | "department"; message: string }[] = [];

    var departments = repo.getDepartments();

    var deptExists = departments.some((d) => d.name === args.departmentName);
    if (!deptExists) {
      errors.push({
        field: "department",
        message: "Please select an existing department."
      });
    }

    if (args.firstName.trim().length < 3) {
      errors.push({
        field: "firstName",
        message: "First name must be at least 3 characters."
      });
    }

    if (errors.length > 0) {
      return { ok: false, errors };
    }

    var employee: Employee = {
      firstName: args.firstName.trim()
    };

    if (args.lastName.trim().length > 0) {
      employee.lastName = args.lastName.trim();
    }

    var updatedDepartments = repo.createEmployee(args.departmentName, employee);

    return {
      ok: true,
      departments: updatedDepartments
    };
  }

  return {
    getDepartments,
    createEmployee
  };
}