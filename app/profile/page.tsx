// app/profile/page.tsx
"use client"
import { userApi } from "@/lib/api";
import Image from "next/image";
import { useEffect, useState } from "react";
const userImage = "/images/user1.jpg";

interface User {
  studentId: number;
  studentName: string;
  studentEmail: string;
  studentPassword: string;
  phone: string;
  pic: string | null;
  academicYear: number;
  projectId: number;
  chatBotConversations: any[];
  cv: string | null;
  internships: any[];
  project: any | null;
  tasks: any[];
  trackId: number;
  track: any | null;
  trackTest: any | null;
  supervisors: any[];
  workFiles: any | null;
  certificates: any | null;
  projectJoinRequests: any[];
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userApi.getuserdata("Student");
        console.log(response);
        setUser(response);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Left Side */}
        <div className="space-y-6">
          {/* User Header */}
          <div className="flex items-center gap-4">
            <Image
              src={user.pic || userImage}
              alt="User"
              width={60}
              height={60}
              className="rounded-full"
            />
            <h2 className="text-xl font-semibold">{user.studentName}</h2>
          </div>

          {/* User Details */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <h3 className="font-medium text-gray-700 mb-2">User details</h3>
            <p>
              <span className="font-medium">Email address: </span>
              <a href={`mailto:${user.studentEmail}`} className="text-blue-600">{user.studentEmail}</a>
            </p>
            <p><span className="font-medium">ID:</span> {user.studentId}</p>
            <p><span className="font-medium">Mobile Number:</span> {user.phone}</p>
          </div>

          {/* Track Details */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <h3 className="font-medium text-gray-700 mb-2">Track details</h3>
            <p>{user.track?.name || "N/A"} - <span className="font-semibold">N/A%</span></p>
          </div>

          {/* Project Details */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <h3 className="font-medium text-gray-700 mb-2">Project details</h3>
            <p>{user.project?.name || "N/A"} - <span className="font-semibold">N/A%</span></p>
          </div>

          {/* Internship Details */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <h3 className="font-medium text-gray-700 mb-2">Internship details</h3>
            {user.internships.length > 0 ? (
              user.internships.map((intern, idx) => (
                <div key={idx} className="flex justify-between">
                  <p>{intern.name}</p>
                  <p>{intern.hours} hours - {intern.progress}%</p>
                </div>
              ))
            ) : (
              <p>No internships</p>
            )}
          </div>
        </div>

        {/* Right Side - Project Members */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <h3 className="font-medium text-gray-700 mb-4">Project members details</h3>

            {user.supervisors.length > 0 ? (
              user.supervisors.map((supervisor, idx) => (
                <div key={idx} className="mb-4">
                  <p className="font-semibold">{idx === 0 ? "Supervisor" : "Co-Supervisor"}</p>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-2">
                      <Image src={supervisor.pic || userImage} alt={supervisor.name} width={30} height={30} className="rounded-full" />
                      <p>{supervisor.name}</p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      {supervisor.specialization || "N/A"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p>No supervisors assigned</p>
            )}

            <hr className="my-2" />

            {/* Team Members */}
            <p className="font-semibold">Team Members</p>
            {user.project?.members?.length > 0 ? (
              user.project.members.map((member: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <Image src={member.pic || userImage} alt={member.name} width={30} height={30} className="rounded-full" />
                    <p>{member.name}</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">{member.role || "N/A"}</span>
                </div>
              ))
            ) : (
              <p>No team members</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
