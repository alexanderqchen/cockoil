import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccountProd from "../firebase-creds.json";
import serviceAccountDev from "../firebase-creds-dev.json";
import { RequestHandler } from "express";

const serviceAccount = (
  process.env.ENV === "PROD" ? serviceAccountProd : serviceAccountDev
) as ServiceAccount;

const app = initializeApp({
  credential: cert(serviceAccount),
});

export const auth = getAuth(app);

export const isAdminUser = (userId: string) => {
  const adminWhitelist = [
    "LfuMBDFrx1QLa63lN7lfKE7JPHs1", // alexander.qili.chen@gmail.com (dev)
    "vBrZEO0kUZYJIQTxTy1GPLBjTS42", // alexander.qili.chen@gmail.com (prod)
    "6jZKQPDAg2SlKLtmQwdC1lgsZcf1", // gorski24@gmail.com (prod)
  ];
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
    console.log("idToken", idToken);

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
