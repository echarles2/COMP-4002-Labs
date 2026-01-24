import type { Department } from "../types";

type DirectoryProps = {
  departments: Department[];
};


export default function Directory(props: DirectoryProps) {
  return (
    <main id="directory" className="directory">
      {props.departments.map((department) => (
        <section className="department-card" key={department.name}>
          <h2>{department.name}</h2>

          <ul>
            {department.employees.map((employee, index) => (
              <li key={department.name + "-" + index}>
                {employee.firstName} {employee.lastName}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}