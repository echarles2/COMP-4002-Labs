export interface Employee {
  firstName: string;
  lastName?: string;
}

export interface Department {
  name: string;
  employees: Employee[];
}

export interface Role {
  firstName: string;
  lastName: string;
  role: string;
}

export type EmployeeFieldError = {
  field: "firstName" | "department";
  message: string;
};

export type OrgFieldError = {
  field: "firstName" | "lastName" | "role";
  message: string;
};

export type CreateEmployeeResult =
  | { ok: true; departments: Department[] }
  | { ok: false; errors: EmployeeFieldError[] };

export type CreateOrgResult =
  | { ok: true; roles: Role[] }
  | { ok: false; errors: OrgFieldError[] };