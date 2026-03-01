import type { Department } from "../types";
import { useFormInput } from "../hooks/useFormInput";
import type { CreateEmployeeResult } from "../services/employeeService";

type AddEmployeeFormProps = {
  departments: Department[];
  onCreateEmployee: (first: string, last: string, dept: string) => CreateEmployeeResult;
};

export default function AddEmployeeForm(props: AddEmployeeFormProps) {
  var firstNameInput = useFormInput("");
  var lastNameInput = useFormInput("");
  var departmentInput = useFormInput(
    props.departments.length > 0 ? props.departments[0].name : ""
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    firstNameInput.clearMessages();
    lastNameInput.clearMessages();
    departmentInput.clearMessages();

    var result = props.onCreateEmployee(
      firstNameInput.value,
      lastNameInput.value,
      departmentInput.value
    )
    
    if (!result.ok) {
      result.errors.forEach((err) => {
        if (err.field === "firstName") {
          firstNameInput.setMessages([err.message]);
        }
        if (err.field === "department") {
          departmentInput.setMessages([err.message]);
        }
      });
    return;
    }

    firstNameInput.setValue("");
    lastNameInput.setValue("");
    firstNameInput.clearMessages();
    lastNameInput.clearMessages();

    if (props.departments.length > 0) {
      departmentInput.setValue(props.departments[0].name);
    }
  }

  return (
    <section className="add-employee">
      <h2>Add Employee</h2>

      {firstNameInput.messages.map((msg) => (
      <p className="form-error" key={msg}>{msg}</p>
      ))}
      
      <form onSubmit={handleSubmit}>
        <input
          placeholder="First name"
          value={firstNameInput.value}
          onChange={firstNameInput.onChange}
        />

        <input
          placeholder="Last name (optional)"
          value={lastNameInput.value}
          onChange={lastNameInput.onChange}
        />

        <select
          value={departmentInput.value}
          onChange={departmentInput.onChange}
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
