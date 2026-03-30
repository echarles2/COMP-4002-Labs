import { Request, Response } from "express";
import { organizationRepository } from "../repositories/organizationRepository";
import { organizationService } from "../services/organizationService";

var repo = organizationRepository();
var service = organizationService(repo);

export function getRoles(_req: Request, res: Response) {
  var roles = service.getRoles();
  res.json(roles);
}

export function createOrgEntry(req: Request, res: Response) {
  var { firstName, lastName, role } = req.body;

  var result = service.createOrgEntry({
    firstName: firstName ?? "",
    lastName: lastName ?? "",
    role: role ?? ""
  });

  if (!result.ok) {
    res.status(400).json(result);
    return;
  }

  res.status(201).json(result);
}