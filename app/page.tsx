"use client";
import { redirect } from "next/navigation";
import { useUserStore } from "@/lib/zustand";

export default function Home() {
  const { userType } = useUserStore();
  if (userType === "student") {
    redirect("/dashboard");
  } else if (userType === "doctor") {
    redirect("/doctor/graduation-project");
  } else if (userType === "ta") {
    redirect("/ta/tracking");
  } else if (userType === "admin") {
    redirect("/admin/graduation-project");
  } else {
    redirect("/login");
  }
}
