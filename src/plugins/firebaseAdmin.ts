import admin from "firebase-admin";

const serviceAccount: admin.ServiceAccount = {
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  privateKey: (process.env.FB_ADMIN_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
  clientEmail: process.env.FB_ADMIN_CLIENT_EMAIL,
};

/**
 * @description Firebase Admin SDK
 * @note Backend Only (Can't use frontend)
 */
export const firebaseAdmin =
  admin.apps[0] ||
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
