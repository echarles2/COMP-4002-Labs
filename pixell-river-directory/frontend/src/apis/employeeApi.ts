const API_URL = import.meta.env.VITE_API_URL;

export type Employee = {
  firstName: string;
  lastName?: string;
};

export type Department = {
  name: string;
  employees: Employee[];
};

export type EmployeeApiError = {
  field: "firstName" | "department";
  message: string;
};

export type GetDepartmentsResponse = Department[];

export type CreateEmployeeArgs = {
  firstName: string;
  lastName: string;
  departmentName: string;
};

export type CreateEmployeeResponse =
  | {
      ok: true;
      departments: Department[];
    }
  | {
      ok: false;
      errors: EmployeeApiError[];
    };

function buildUrl(path: string): string {
  if (!API_URL) {
    throw new Error("VITE_API_URL is not defined.");
  }

  return `${API_URL}${path}`;
}

export async function getDepartments(): Promise<GetDepartmentsResponse> {
  const response = await fetch(buildUrl("/employees"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch departments. Status: ${response.status}`);
  }

  return await response.json();
}

export async function createEmployee(
  args: CreateEmployeeArgs,
  token: string | null
): Promise<CreateEmployeeResponse> {
  const response = await fetch(buildUrl("/employees"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    },
    body: JSON.stringify({
      firstName: args.firstName,
      lastName: args.lastName,
      departmentName: args.departmentName
    })
  });

  if (response.status === 400) {
    return await response.json();
  }

  if (response.status === 401) {
    throw new Error("You must be logged in to create an employee.");
  }

  if (!response.ok) {
    throw new Error(`Failed to create employee. Status: ${response.status}`);
  }

  return await response.json();
}