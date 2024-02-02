"use client";

import { useEffect, useState } from "react";
import {
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "@/auth";
import { setAuthCookies, navigateToOrders } from "@/app/actions";
import LoadingCircle from "@/components/LoadingCircle";

const provider = new GoogleAuthProvider();

const Login = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("in useeffect");

    const checkAuthRedirect = async (authStateUser: User) => {
      setLoading(true);

      console.log("in check auth redirect");
      console.log("authStateUser", authStateUser);
      try {
        const result = await getRedirectResult(auth);

        console.log(result);

        if (result) {
          const firebaseUser = result.user;
          const idToken = await firebaseUser.getIdToken();
          console.log("setting cookies");
          await setAuthCookies(firebaseUser.uid, idToken);
          console.log("redirecting");
          navigateToOrders();
        } else {
          console.log("no redirect results");
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    onAuthStateChanged(auth, checkAuthRedirect);
  }, []);

  const handleLogin = async () => {
    try {
      console.log("signing in...");
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
