"use client";

import {
    Avatar,
    Box,
    Card,
    CardContent,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserEmail } from "@/lib/zustand";
import { doctorApi } from "@/lib/api";
const primaryColor = "#184271";

const projects = [
    {
        id: 1,
        icon: "🏦", // put your icons in /public/icons/
        title: "Bank system",
        description:
            "A banking system for secure and easy account and transaction management.",
        members: [
            {
                name: "Ayman Salim Reda",
                avatar: "/images/user1.jpg",
            },
            {
                name: "Rania Mohamed",
                avatar: "/images/user1.jpg",
            },
            {
                name: "Nagwa Ahmed",
                avatar: "/images/user1.jpg",
            },
        ],
    },
    {
        id: 2,
        icon: "🏋️‍♂️",
        title: "Gym system",
        description:
            "A system for managing gym operations, including member registrations.",
        members: [
            {
                name: "Ayman Salim Reda",
                avatar: "/images/user1.jpg",
            },
            {
                name: "Rania Mohamed",
                avatar: "/images/user1.jpg",
            },
            {
                name: "Nagwa Ahmed",
                avatar: "/images/user1.jpg",
            },
        ],
    },
    {
        id: 3,
        icon: "🏃‍♂️",
        title: "Health Pal",
        description:
            "A health app that tracks activities, diet, sleep, and exercise.",
        members: [
            {
                name: "Ayman Salim Reda",
                avatar: "/images/user1.jpg",
            },
            {
                name: "Rania Mohamed",
                avatar: "/images/user1.jpg",
            },
            {
                name: "Nagwa Ahmed",
                avatar: "/images/user1.jpg",
            },
        ],
    },
];
interface Project {
    projectId: number;
    projectName: string;
    description: string;
    students: {
        studentId: number;
        studentName: string;
        pic: string | null;
    }[];
    teachingAssistants: {
        teachingAssistanId: number;
        teachingAssistanName: string;
        teachingAssistantPic: string | null;
    }[];
}
export default function ProjectsList() {
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    let {userEmail} = useUserEmail();
    useEffect(() => {
        let getProjects = async () => {
            let response = await doctorApi.getProjects();
            setProjects(response.reverse());
        }
        getProjects();
    }, [userEmail]);
    if(projects.length === 0){
        return <div className="flex justify-center items-center h-screen">
            <div className="text-2xl font-bold"> ❌ No projects found</div>
        </div>;
    }
        
    return (
        <Box
            sx={{
                padding: 4,
                backgroundColor: "#f4f4f4",
                minHeight: "100vh",
            }}
        >
            <Stack spacing={2}>
                {projects.map((project) => (
                    <Card key={project.projectId} sx={{ borderRadius: 2, cursor: "pointer" }} onClick={() => router.push(`/doctor/graduation-project/${project.projectId}`)}>
                        <CardContent
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexWrap: "wrap",
                                gap: 2,
                            }}
                        >
                            {/* Icon and Info */}
                            <Box display="flex" alignItems="center" gap={2} flex={1}>
                                {/* <h2 className="text-4xl">{project.icon}</h2> */}
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {project.projectName}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        maxWidth="400px"
                                    >
                                        {project.description || ""}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Members */}
                            <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                                {project.students?.map((member, idx) => (
                                    <Box
                                        key={idx}
                                        display="flex"
                                        alignItems="center"
                                        gap={0.5}
                                        mr={1}
                                    >
                                        <Avatar
                                                src={member.pic || "/images/user1.jpg"}
                                            alt={member.studentName}
                                            sx={{ width: 24, height: 24 }}
                                        />
                                        <Typography variant="caption">{member.studentName}</Typography>
                                    </Box>
                                ))}
                            </Box>

                            {/* Arrow Icon */}
                            <IconButton>
                                <ArrowForwardIosIcon sx={{ color: primaryColor }} />
                            </IconButton>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Box>
    );
}
