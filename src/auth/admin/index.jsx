import Logo from "@/components/logo";
import { SignIn } from "@clerk/clerk-react";
import React from "react";
import { CircleUser } from "lucide-react";
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <div className="flex flex-col justify-center items-center h-dvh ">
    <div className="my-2 text-2xl ">
      <Logo />
    </div>
    <div className="mb-2">
      <h1 className="flex gap-2 text-sm font-thin items-center">
        Login to client
        <Link to={'/auth/sign-in'}>
          <CircleUser className="cursor-pointer" />
        </Link>
      </h1>
    </div>
    <SignIn />
  </div>
  );
};

export default Admin;
