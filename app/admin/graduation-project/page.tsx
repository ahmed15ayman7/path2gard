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
import React from "react";
import { useRouter } from "next/navigation";
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
    {
        id: 4,
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
        id: 5,
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
        id: 6,
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
    {
        id: 7,
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
        id: 8,
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
        id: 9,
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
    {
        id: 11,
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
        id: 12,
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
        id: 13,
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
    {
        id: 14,
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
        id: 15,
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
        id: 16,
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
    {
        id: 17,
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
        id: 18,
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
        id: 19,
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
    {
        id: 20,
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
        id: 21,
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
        id: 22,
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
    {
        id: 23,
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
        id: 24,
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
        id: 25,
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
    {
        id: 26,
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
        id: 27,
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
        id: 28,
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

export default function ProjectsList() {
    const router = useRouter();
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
                    <Card key={project.id} sx={{ borderRadius: 2, cursor: "pointer" }} onClick={() => router.push(`/doctor/graduation-project/${project.id}`)}>
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
                                        {project.description}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Members */}
                            <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                                {project.members.map((member, idx) => (
                                    <Box
                                        key={idx}
                                        display="flex"
                                        alignItems="center"
                                        gap={0.5}
                                        mr={1}
                                    >
                                        <Avatar
                                            src={member.avatar}
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
