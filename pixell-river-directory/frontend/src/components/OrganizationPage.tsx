import { useEffect, useState } from "react";
import AddOrganizationForm from "./AddOrganizationForm";
import {
  getRoles,
  createOrgEntry as createOrgEntryApi,
  type Role,
  type CreateOrgEntryResponse
} from "../apis/organizationApi";


export default function OrganizationPage() {

  var [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    async function loadRoles() {
      var loadedRoles = await getRoles();
      setRoles(loadedRoles);
    }

    loadRoles();
  }, []);

  async function createOrgEntry(
    first: string,
    last: string,
    role: string
  ): Promise<CreateOrgEntryResponse> {
    var result = await createOrgEntryApi({
      firstName: first,
      lastName: last,
      role: role
    });

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