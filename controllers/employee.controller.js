// question.controller.js
import EmployeeModel from "../model/employee.model.js";
import mongoose from "mongoose";
import { uploadToDrive } from "../utils/googleDriveService.js";

export const addEmployee = async (req, res) => {
  console.log("REQESTED BODY IS--->", req.body);
  console.log("REQESTED FILES  IS--->", req.files);
  try {
    const {
      offerLetter,
      resume,
      policeClearance,
      panCard,
      aadharCard,
      pgCertificate,
      bachelorsCertificate,
      twelfthMarksheet,
      tenthMarksheet,
      status,
      internshipDuration,
      fullName,
      email,
      phoneNumber,
      whatsappNumber,
      linkedinUrl,
      currentAddress,
      permanentAddress,
      photo,
      collegeName,
      role,
      joiningDate,
      department,
    } = req.body;

    // const driveFolderId = "YOUR_GOOGLE_DRIVE_FOLDER_ID"; // replace with your folder

    // const fileFields = [
    //   "photo",
    //   "tenthMarksheet",
    //   "twelfthMarksheet",
    //   "bachelorsCertificate",
    //   "pgCertificate",
    //   "aadharCard",
    //   "panCard",
    //   "policeClearance",
    //   "resume",
    //   "offerLetter",
    // ];

    // const fileUrls = {};

    // for (let field of fileFields) {
    //   if (req.files?.[field]?.[0]) {
    //     const file = req.files[field][0];
    //     const url = await uploadToDrive(file, driveFolderId);
    //     fileUrls[field] = url;

    //     // Optionally delete temp file after upload
    //     fs.unlinkSync(path.resolve(file.path));
    //   }
    // }
    // Create a new employee in the database
    const newEmployee = new EmployeeModel({
      offerLetter,
      resume,
      policeClearance,
      panCard,
      aadharCard,
      pgCertificate,
      bachelorsCertificate,
      twelfthMarksheet,
      tenthMarksheet,
      status,
      internshipDuration,
      fullName,
      email,
      phoneNumber,
      whatsappNumber,
      linkedinUrl,
      currentAddress,
      permanentAddress,
      photo,
      collegeName,
      role,
      joiningDate,
      department,
      // ...fileUrls,
    });

    // Save the employee to the database
    await newEmployee.save();

    res.status(201).json({
      success: true,
      message: "Employee added successfully",
      data: newEmployee,
    });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add employee",
      error: error.message,
    });
  }
};

export const getEmployees = async (req, res) => {
  try {
    // If using Mongoose with MongoDB
    const employees = await EmployeeModel.find({})
      .sort({ createdAt: -1 }) // Sort by newest first
      .select("-__v"); // Exclude the version field

    // Return the employees as JSON
    res.status(200).json({
      success: true,
      count: employees.length,
      employees,
    });
  } catch (error) {
    console.error("Error fetching Employees:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
export const getDatabyEmployeeId = async (req, res) => {
  try {
    const { employeeId } = req.params;
    console.log(employeeId);
    // If using Mongoose with MongoDB
    const employee = await EmployeeModel.findById(employeeId).select("-__v"); // Exclude the version field

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    console.error("Error fetching Employee:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteEmployee = async (req, res) => {
  const { employeeId } = req.params;

  try {
    console.log("Employee Id is-----:>", employeeId);

    // Find the employee and delete it
    const deletedEmployee = await EmployeeModel.findByIdAndDelete(employeeId);

    // Check if employee exists
    if (!deletedEmployee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found",
      });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
      data: deletedEmployee,
    });
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).json({
      success: false,
      error: "Error deleting employee",
      message: err.message,
    });
  }
};

export const updateEmployee = async (req, res) => {
  // console.log("REQESTED BODY IS--->", req.body);
  console.log("REQESTED PARAM IS--->", req.params);

  const { employeeId } = req.params;
  let employeeData = { ...req.body };

  // Remove fields that shouldn't be updated
  delete employeeData._id;
  delete employeeData.createdAt;
  delete employeeData.updatedAt;

  console.log("employee data after deleting is->", employeeData);
  try {
    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      employeeId, // ID to find
      { $set: employeeData }, // Fields to update
      { new: true } // Return the updated document
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
    });
  } catch (err) {
    console.error("Error updating employee:", err);
    return res.status(500).json({
      success: false,
      message: "Error updating employee",
      error: err.message,
    });
  }
};