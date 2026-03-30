import type { CreateEmployeeResult, Department, Employee } from "../types";
import type { employeeRepository } from "../repositories/employeeRepository";

type CreateEmployeeArgs = {
  firstName: string;
  lastName: string;
  departmentName: string;
};

export function employeeService(repo: ReturnType<typeof employeeRepository>) {
  async function getDepartments(): Promise<Department[]> {
    return await repo.getDepartments();
  }

  async function createEmployee(args: CreateEmployeeArgs): Promise<CreateEmployeeResult> {
    var errors: { field: "firstName" | "department"; message: string }[] = [];

    var departments = await repo.getDepartments();

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

    var updatedDepartments = await repo.createEmployee(args.departmentName, employee);

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