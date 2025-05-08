// question.controller.js
import EmployeeModel from "../model/employee.model.js";

export const addEmployee = async (req, res) => {
  try {
    const {
      email,
      fullName,
      phoneNumber,
      whatsappNumber,
      linkedinUrl,
      currentAddress,
      permanentAddress,
      collegeName,
      role,
      joiningDate,
      department,
      status,
      internshipDuration,
    } = req.body;

    // Validate required fields
    if (!fullName || !email) {
      return res.status(400).json({
        success: false,
        message: "Full name and email are required fields",
      });
    }

    // Process uploaded files (from upload.any())
    const fileData = {};
    if (req.files && typeof req.files === "object") {
      for (const [fieldname, fileArray] of Object.entries(req.files)) {
        const file = fileArray[0]; // Only take the first file per field
        if (file && file.buffer) {
          fileData[fieldname] = {
            data: file.buffer,
            contentType: file.mimetype,
            filename: file.originalname,
            size: file.size,
          };
          console.log(`✅ Processed file for field: ${fieldname}`);
        } else {
          console.warn(`⚠️ Skipping ${fieldname}, no valid buffer`);
        }
      }
    } else {
      console.log("No files found in request");
    }

    // Create employee document
    const employeeData = {
      fullName,
      email,
      phoneNumber: phoneNumber || "",
      whatsappNumber: whatsappNumber || "",
      linkedinUrl: linkedinUrl || "",
      currentAddress: currentAddress || "",
      permanentAddress: permanentAddress || "",
      collegeName: collegeName || "",
      role: role || "Intern",
      joiningDate: joiningDate || new Date().toISOString(),
      department: department || "",
      status: status || "Active",
      internshipDuration: internshipDuration || "",
    };

    // Attach file data to corresponding fields
    for (const field in fileData) {
      employeeData[field] = fileData[field];
    }

    // Save to DB
    const newEmployee = new EmployeeModel(employeeData);
    const savedEmployee = await newEmployee.save();

    console.log("✅ Employee saved with ID:", savedEmployee._id);

    res.status(201).json({
      success: true,
      message: "Employee added successfully",
      data: {
        _id: savedEmployee._id,
        fullName: savedEmployee.fullName,
        email: savedEmployee.email,
        role: savedEmployee.role,
        department: savedEmployee.department,
        status: savedEmployee.status,
        uploadedFiles: Object.keys(fileData).map((key) => ({
          fieldname: key,
          filename: fileData[key].filename,
          contentType: fileData[key].contentType,
          size: fileData[key].size,
        })),
      },
    });
  } catch (error) {
    console.error("❌ Error adding employee:", error);
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
    const { id } = req.params;

    const employee = await EmployeeModel.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Convert Mongoose document to plain object
    const responseData = employee.toObject();

    // Define which fields are files
    const fileFields = [
      "photo",
      "tenthMarksheet",
      "twelfthMarksheet",
      "bachelorsCertificate",
      "pgCertificate",
      "aadharCard",
      "panCard",
      "policeClearance",
      "resume",
      "offerLetter",
    ];

    const files = {};
    fileFields.forEach((field) => {
      if (employee[field]) {
        files[field] = {
          filename: employee[field].filename,
          contentType: employee[field].contentType,
          size: employee[field].size,
          data: employee[field].data?.toString("base64"), // encode binary as base64
        };
      }
    });

    // Add file data to response
    responseData.files = files;

    res.status(200).json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch employee details",
      error: error.message,
    });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    let employeeData = { ...req.body };
    const { employeeId } = req.params;

    // Remove fields that shouldn't be updated
    delete employeeData._id;
    delete employeeData.createdAt;
    delete employeeData.updatedAt;

    // Only process and update file fields if they are sent
    const updatedFileFields = {};

    if (req.files && typeof req.files === "object") {
      for (const [fieldname, fileArray] of Object.entries(req.files)) {
        const file = fileArray[0]; // Only take the first file per field
        if (file && file.buffer) {
          updatedFileFields[fieldname] = {
            data: file.buffer,
            contentType: file.mimetype,
            filename: file.originalname,
            size: file.size,
          };
          console.log(`✅ Updated file for field: ${fieldname}`);
        } else {
          console.warn(`⚠️ Skipping ${fieldname}, no valid buffer`);
        }
      }
    } else {
      console.log("No files found in request");
    }

    // Merge file updates into employeeData
    Object.assign(employeeData, updatedFileFields);

    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      employeeId,
      { $set: employeeData },
      { new: true }
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
      data: {
        _id: updatedEmployee._id,
        fullName: updatedEmployee.fullName,
        email: updatedEmployee.email,
        role: updatedEmployee.role,
        department: updatedEmployee.department,
        status: updatedEmployee.status,
        updatedFiles: Object.keys(updatedFileFields).map((key) => ({
          fieldname: key,
          filename: updatedFileFields[key].filename,
          contentType: updatedFileFields[key].contentType,
          size: updatedFileFields[key].size,
        })),
      },
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

// // NEW ENDPOINT: Update employee files
// export const updateEmployeeFiles = async (req, res) => {
//   console.log("REQUESTED FILES IS--->", req.files);
//   const { employeeId } = req.params;

//   try {
//     const employee = await EmployeeModel.findById(employeeId);

//     if (!employee) {
//       return res.status(404).json({
//         success: false,
//         message: "Employee not found",
//       });
//     }

//     // Process uploaded files and prepare update data
//     const updateData = {};

//     if (req.files && Array.isArray(req.files) && req.files.length > 0) {
//       console.log(`Processing ${req.files.length} files for update`);

//       // Process each file in the array
//       for (const file of req.files) {
//         const fieldname = file.fieldname;
//         console.log(
//           `Processing file for ${fieldname}: ${file.originalname} (${file.size} bytes)`
//         );

//         try {
//           // Prepare file data for MongoDB update
//           updateData[fieldname] = {
//             data: file.buffer,
//             contentType: file.mimetype,
//             filename: file.originalname,
//             size: file.size,
//           };

//           console.log(`✅ Successfully processed ${fieldname} for update`);
//         } catch (error) {
//           console.error(`Failed to process ${fieldname} file:`, error);
//         }
//       }

//       // Update employee with new files
//       const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
//         employeeId,
//         { $set: updateData },
//         { new: true }
//       );

//       return res.status(200).json({
//         success: true,
//         message: "Employee files updated successfully",
//         updatedFiles: Object.keys(updateData),
//       });
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "No files provided for update",
//       });
//     }
//   } catch (err) {
//     console.error("Error updating employee files:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Error updating employee files",
//       error: err.message,
//     });
//   }
// };