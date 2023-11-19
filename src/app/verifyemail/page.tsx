"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const repsonse = await axios.post("/api/users/verifyEmail/", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
    console.log(urlToken);
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl">Verify Email</h1>{" "}
      <h2 className="p-2 bg-orange-500 text-white">
        {token ? `${token}` : "no token"}
      </h2>
      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </div>
      )}
      {error && <div className="text-2xl">Error</div>}
    </div>
  );
}

export default VerifyEmailPage;
