import type { CreateOrgResult, Role } from "../types";
import type { organizationRepository } from "../repositories/organizationRepository";

type CreateOrgArgs = {
  firstName: string;
  lastName: string;
  role: string;
};

export function organizationService(repo: ReturnType<typeof organizationRepository>) {
  function getRoles(): Role[] {
    return repo.getRoles();
  }

  function createOrgEntry(args: CreateOrgArgs): CreateOrgResult {
    var errors: { field: "firstName" | "lastName" | "role"; message: string }[] = [];

    if (args.firstName.trim().length < 3) {
      errors.push({
        field: "firstName",
        message: "First name must be at least 3 characters."
      });
    }

    if (args.lastName.trim().length === 0) {
      errors.push({
        field: "lastName",
        message: "Last name is required."
      });
    }

    if (args.role.trim().length === 0) {
      errors.push({
        field: "role",
        message: "Role is required."
      });
    } else if (repo.roleExists(args.role)) {
      errors.push({
        field: "role",
        message: "Role occupied."
      });
    }

    if (errors.length > 0) {
      return { ok: false, errors };
    }

    var record: Role = {
      firstName: args.firstName.trim(),
      lastName: args.lastName.trim(),
      role: args.role.trim()
    };

    var updatedRoles = repo.createRoleEntry(record);

    return {
      ok: true,
      roles: updatedRoles
    };
  }

  return {
    getRoles,
    createOrgEntry
  };
}