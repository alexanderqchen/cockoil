"use client";

import { useState } from "react";
import { auth } from "@/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  createUserAction,
  setAuthCookies,
  navigateToProfile,
} from "@/app/actions";
import LoadingCircle from "./LoadingCircle";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

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

      navigateToProfile();
    } catch (error) {
      console.log(error);
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

      navigateToProfile();
    } catch (error) {
      console.log(error);
    }
    setLoginLoading(false);
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
        disabled={createLoading || loginLoading}
        className="block bg-[#432529] w-full rounded-md mb-4"
      >
        {createLoading && <LoadingCircle />}
        Create Account
      </button>
      <button
        onClick={() => handleLogin(email, password)}
        disabled={createLoading || loginLoading}
        className="block border-2 border-[#432529] w-full rounded-md"
      >
        {loginLoading && <LoadingCircle />}
        Login
      </button>
    </div>
  );
};

export default Login;
