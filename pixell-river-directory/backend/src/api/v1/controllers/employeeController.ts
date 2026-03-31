import { Request, Response } from "express";
import { employeeRepository } from "../repositories/employeeRepository";
import { employeeService } from "../services/employeeService";

var repo = employeeRepository();
var service = employeeService(repo);

export async function getDepartments(_req: Request, res: Response) {
  var departments = await service.getDepartments();
  res.json(departments);
}

export async function createEmployee(req: Request, res: Response) {
  var result = await service.createEmployee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    departmentName: req.body.departmentName
  });

  if (!result.ok) {
    return res.status(400).json(result);
  }

  return res.json(result);
}