"use client";

import { useState } from "react";
import { auth } from "@/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  createUserAction,
  setAuthCookies,
  navigateToProfile,
} from "@/app/actions";
import GoogleLogo from "./GoogleLogo";
import LoadingCircle from "./LoadingCircle";
import Toast from "./Toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [googleSignInLoading, setGoogleSignInLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleCreateAccount = async (email: string, password: string) => {
    setCreateLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user: firebaseUser } = userCredential;
      const idToken = await firebaseUser.getIdToken();
      await createUserAction(firebaseUser.uid, email);
      await setAuthCookies(firebaseUser.uid, idToken);

      await navigateToProfile();
    } catch (error: any) {
      console.log(error);
      if (error?.code === "auth/missing-password") {
        setToastVisible(true);
        setToastMessage("Password is required");
      } else if (error?.code === "auth/invalid-email") {
        setToastVisible(true);
        setToastMessage("Invalid email");
      } else if (error?.code === "auth/weak-password") {
        setToastVisible(true);
        setToastMessage("Password must be at least 6 characters");
      } else if (error?.code === "auth/email-already-in-use") {
        setToastVisible(true);
        setToastMessage("Email already in use");
      }

      setTimeout(() => {
        setToastVisible(false);
        setToastMessage("");
      }, 2000);
    }
    setCreateLoading(false);
  };

  const handleLogin = async (email: string, password: string) => {
    setLoginLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user: firebaseUser } = userCredential;
      const idToken = await firebaseUser.getIdToken();
      await setAuthCookies(firebaseUser.uid, idToken);

      await navigateToProfile();
    } catch (error: any) {
      console.log(error);
      if (error?.code === "auth/invalid-credential") {
        setToastVisible(true);
        setToastMessage("Password is incorrect");
      } else if (error?.code === "auth/missing-password") {
        setToastVisible(true);
        setToastMessage("Password is required");
      } else if (error?.code === "auth/invalid-email") {
        setToastVisible(true);
        setToastMessage("Invalid email");
      } else {
        setToastVisible(true);
        setToastMessage("An error occurred");
      }

      setTimeout(() => {
        setToastVisible(false);
        setToastMessage("");
      }, 2000);
    }
    setLoginLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setGoogleSignInLoading(true);

    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());

      if (result) {
        const firebaseUser = result.user;
        const idToken = await firebaseUser.getIdToken();

        console.log("result", result);

        await createUserAction(firebaseUser.uid, firebaseUser.email || "");

        await setAuthCookies(firebaseUser.uid, idToken);
        await navigateToProfile();
      }
    } catch (error) {
      console.log(error);

      setToastVisible(true);
      setToastMessage("An error occurred");

      setTimeout(() => {
        setToastVisible(false);
        setToastMessage("");
      }, 2000);
    }

    setGoogleSignInLoading(false);
  };

  return (
    <div className="text-xl leading-10">
      <label>Email</label>
      <input
        className="w-full bg-[#28282F] rounded-md px-4 mb-2"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password</label>
      <input
        className="w-full bg-[#28282F] rounded-md px-4 mb-8"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={() => handleCreateAccount(email, password)}
        disabled={createLoading || loginLoading || googleSignInLoading}
        className="block bg-[#432529] w-full rounded-md mb-4"
      >
        {createLoading && <LoadingCircle />}
        Create Account
      </button>
      <button
        onClick={() => handleLogin(email, password)}
        disabled={createLoading || loginLoading || googleSignInLoading}
        className="block border-2 border-[#432529] w-full rounded-md mb-4"
      >
        {loginLoading && <LoadingCircle />}
        Login
      </button>
      <button
        onClick={() => handleGoogleSignIn()}
        disabled={createLoading || loginLoading || googleSignInLoading}
        className="block bg-white w-full rounded-md text-black flex items-center justify-center gap-2"
      >
        {googleSignInLoading && <LoadingCircle />}
        <GoogleLogo /> Sign In with Google
      </button>
      <Toast visible={toastVisible}>{toastMessage}</Toast>
    </div>
  );
};

export default Login;
