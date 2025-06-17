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

const primaryColor = "#184271";

interface Project {
    id: number;
    icon: string;
    title: string;
    projectDescription: string;
    members: {
        id: string;
        name: string;
        image: string;
        field: string;
        role: string;
    }[];
}

export default function ProjectsList() {
    const router = useRouter();
    const [projects, setProjects] = useState<any[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("/api/projects");
                setProjects(response.data.reverse());
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
                {projects.map((project: any) => (
                    <Card key={project.id} sx={{ borderRadius: 2, cursor: "pointer" }} onClick={() => router.push(`/admin/graduation-project/${project.id}`)}>
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
                                <h2 className="text-4xl">{project.icon}</h2>
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {project.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        maxWidth="400px"
                                    >
                                        {project.projectDescription}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Members */}
                            <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                                {project.members?.map((member: any, idx: any) => (
                                    <Box
                                        key={idx}
                                        display="flex"
                                        alignItems="center"
                                        gap={0.5}
                                        mr={1}
                                    >
                                        <Avatar
                                            src={member.image}
                                            alt={member.name}
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
