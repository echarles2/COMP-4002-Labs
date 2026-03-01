import type { Role } from "../types";
import orgdata from "../data/organization.json";

function cloneRoles(roles: Role[]): Role[] {
    return roles.map((r) => {
        return { firstName: r.firstName, lastName: r.lastName, role: r.role };
    });
}

var storedRoles: Role[] = cloneRoles(orgdata as Role[]);

export function organizationRepo() {
    function getRoles(): Role[] {
        return cloneRoles(storedRoles);
    }

    function roleExists(rolename: string): boolean {
        return storedRoles.some((r) => r.role.toLowerCase() === rolename.trim().toLowerCase());
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
