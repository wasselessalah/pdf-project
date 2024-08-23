import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { userId } = auth();
        
  return (
    <nav className="flex bg-gray-400 justify-between items-center py-5">
      <div>
        <Link href={"/"}>Home</Link>
      </div>
      <div>
        <Link href={"/client"}>Client </Link>
      </div>

      {!userId ? (
        <div className="flex items-center gap-5 px-4">
          <Link href={"/sign-in"}>Login</Link>
          <Link href={"/sign-up"}>Sign up </Link>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-5 px-4">
            <Link href={"/profile"}>Porfile</Link>
            <ul>
              <UserButton />
            </ul>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
