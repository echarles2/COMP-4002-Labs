import orgData from "../data/organization.json";
import type { Role } from "../types";

export default function OrganizationPage() {
  var roles = orgData as Role[];

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
    </main>
  );
}
