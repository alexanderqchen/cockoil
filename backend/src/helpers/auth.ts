import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "../firebase-creds.json";
import { RequestHandler } from "express";

const app = initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

export const auth = getAuth(app);

export const isAdminUser = (userId: string) => {
  const adminWhitelist = ["uROkkEChdQXVBmzDKx6aApKRwZS2"];
  return adminWhitelist.includes(userId);
};

export const checkAuthorization: RequestHandler = async (req, res, next) => {
  const idToken = req.headers.authorization || "";

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    const { uid } = decodedToken;

    if (uid) {
      res.locals.userId = uid;
      return next();
    } else {
      return res.status(401).json("Unauthorized");
    }
  } catch (error: any) {
    console.log(error);
    if (error?.errorInfo?.code === "auth/id-token-expired") {
      return res.status(401).json({
        error: {
          authError: "Session has expired, please login again.",
        },
      });
    }

    return res.status(401).json("Unauthorized");
  }
};

export const checkAdminAuthorization: RequestHandler = async (
  req,
  res,
  next
) => {
  if (isAdminUser(res.locals.userId)) {
    return next();
  } else {
    return res.status(401).json("Unauthorized");
  }
};
