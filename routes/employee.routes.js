import express from "express";

import {
  addEmployee,
  getEmployees,
  deleteEmployee,
  getDatabyEmployeeId,
  updateEmployee,
  // getEmployeeFile,
  // updateEmployeeFiles,
} from "../controllers/employee.controller.js";

import { upload } from "../middleware/multer.middleware.js";

const employeeRouter = express.Router();
// Create uploads directory if it doesn't exist

// Route definitions
employeeRouter.get("/getEmployees", getEmployees);

employeeRouter.post(
  "/addEmployee",
  upload.fields([
    { name: "photo" },
    { name: "resume" },
    { name: "tenthMarksheet" },
    { name: "twelfthMarksheet" },
    { name: "bachelorsCertificate" },
    { name: "pgCertificate" },
    { name: "aadharCard" },
    { name: "panCard" },
    { name: "policeClearance" },
    { name: "offerLetter" },
  ]),
  addEmployee
);

employeeRouter.put(
  "/updateEmployee/:employeeId",
  upload.fields([
    { name: "photo" },
    { name: "resume" },
    { name: "tenthMarksheet" },
    { name: "twelfthMarksheet" },
    { name: "bachelorsCertificate" },
    { name: "pgCertificate" },
    { name: "aadharCard" },
    { name: "panCard" },
    { name: "policeClearance" },
    { name: "offerLetter" },
  ]),
  updateEmployee
);
employeeRouter.delete("/deleteEmployee/:employeeId", deleteEmployee);

employeeRouter.get("/getEmployee/:id", getDatabyEmployeeId);

export { employeeRouter };