"use client";

import { useEffect, useState } from "react";
import {
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/auth";
import { setAuthCookies, navigateToOrders } from "@/app/actions";
import LoadingCircle from "@/components/LoadingCircle";

const provider = new GoogleAuthProvider();

const Login = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);

        if (result) {
          const firebaseUser = result.user;
          const idToken = await firebaseUser.getIdToken();

          await setAuthCookies(firebaseUser.uid, idToken);

          navigateToOrders();
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkAuthRedirect();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <LoadingCircle />;
  }

  return (
    <button
      onClick={() => handleLogin()}
      className="border-2 py-2 px-4 rounded-lg"
    >
      Login
    </button>
  );
};

export default Login;
