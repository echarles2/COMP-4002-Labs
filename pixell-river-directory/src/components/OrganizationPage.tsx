import { useState } from "react";
import type { Role } from "../types";

import { organizationRepo } from "../repository/organizationRepo";
import { organizationService, type CreateOrgResult } from "../services/organizationService";
import AddOrganizationForm from "./AddOrganizationForm";

export default function OrganizationPage() {
    var repo = organizationRepo();
    var service = organizationService(repo);

    var [roles, setRoles] = useState<Role[]>(repo.getRoles());

    function createOrgEntry(first: string, last: string, role: string): CreateOrgResult {
        var result = service.createOrgEntry({ firstName: first, lastName: last, role: role });
        if (result.ok) {
            setRoles(result.roles);
        }

        return result;
    }

    return (
        <main className="org" aria-label="Organization leadership and management">
          <h2>Leadership and Mangagement</h2>

          <ul className="org-list">
            {roles.map((r) => (
              <li className="org-row" key={r.firstName + "-" + r.lastName + "-" + r.role}>
                <span className="org-name">{r.firstName} {r.lastName}</span>
                <span className="org-role">{r.role}</span>
              </li>
            ))}
          </ul>

          <AddOrganizationForm onCreateOrgEntry={createOrgEntry} />
        </main>
    );
  }