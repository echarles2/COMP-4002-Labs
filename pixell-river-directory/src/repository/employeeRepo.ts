import type { Department, Employee } from "../types";
import departmentsData from "../data/departments.json";

var storedDepartments: Department[] = departmentsData as Department[];

function cloneDepartments(departments: Department[]): Department[] {
  return departments.map((dept) => {
    return {
      name: dept.name,
      employees: dept.employees.map((emp) => {
        return { firstName: emp.firstName, lastName: emp.lastName };
      })
    };
  });
}

storedDepartments = cloneDepartments(storedDepartments);

export function employeeRepo() {
  function getDepartments(): Department[] {
    return cloneDepartments(storedDepartments);
  }

  function setDepartments(departments: Department[]) {
    storedDepartments = cloneDepartments(departments);
  }

  function createEmployee(
    departments: Department[],
    departmentName: string,
    employee: Employee
  ): Department[] {
    var updated = departments.map((dept) => {
      if (dept.name !== departmentName) {
        return dept;
      }

      return {
        name: dept.name,
        employees: dept.employees.concat(employee)
      };
    });

    setDepartments(updated);
    return getDepartments();
  }

  return {
    getDepartments,
    createEmployee
  };
}