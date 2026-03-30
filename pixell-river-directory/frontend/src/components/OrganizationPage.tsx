import { useEffect, useState } from "react";
import type { Role } from "../types";

import { organizationRepo } from "../repository/organizationRepo";
import { organizationService, type CreateOrgResult } from "../services/organizationService";
import AddOrganizationForm from "./AddOrganizationForm";

export default function OrganizationPage() {
  var repo = organizationRepo();
  var service = organizationService(repo);

  var [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    async function loadRoles() {
      var loadedRoles = await service.getRoles();
      setRoles(loadedRoles);
    }

    loadRoles();
  }, []);

  async function createOrgEntry(
    first: string,
    last: string,
    role: string
  ): Promise<CreateOrgResult> {
    var result = await service.createOrgEntry(first, last, role);

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