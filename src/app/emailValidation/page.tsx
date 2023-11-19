"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function EmailValidation() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const validateEmail = async () => {
    try {
      const response = await axios.post("/api/users/validateUser", { email });
      console.log(response.data);
      if (response.data.success) {
        console.log("suceesfully validated");
        // router.push("/newPassword");
      } else {
        setError("Error occuerd while validating user email");
      }
    } catch (error: any) {
      console.log("Error:", error.message);
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl ">Enter your Email</h1>
      <input
        type="email"
        placeholder="example@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="text-black"
      />
      {email}
      <button onClick={validateEmail}>Validate</button>
      {error && <div>{error}</div>}
    </div>
  );
}

export default EmailValidation;
