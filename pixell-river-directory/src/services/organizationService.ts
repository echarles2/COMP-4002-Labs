import type { Role } from "../types";
import type { organizationRepo } from "../repository/organizationRepo";

export type OrgFieldError = {
    field: "firstName" | "lastName" | "role";
    message: string;
};

export type CreateOrgResult =
    | { ok: true; roles: Role[] }
    | { ok: false; errors: OrgFieldError[] };

type CreateOrgArgs = {
    firstName: string;
    lastName: string;
    role: string;
};

export function organizationService(repo: ReturnType<typeof organizationRepo>) {
    function createOrgEntry(args: CreateOrgArgs): CreateOrgResult {
        var errors: OrgFieldError[] = [];

        if (args.firstName.trim().length < 3) {
            errors.push({ field: "firstName", message: "First name must be at least 3 characters." });
        }

        if (args.lastName.trim().length === 0) {
            errors.push({ field: "lastName", message: "Last name is required." });
        }

        if (args.role.trim().length === 0) {
            errors.push({ field: "role", message: "Role is required." });
        } else if (repo.roleExists(args.role)) {
            errors.push({ field: "role", message: "Role occupied." });
        }

        if (errors.length > 0) {
            return { ok: false, errors: errors };
        }

        var record: Role = {
            firstName: args.firstName.trim(),
            lastName: args.lastName.trim(),
            role: args.role.trim()
        };

        var updated = repo.createRoleEntry(record);
        return { ok: true, roles: updated };
    }

    return { createOrgEntry };
}