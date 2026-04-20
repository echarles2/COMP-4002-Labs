import { useEffect, useState } from "react";
import { Show, useAuth } from "@clerk/react";
import AddOrganizationForm from "./AddOrganizationForm";
import AuthNotice from "./AuthNotice";

import {
  getRoles,
  createOrgEntry as createOrgEntryApi,
  type Role,
  type CreateOrgEntryResponse
} from "../apis/organizationApi";

export default function OrganizationPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const { getToken } = useAuth();

  useEffect(() => {
    async function loadRoles() {
      const loadedRoles = await getRoles();
      setRoles(loadedRoles);
    }

    loadRoles();
  }, []);

  async function createOrgEntry(
    first: string,
    last: string,
    role: string
  ): Promise<CreateOrgEntryResponse> {
    const token = await getToken();

    const result = await createOrgEntryApi(
      {
        firstName: first,
        lastName: last,
        role: role
      },
      token
    );

    if (result.ok) {
      setRoles(result.roles);
    }

    return result;
  }

  return (
    <main className="org" aria-label="Organization leadership and management">
      <h2>Leadership and Management</h2>

      <ul className="org-list">
        {roles.map((r) => (
          <li className="org-row" key={r.firstName + "-" + r.lastName + "-" + r.role}>
            <span className="org-name">{r.firstName} {r.lastName}</span>
            <span className="org-role">{r.role}</span>
          </li>
        ))}
      </ul>

      <Show when="signed-in">
        <AddOrganizationForm onCreateOrgEntry={createOrgEntry} />
      </Show>

      <Show when="signed-out">
        <AuthNotice
          title="Add Organization Entry"
          message="You can view organization roles without logging in, but you must log in to create a new entry."
        />
      </Show>
    </main>
  );
}