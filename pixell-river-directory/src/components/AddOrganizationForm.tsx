import { useFormInput } from "../hooks/useFormInput";
import type { CreateOrgResult } from "../services/organizationService";

type AddOrganizationFormProps = {
    onCreateOrgEntry: (first: string, last: string, role: string) => CreateOrgResult;
};

export default function AddOrganizationForm(props: AddOrganizationFormProps) {
    var firstNameInput = useFormInput("");
    var lastNameInput = useFormInput("");
    var roleInput = useFormInput("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

    firstNameInput.clearMessages();
    lastNameInput.clearMessages();
    roleInput.clearMessages();

    var result = props.onCreateOrgEntry(
        firstNameInput.value,
        lastNameInput.value,
        roleInput.value
    );

    if (!result.ok) {
        result.errors.forEach((err) => {
        if (err.field === "firstName") {
            firstNameInput.setMessages(firstNameInput.messages.concat(err.message));
        }
        if (err.field === "lastName") {
            lastNameInput.setMessages(lastNameInput.messages.concat(err.message));
        }
        if (err.field === "role") {
            roleInput.setMessages(roleInput.messages.concat(err.message));
        }
        });
        return;
    }

        firstNameInput.setValue("");
        lastNameInput.setValue("");
        roleInput.setValue("");
    }

    return (
        <section className="add-employee">
            <h2>Add Organization Entry</h2>

        <form onSubmit={handleSubmit}>
        <label>
            First name
            <input
            placeholder="First name"
            value={firstNameInput.value}
            onChange={firstNameInput.onChange}
        />
        {firstNameInput.messages.map((m) => (
            <p className="form-error" key={m}>{m}</p>
        ))}
        </label>

        <label>
        Last name
        <input
            placeholder="Last name"
            value={lastNameInput.value}
            onChange={lastNameInput.onChange}
        />
        {lastNameInput.messages.map((m) => (
            <p className="form-error" key={m}>{m}</p>
        ))}
        </label>

        <label>
        Role
        <input
            placeholder="Role"
            value={roleInput.value}
            onChange={roleInput.onChange}
        />
        {roleInput.messages.map((m) => (
            <p className="form-error" key={m}>{m}</p>
        ))}
        </label>

        <button>Add</button>
    </form>
    </section>
);
}