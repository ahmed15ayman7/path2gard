"use client";
import { redirect } from "next/navigation";
import { useUserStore } from "@/lib/zustand";

export default function Home() {
  const { userType } = useUserStore();
  if (userType === "Student") {
    redirect("/dashboard");
  } else if (userType === "Doctor") {
    redirect("/doctor/graduation-project");
  } else if (userType === "TeachingAssistant") {
    redirect("/ta/tracking");
  } else if (userType === "Admin") {
    redirect("/admin/graduation-project");
  } else {
    redirect("/login");
  }
}
