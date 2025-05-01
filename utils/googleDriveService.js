// utils/googleDriveService.js
import fs from "fs";
import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  keyFile: "path/to/your-service-account.json", // Replace with your actual file
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

export async function uploadToDrive(file, folderId) {
  const fileMetadata = {
    name: file.originalname,
    parents: [folderId],
  };

  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };

  const uploaded = await drive.files.create({
    requestBody: fileMetadata,
    media,
    fields: "id",
  });

  await drive.permissions.create({
    fileId: uploaded.data.id,
    requestBody: { role: "reader", type: "anyone" },
  });

  return `https://drive.google.com/uc?id=${uploaded.data.id}`;
}