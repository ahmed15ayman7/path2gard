"use client";

import React, { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Link,
    Divider,
    Button,
    Stack,
} from "@mui/material";
import {
    InsertLink,
    Description,
    Article,
    UploadFile,
} from "@mui/icons-material";

const primaryColor = "#184271";

export default function Home() {
    const internships = [
        "AI Samsung Internship",
        "AI ITI Internship",
        "British Internship",
        "Orange Software Internship",
        "Vodafone data analysis Internship",
        "Etisalat Software Internship",
        "British Internship",
        "Orange Software Internship",
        "Vodafone data analysis Internship",
        "Etisalat Software Internship",
        "AI Samsung Internship",
        "AI ITI Internship",
        "British Internship",
        "AI Samsung Internship",
        "AI ITI Internship",
        "British Internship",
    ];

    const [certificates, setCertificates] = useState<string[]>([
        "ITI - AI Certificate",
        "Samsung Software Certificate",
        "NTI data analysis Certificate",
    ]);

    const [workFiles, setWorkFiles] = useState<string[]>([
        "ITI - AI Project",
        "Samsung Software Project",
        "NTI Data Analysis Project",
    ]);

    const renderLinks = (items: string[]) =>
        items.map((item, idx) => (
            <Link
                key={idx}
                href="#"
                underline="hover"
                sx={{ display: "flex", alignItems: "center", color: primaryColor }}
            >
                <InsertLink sx={{ fontSize: 18, mr: 1 }} />
                {item}
            </Link>
        ));

    const renderFiles = (items: string[]) =>
        items.map((item, idx) => (
            <Box key={idx} display="flex" alignItems="center" gap={1}>
                {item.includes("Project") ? (
                    <Article sx={{ color: "#000" }} />
                ) : (
                    <Description sx={{ color: "#000" }} />
                )}
                <Typography variant="body1">{item}</Typography>
            </Box>
        ));

    const handleCertificateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCertificates((prev) => [...prev, file.name]);
        }
    };

    const handleWorkFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setWorkFiles((prev) => [...prev, file.name]);
        }
    };

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: { md: "1fr 1fr", xs: "1fr" },
                gap: 2,
                padding: 4,
                backgroundColor: "#f0f2f5",
                minHeight: "100vh",
            }}
        >
            {/* Internships */}
            <Card sx={{ borderRadius: 4 }}>
                <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Internships
                    </Typography>
                    <Stack spacing={1}>{renderLinks(internships)}</Stack>
                </CardContent>
            </Card>

            {/* Right side: Certificates + Work Files */}
            <Box display="flex" flexDirection="column" gap={2}>
                {/* Certificates */}
                <Card sx={{ borderRadius: 4 }}>
                    <CardContent>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Certificates
                        </Typography>
                        <Stack spacing={1}>{renderFiles(certificates)}</Stack>

                        <Button
                            component="label"
                            variant="outlined"
                            startIcon={<UploadFile />}
                            sx={{ mt: 2 }}
                            fullWidth
                        >
                            Upload File
                            <input
                                type="file"
                                hidden
                                onChange={handleCertificateUpload}
                            />
                        </Button>
                    </CardContent>
                </Card>

                {/* Work Files */}
                <Card sx={{ borderRadius: 4 }}>
                    <CardContent>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Work Files
                        </Typography>
                        <Stack spacing={1}>{renderFiles(workFiles)}</Stack>

                        <Button
                            component="label"
                            variant="outlined"
                            startIcon={<UploadFile />}
                            sx={{ mt: 2 }}
                            fullWidth
                        >
                            Upload File
                            <input type="file" hidden onChange={handleWorkFileUpload} />
                        </Button>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}
