import type { Department } from "../types";
import type { CreateEmployeeResult } from "../services/employeeService";

var API_URL = "http://localhost:3000";

export function employeeRepo() {
  async function getDepartments(): Promise<Department[]> {
    var response = await fetch(`${API_URL}/employees`);
    var data = await response.json();
    return data;
  }

  async function createEmployee(
    firstName: string,
    lastName: string,
    departmentName: string
  ): Promise<CreateEmployeeResult> {
    var response = await fetch(`${API_URL}/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName,
        lastName,
        departmentName
      })
    });

    var result = await response.json();
    return result;
  }

  return {
    getDepartments,
    createEmployee
  };
}