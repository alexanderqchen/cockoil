import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "../firebase-creds.json";

const app = initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});
export const auth = getAuth(app);
