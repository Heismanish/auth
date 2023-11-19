import React from "react";

function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page </p>
      <span className="p-2 rounded-md bg-orange-400 text-black ml-2">
        {params.id}
      </span>
    </div>
  );
}

export default UserProfile;
