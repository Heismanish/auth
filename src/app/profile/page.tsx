"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState("");

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setUserData(res.data.data._id);
    console.log(userData);
  };

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div>
        <Toaster />
      </div>
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2 className="p-1 rounded bg-green-500">
        {userData && <Link href={`/profile/${userData}`}>{userData}</Link>}
      </h2>
      <button
        onClick={logout}
        className="p-2 mt-4 rounded-md border border-gray-400 "
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="p-2 mt-4 border rounded-md border-gray-50 bg-green-500 "
      >
        Get User Details
      </button>
    </div>
  );
}

export default ProfilePage;
