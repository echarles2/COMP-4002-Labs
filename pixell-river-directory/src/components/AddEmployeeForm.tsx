import { useState } from "react";
import type { Department } from "../types";

type AddEmployeeFormProps = {
  departments: Department[];
  onAddEmployee: (first: string, last: string, dept: string) => void;
};

export default function AddEmployeeForm(props: AddEmployeeFormProps) {
  var [firstName, setFirstName] = useState("");
  var [lastName, setLastName] = useState("");
  var [departmentName, setDepartmentName] = useState(props.departments[0].name);
  var [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (firstName.trim().length < 3) {
      setError("First name must be at least 3 characters.");
      return;
    }
    
    props.onAddEmployee(
      firstName.trim(),
      lastName.trim(),
      departmentName
    );

    setFirstName("");
    setLastName("");
  }

  return (
    <section className="add-employee">
      <h2>Add Employee</h2>

      {error && <p className="form-error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          placeholder="Last name (optional)"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <select
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
        >
          {props.departments.map((d) => (
            <option key={d.name} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>

        <button>Add</button>
      </form>
    </section>
  );
}
