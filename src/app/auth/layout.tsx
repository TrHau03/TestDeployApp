"use client"
import { ThemeProvider } from "@/core/context/ThemeContext";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="relative bg-white  dark:bg-gray-900 ">
      <ThemeProvider>
          {children}
      </ThemeProvider>
    </div>
  );
}
