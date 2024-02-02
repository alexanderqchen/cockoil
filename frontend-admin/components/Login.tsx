"use client";

import { useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/auth";
import { setAuthCookies, navigateToOrders } from "@/app/actions";
import LoadingCircle from "@/components/LoadingCircle";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());

      if (result) {
        console.log("signed in");
        const firebaseUser = result.user;
        console.log("getting idToken");
        const idToken = await firebaseUser.getIdToken();
        console.log("setting cookies");

        await setAuthCookies(firebaseUser.uid, idToken);
        console.log("redirecting");
        navigateToOrders();
      } else {
        setLoading(false);
      }
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
