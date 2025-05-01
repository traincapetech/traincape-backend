import express from "express";

import {
  addEmployee,
  getEmployees,
  deleteEmployee,
  getDatabyEmployeeId,
  updateEmployee,
} from "../controllers/employee.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const employeeRouter = express.Router();
// Create uploads directory if it doesn't exist

// Route definitions
employeeRouter.get("/getEmployees", getEmployees);

employeeRouter.post(
  "/addEmployee",
  upload.any(),
  addEmployee
);

employeeRouter.delete("/deleteEmployee/:employeeId", deleteEmployee);
employeeRouter.put("/updateEmployee/:employeeId", updateEmployee);
employeeRouter.get("/getEmployee/:employeeId", getDatabyEmployeeId);

export { employeeRouter };