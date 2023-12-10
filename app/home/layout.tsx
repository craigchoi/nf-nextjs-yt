import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";
import { authOptions } from "../utils/auth";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";

export default async function layout({ children }: { children: ReactNode }) {
  const sesstion = await getServerSession(authOptions);
  if (!sesstion) {
    return redirect("/login");
  }
  return (
    <>
      <Navbar />
      <main className="w-full max-w-7xl mx-auto lg:px-8 sm:px-6">
        {children}
      </main>
    </>
  );
}
