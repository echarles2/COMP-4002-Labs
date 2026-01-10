function setCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (!yearElement) return;
    yearElement.textContent = String(new Date().getFullYear());
}

function buildEmployeeName(employee) {
  if (employee.lastName && employee.lastName.trim().length > 0) {
    return employee.firstName + " " + employee.lastName;
  }
  return employee.firstName;
}

function injectDirectory() {
  var main = document.getElementById("directory");
  if (!main) return;

  main.textContent = "";

  for (var i = 0; i < departments.length; i += 1) {
    var department = departments[i];

    var section = document.createElement("section");

    var heading = document.createElement("h2");
    heading.textContent = department.name;
    section.appendChild(heading);

    var list = document.createElement("ul");

    for (var j = 0; j < department.employees.length; j += 1) {
      var employee = department.employees[j];

      var item = document.createElement("li");
      item.textContent = buildEmployeeName(employee);
      list.appendChild(item);
    }

    section.appendChild(list);
    main.appendChild(section);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  setCurrentYear();
  injectDirectory();
});