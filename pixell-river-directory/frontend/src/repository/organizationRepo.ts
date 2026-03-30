import type { Role } from "../types";
import type { CreateOrgResult } from "../services/organizationService";

var API_URL = "http://localhost:3000";

export function organizationRepo() {
  async function getRoles(): Promise<Role[]> {
    var response = await fetch(`${API_URL}/organization`);
    var data = await response.json();
    return data;
  }

  async function createOrgEntry(
    firstName: string,
    lastName: string,
    role: string
  ): Promise<CreateOrgResult> {
    var response = await fetch(`${API_URL}/organization`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName,
        lastName,
        role
      })
    });

    var result = await response.json();
    return result;
  }

  return {
    getRoles,
    createOrgEntry
  };
}
