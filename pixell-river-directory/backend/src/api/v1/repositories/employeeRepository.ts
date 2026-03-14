import departmentsData from "../data/departments.json";
import type { Department, Employee } from "../types";

function cloneDepartments(departments: Department[]): Department[] {
  return departments.map((dept) => {
    return {
      name: dept.name,
      employees: dept.employees.map((emp) => {
        return {
          firstName: emp.firstName,
          lastName: emp.lastName
        };
      })
    };
  });
}

var storedDepartments: Department[] = cloneDepartments(departmentsData as Department[]);

export function employeeRepository() {
  function getDepartments(): Department[] {
    return cloneDepartments(storedDepartments);
  }

  function createEmployee(departmentName: string, employee: Employee): Department[] {
    storedDepartments = storedDepartments.map((dept) => {
      if (dept.name !== departmentName) {
        return dept;
      }

      return {
        name: dept.name,
        employees: dept.employees.concat(employee)
      };
    });

    return getDepartments();
  }

  return {
    getDepartments,
    createEmployee
  };
}