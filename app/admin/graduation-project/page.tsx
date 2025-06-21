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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { projectAdminApi } from "@/lib/api";

const primaryColor = "#184271";

interface Project {
    projectId: number;
    projectName: string;
    description: string;
    students: {
        studentId: number;
        studentName: string;
        pic: string;
        }[]
    supervisors: {
        supervisorId: number;
        supervisorName: string;
        pic: string;
        }[]
}
export default function ProjectsList() {
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await projectAdminApi.getProjects();
                setProjects(response.reverse());
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <Box
            sx={{
                padding: 4,
                backgroundColor: "#f4f4f4",
                minHeight: "100vh",
            }}
        >
            <Stack spacing={2}>
                {projects.map((project: Project) => (
                    <Card key={project.projectId} sx={{ borderRadius: 2, cursor: "pointer" }} onClick={() => router.push(`/admin/graduation-project/${project.projectId}`)}>
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
                                {/* <h2 className="text-4xl">{project.projectName}</h2> */}
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {project.projectName}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        maxWidth="400px"
                                    >
                                        {project.description}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Members */}
                            <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                                {project.students?.map((member: any, idx: any) => (
                                    <Box
                                        key={idx}
                                        display="flex"
                                        alignItems="center"
                                        gap={0.5}
                                        mr={1}
                                    >
                                        <Avatar
                                            src={member.pic||"/images/user1.jpg"}
                                            alt={member.studentName}
                                            sx={{ width: 24, height: 24 }}
                                        />
                                        <Typography variant="caption">{member.name}</Typography>
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
