"use client";

import { useState } from "react";
import { auth } from "@/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccount = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;
      const idToken = await user.getIdToken();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;
      const idToken = await user.getIdToken();
    } catch (error) {
      console.log(error);
    }
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
        className="block bg-[#432529] w-full rounded-md mb-4"
      >
        Create Account
      </button>
      <button
        onClick={() => handleLogin(email, password)}
        className="block border-2 border-[#432529] w-full rounded-md"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
