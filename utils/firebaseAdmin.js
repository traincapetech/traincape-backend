import admin from "firebase-admin";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

let isInitialized = false;

try {
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT;
    console.log("DEBUG: Current Working Directory:", process.cwd());
    console.log("DEBUG: FIREBASE_SERVICE_ACCOUNT env var:", serviceAccountPath);

    if (serviceAccountPath && fs.existsSync(serviceAccountPath)) {
        console.log("DEBUG: File exists at path:", serviceAccountPath);
        const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });

        isInitialized = true;
        console.log("✅ Firebase Admin SDK initialized successfully");
    } else {
        console.warn("⚠️ FIREBASE_SERVICE_ACCOUNT path not set or file not found. Push notifications will not work.");
    }
} catch (error) {
    console.error("❌ Error initializing Firebase Admin SDK:", error);
}

export const sendNotification = async (token, title, body, data = {}) => {
    if (!isInitialized) {
        console.warn("Skipping notification: Firebase Admin not initialized");
        return;
    }

    try {
        const message = {
            notification: {
                title,
                body,
            },
            data,
            token,
        };

        const response = await admin.messaging().send(message);
        console.log("Successfully sent message:", response);
        return response;
    } catch (error) {
        console.error("Error sending message:", error);
    }
};

export const sendMulticastNotification = async (tokens, title, body, data = {}) => {
    if (!isInitialized || !tokens || tokens.length === 0) {
        if (!isInitialized) console.warn("Skipping notification: Firebase Admin not initialized");
        return;
    }

    try {
        const message = {
            notification: {
                title,
                body,
            },
            data,
            tokens,
        };

        const response = await admin.messaging().sendEachForMulticast(message);
        console.log(response.successCount + ' messages were sent successfully');

        if (response.failureCount > 0) {
            const failedTokens = [];
            response.responses.forEach((resp, idx) => {
                if (!resp.success) {
                    failedTokens.push(tokens[idx]);
                }
            });
            console.log('List of tokens that caused failures: ' + failedTokens);
        }

        return response;
    } catch (error) {
        console.error("Error sending multicast message:", error);
    }
};

export default admin;
