import InternModel from "../model/intern.model.js";

// Add Intern
export const addIntern = async (req, res) => {
    try {
        const { fullName, college, degree, techStack } = req.body;

        if (!fullName || !degree || !techStack) {
            return res.status(400).json({ success: false, message: "Full Name, Degree, and Tech Stack are required" });
        }

        const internData = { fullName, college, degree, techStack };

        if (req.files && req.files.photo && req.files.photo.length > 0) {
            const file = req.files.photo[0];
            internData.photo = {
                data: file.buffer,
                contentType: file.mimetype,
                filename: file.originalname,
                size: file.size,
            };
        }

        const newIntern = new InternModel(internData);
        await newIntern.save();

        res.status(201).json({ success: true, message: "Intern added successfully", intern: newIntern });
    } catch (error) {
        console.error("Error adding intern:", error);
        res.status(500).json({ success: false, message: "Failed to add intern", error: error.message });
    }
};

// Get All Interns (without large photo data, just photo info)
export const getInterns = async (req, res) => {
    try {
        const interns = await InternModel.find({}).sort({ createdAt: -1 }).select("-photo.data -__v");
        res.status(200).json({ success: true, count: interns.length, interns });
    } catch (error) {
        console.error("Error fetching interns:", error);
        res.status(500).json({ success: false, message: "Failed to fetch interns", error: error.message });
    }
};

// Get Intern Photo
export const getInternPhoto = async (req, res) => {
    try {
        const { id } = req.params;
        const intern = await InternModel.findById(id).select("photo");

        if (!intern || !intern.photo || !intern.photo.data) {
            return res.status(404).json({ success: false, message: "Photo not found" });
        }

        res.set("Content-Type", intern.photo.contentType);
        res.send(intern.photo.data);
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch photo" });
    }
};

// Update Intern
export const updateIntern = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        if (req.files && req.files.photo && req.files.photo.length > 0) {
            const file = req.files.photo[0];
            updateData.photo = {
                data: file.buffer,
                contentType: file.mimetype,
                filename: file.originalname,
                size: file.size,
            };
        }

        const updatedIntern = await InternModel.findByIdAndUpdate(id, updateData, { new: true }).select("-photo.data");

        if (!updatedIntern) {
            return res.status(404).json({ success: false, message: "Intern not found" });
        }

        res.status(200).json({ success: true, message: "Intern updated successfully", intern: updatedIntern });
    } catch (error) {
        console.error("Error updating intern:", error);
        res.status(500).json({ success: false, message: "Failed to update intern", error: error.message });
    }
};

// Delete Intern
export const deleteIntern = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedIntern = await InternModel.findByIdAndDelete(id);

        if (!deletedIntern) {
            return res.status(404).json({ success: false, message: "Intern not found" });
        }

        res.status(200).json({ success: true, message: "Intern deleted successfully" });
    } catch (error) {
        console.error("Error deleting intern:", error);
        res.status(500).json({ success: false, message: "Failed to delete intern", error: error.message });
    }
};
