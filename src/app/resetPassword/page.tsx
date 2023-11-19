"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function NewPassword() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const resetPassword = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      console.log("arqfe");

      const response = await axios.post("/api/users/resetPassword", {
        password,
        token,
      });
      console.log("arqfe");
      console.log(response.data.message);
      router.push("/login");
    } catch (error) {
      setError("An error occurred while resetting the password.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl mb-4">Forgot Password</h1>

      <div className="flex flex-col items-center">
        <label htmlFor="password">New Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-black"
        />
        <button onClick={resetPassword} type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </div>

      {error && <h1 className="text-red-500">{error}</h1>}
    </div>
  );
}

export default NewPassword;
