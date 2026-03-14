import type { Role } from "../types";
import type { organizationRepo } from "../repository/organizationRepo";

export type OrgFieldError = {
  field: "firstName" | "lastName" | "role";
  message: string;
};

export type CreateOrgResult =
  | { ok: true; roles: Role[] }
  | { ok: false; errors: OrgFieldError[] };

export function organizationService(repo: ReturnType<typeof organizationRepo>) {
  async function getRoles(): Promise<Role[]> {
    return repo.getRoles();
  }

  async function createOrgEntry(
    firstName: string,
    lastName: string,
    role: string
  ): Promise<CreateOrgResult> {
    return repo.createOrgEntry(firstName, lastName, role);
  }

  return {
    getRoles,
    createOrgEntry
  };
}
