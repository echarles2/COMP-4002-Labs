const API_URL = import.meta.env.VITE_API_BASE_URL;

export type Role = {
  firstName: string;
  lastName: string;
  role: string;
};

export type OrganizationApiError = {
  field: "firstName" | "lastName" | "role";
  message: string;
};

export type GetRolesResponse = Role[];

export type CreateOrgEntryArgs = {
  firstName: string;
  lastName: string;
  role: string;
};

export type CreateOrgEntryResponse =
  | {
      ok: true;
      roles: Role[];
    }
  | {
      ok: false;
      errors: OrganizationApiError[];
    };

function buildUrl(path: string): string {
  if (!API_URL) {
    throw new Error("VITE_API_URL is not defined.");
  }

  return `${API_URL}${path}`;
}

export async function getRoles(): Promise<GetRolesResponse> {
  const response = await fetch(buildUrl("/getDepartments"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch roles. Status: ${response.status}`);
  }

  return await response.json();
}

export async function createOrgEntry(
  args: CreateOrgEntryArgs
): Promise<CreateOrgEntryResponse> {
  const response = await fetch(buildUrl("/getDepartments"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      firstName: args.firstName,
      lastName: args.lastName,
      role: args.role
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to create organization entry. Status: ${response.status}`);
  }

  return await response.json();
}