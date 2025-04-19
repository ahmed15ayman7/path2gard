"use client";

import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";
import React, { useState } from "react";

const primaryColor = "#184271";

interface Request {
    id: number;
    name: string;
    project: string;
    image: string;
}

const initialRequests: Request[] = [
    {
        id: 1,
        name: "Ayman Salim Reda",
        project: "Bank System",
        image: "/images/user1.jpg", // ضع الصورة عندك في public
    },
    {
        id: 2,
        name: "Ayman Salim Reda",
        project: "Hospital System",
        image: "/images/user1.jpg",
    },
    {
        id: 3,
        name: "Ayman Salim Reda",
        project: "Gym System",
        image: "/images/user1.jpg",
    },
];

export default function GraduationRequests() {
    const [requests, setRequests] = useState(initialRequests);

    const handleRemove = (id: number) => {
        setRequests((prev) => prev.filter((req) => req.id !== id));
    };

    const handleAccept = (id: number) => {
        alert(`Accepted project with ID ${id}`);
        setRequests((prev) => prev.filter((req) => req.id !== id));
    };

    return (
        <Box
            sx={{
                padding: 4,
                backgroundColor: "#f4f4f4",
                minHeight: "100vh",
            }}
        >
            <Typography variant="h5" fontWeight="bold" textAlign="center" mb={4}>
                Graduation Project Requests
            </Typography>

            <Stack spacing={2}>
                {requests.map((req) => (
                    <Card key={req.id} sx={{ borderRadius: 2 }}>
                        <CardContent
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                                gap: 2,
                            }}
                        >
                            {/* Left: Image + Name */}
                            <Box display="flex" alignItems="center" gap={2}>
                                <Avatar alt={req.name} src={req.image} />
                                <Typography fontWeight={500}>{req.name}</Typography>
                            </Box>

                            {/* Middle: Project Title */}
                            <Typography>{req.project}</Typography>

                            {/* Right: Buttons */}
                            <Box display="flex" gap={1}>
                                <Button
                                    variant="outlined"
                                    onClick={() => handleRemove(req.id)}
                                >
                                    Remove
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: primaryColor }}
                                    onClick={() => handleAccept(req.id)}
                                >
                                    Accept
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Box>
    );
}
