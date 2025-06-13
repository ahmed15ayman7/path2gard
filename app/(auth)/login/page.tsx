"use client";
import { useState } from "react";
import { TextField, Radio, RadioGroup, FormControlLabel, Button } from "@mui/material";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import Image from "next/image";
import { useUserStore } from "@/lib/zustand";
import { useRouter } from "next/navigation";
import axios from "axios";
type UserType = "student" | "doctor" | "ta" | "admin";
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["student", "doctor", "ta", "admin"]),
});

export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "", role: "student" });
  let { setUserType } = useUserStore();
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = schema.safeParse(formData);
    const { email, password, role } = formData;
    if (!validation.success) {
      toast.error("Please fill out all fields correctly.");
      return;
    }

    try {
      const response = await axios.post("http://elgazery.runasp.net/api/login", {
        email,
        password,
        role,
      });

      const { data } = response;

      if (data?.success) {
        toast.success(`Logged in as ${role}`);
        // Store user or token here if needed

        // Redirect based on role
        switch (role) {
          case "student":
            router.push("/dashboard");
            break;
          case "doctor":
            router.push("/doctor/graduation-project");
            break;
          case "admin":
            router.push("/admin/graduation-project");
            break;
          default:
            router.push("/");
        }
      } else {
        toast.error("Invalid credentials or role mismatch.");
      }
    } catch (error: any) {
      toast.error("Login failed. Please try again.");
      console.error("Login error:", error);
    }

  };
  return (
    <div className="flex h-screen w-full bg-[#0A2844] relative overflow-hidden">
      <div className="w-1/2 flex flex-col justify-center items-center text-white p-10 z-10">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
          <Image
            src="/images/logo-white.png"
            alt="Path2Grad Logo"
            width={400}
            height={80}
            className="cursor-pointer"
          />
          <p className="text-sm mt-4 max-w-md text-center">
            Empowering computer science students with personalized learning plans, project
            management, collaboration tools, and AI support.
          </p>
        </motion.div>
      </div>
      <div className="w-1/2 bg-gray-100 flex justify-center items-center rounded-l-3xl p-10 z-10">
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-8 rounded-2xl shadow-lg w-96">
          <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField label="Email" name="email" variant="outlined" fullWidth onChange={handleChange} />
            <TextField label="Password" name="password" type="password" variant="outlined" fullWidth onChange={handleChange} />
            <RadioGroup name="role" value={formData.role} onChange={handleChange} className="flex flex-col">
              <FormControlLabel value="student" control={<Radio />} label="Student" />
              <FormControlLabel value="doctor" control={<Radio />} label="Doctor" />
              <FormControlLabel value="ta" control={<Radio />} label="Teaching Assistant" />
              <FormControlLabel value="admin" control={<Radio />} label="Projects Admin" />
            </RadioGroup>
            <Button type="submit" variant="contained" fullWidth className="bg-[#0A2844] text-white">Sign In</Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
