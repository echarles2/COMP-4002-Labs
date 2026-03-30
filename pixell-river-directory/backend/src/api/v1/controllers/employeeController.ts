import { Request, Response } from "express";
import { employeeRepository } from "../repositories/employeeRepository";
import { employeeService } from "../services/employeeService";

var repo = employeeRepository();
var service = employeeService(repo);

export function getDepartments(_req: Request, res: Response) {
  var departments = service.getDepartments();
  res.json(departments);
}

export function createEmployee(req: Request, res: Response) {
  var { firstName, lastName, departmentName } = req.body;

  var result = service.createEmployee({
    firstName: firstName ?? "",
    lastName: lastName ?? "",
    departmentName: departmentName ?? ""
  });

  if (!result.ok) {
    res.status(400).json(result);
    return;
  }

  res.status(201).json(result);
}