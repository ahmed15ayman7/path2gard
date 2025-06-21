"use client";
import { useState } from "react";
import { TextField, Radio, RadioGroup, FormControlLabel, Button } from "@mui/material";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import Image from "next/image";
import { useUserStore, useUserEmail } from "@/lib/zustand";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signIn } from "next-auth/react";
type UserType = "Student" | "Doctor" | "TeachingAssistant" | "ProjectAdmin";
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["Student", "Doctor", "TeachingAssistant", "Admin"]),
});
let Admins = [{ email: "admin1@path2grad.com", password: "admin123",name:'Admin One' }, { email: "admin2@path2grad.com", password: "admin456",name:"Admin Two" }, { email: "admin3@path2grad.com", password: "admin789",name:"Admin Three" }];

let Students = [{ email: "john.doe@student.edu", password: "student123",name:"John Doe" }, { email: "jane.smith@student.edu", password: "student456",name:"Jane Smith" }, { email: "robert.johnson@student.edu", password: "student789",name:"Robert Johnson" }, { email: "emily.davis@student.edu", password: "student012",name:"Emily Davis" }, { email: "michael.wilson@student.edu", password: "student345",name:"Michael Wilson" }, { email: "sarah.brown@student.edu", password: "student678",name:"Sarah Brown" }, { email: "david.taylor@student.edu", password: "student901",name:"David Taylor" }, { email: "jessica.anderson@student.edu", password: "student234",name:"Jessica Anderson" }, { email: "thomas.martinez@student.edu", password: "student567",name:"Thomas Martinez" }, { email: "lisa.robinson@student.edu", password: "student890",name:"Lisa Robinson" }, { email: "james.clark@student.edu",password: "student112",name:"James Clark" }, { email: "patricia.lewis@student.edu",password: "student113",name:"Patricia Lewis" }, { email: "christopher.lee@student.edu",password: "student114",name:"Christopher Lee" }, { email: "amanda.walker@student.edu",password: "student115",name:"Amanda Walker" }, { email: "matthew.hall@student.edu",password:"student116",name:"Matthew Hall"}]

let Doctors = [{ email: "smith@university.edu", password: "smith123",name:"Dr. Smith" }, { email: "johnson@university.edu", password: "johnson123",name:"Dr. Johnson" }, { email: "williams@university.edu", password: "williams123",name:"Dr. Williams" }, { email: "brown@university.edu", password: "brown123",name:"Dr. Brown" }, { email: "davis@university.edu", password: "davis123",name:"Dr. Davis" }]
let TeachingAssistant = [{ email: "davis@university.edu", password: "davis123",name:"Dr. Davis" }, { email: "williams@university.edu", password: "williams123",name:"Dr. Williams" }]
export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "", role: "Student" });
  let { setUserType } = useUserStore();
  let { setUserEmail } = useUserEmail();
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
      const response = await signIn("credentials", {
        email,
        password,
        name:email.split("@")[0],
        role,
        redirect: false,
      });
        switch (role) {
          case "Student":
             
              if (response?.ok) {
              setUserEmail({ email, name: (Students.find(student => student.email === email)?.name)||"john doe", role });
              setUserType(role as UserType);
              toast.success(`Logged in as ${role}`);
              router.push("/dashboard");
              } else {
                toast.error("الايميل او اسم الدور او الكلمة السرية غير صحيحة");
              }

            break;
          case "Doctor":
             
              if (response?.ok) {
              setUserEmail({ email, name: (Doctors.find(doctor => doctor.email === email)?.name)||"john doe", role });
              setUserType(role as UserType);
              toast.success(`Logged in as ${role}`);
              router.push("/doctor/graduation-project");
              } else {
                toast.error("الايميل او اسم الدور او الكلمة السرية غير صحيحة");
              }
            break;
          case "Admin":
              
              if (response?.ok) {
              setUserEmail({ email, name: (Admins.find(admin => admin.email === email)?.name)||"john doe", role });
              setUserType(role as UserType);
              toast.success(`Logged in as ${role}`);
              router.push("/admin/graduation-project");} else {
                toast.error("الايميل او اسم الدور او الكلمة السرية غير صحيحة");
              }
            break;
          case "TeachingAssistant":
              if (response?.ok) {
              setUserEmail({ email, name: (TeachingAssistant.find(ta => ta.email === email)?.name)||"john doe", role });
              setUserType(role as UserType);
              toast.success(`Logged in as ${role}`);
              router.push("/ta/tracking");
              } else {
                toast.error("الايميل او اسم الدور او الكلمة السرية غير صحيحة");
              }
            break;
          default:
            toast.error("الايميل او اسم الدور او الكلمة السرية غير صحيحة");
        }
      
    } catch (error: any) {
      toast.error("الايميل او اسم الدور او الكلمة السرية غير صحيحة");
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
              <FormControlLabel value="Student" control={<Radio />} label="Student" />
              <FormControlLabel value="Doctor" control={<Radio />} label="Doctor" />
              <FormControlLabel value="TeachingAssistant" control={<Radio />} label="Teaching Assistant" />
              <FormControlLabel value="Admin" control={<Radio />} label="Projects Admin" />
            </RadioGroup>
            <Button type="submit" variant="contained" fullWidth className="bg-[#0A2844] text-white">Sign In</Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
