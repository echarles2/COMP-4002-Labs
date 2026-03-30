import organizationData from "../data/organization.json";
import type { Role } from "../types";

function cloneRoles(roles: Role[]): Role[] {
  return roles.map((r) => {
    return {
      firstName: r.firstName,
      lastName: r.lastName,
      role: r.role
    };
  });
}

var storedRoles: Role[] = cloneRoles(organizationData as Role[]);

export function organizationRepository() {
  function getRoles(): Role[] {
    return cloneRoles(storedRoles);
  }

  function roleExists(roleName: string): boolean {
    return storedRoles.some((r) => {
      return r.role.trim().toLowerCase() === roleName.trim().toLowerCase();
    });
  }

  function createRoleEntry(newRole: Role): Role[] {
    storedRoles = storedRoles.concat(newRole);
    return getRoles();
  }

  return {
    getRoles,
    roleExists,
    createRoleEntry
  };
}