"use client";

import React, { useEffect, useState } from "react";
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
import { Internship } from "@/lib/api";
import Image from "next/image";

const primaryColor = "#184271";

export default function Home() {
    // const internships = [
    //     "AI Samsung Internship",
    //     "AI ITI Internship",
    //     "British Internship",
    //     "Orange Software Internship",
    //     "Vodafone data analysis Internship",
    //     "Etisalat Software Internship",
    //     "British Internship",
    //     "Orange Software Internship",
    //     "Vodafone data analysis Internship",
    //     "Etisalat Software Internship",
    //     "AI Samsung Internship",
    //     "AI ITI Internship",
    //     "British Internship",
    //     "AI Samsung Internship",
    //     "AI ITI Internship",
    //     "British Internship",
    // ];
    const [internships, setInternships] = useState<{name:string,link:string}[]>([]);
    let [uploadCertificates, setUploadCertificates] = useState<{internshipCertificatesId:number,certificate:string}[]>([]);
    let [workFiles, setWorkFiles] = useState<{internshipWorkFilesId:number,workFile:string}[]>([]);
    useEffect(() => {
        const fetchInternships = async () => {
            const internships = await Internship.getInternship();
            setInternships(internships);
        }
        fetchInternships();
        const fetchUploadCertificates = async () => {
            const uploadCertificates = await Internship.getUploadCertificates();
            setUploadCertificates(uploadCertificates);
        }
        fetchUploadCertificates();
        const fetchWorkFiles = async () => {
            const workFiles = await Internship.getWorkFiles();
            setWorkFiles(workFiles);
        }
        fetchWorkFiles();
    }, []);

    // const [certificates, setCertificates] = useState<string[]>([
    //     "ITI - AI Certificate",
    //     "Samsung Software Certificate",
    //     "NTI data analysis Certificate",
    // ]);

    const renderLinks = (items: {name:string,link:string}[]) =>
        items.map((item, idx) => (
            <Link
                key={idx}
                href={item.link}
                underline="hover"
                sx={{ display: "flex", alignItems: "center", color: primaryColor }}
            >
                <InsertLink sx={{ fontSize: 18, mr: 1 }} />
                {item.name}
            </Link>
        ));

    const renderFiles = (items: {internshipCertificatesId:number,certificate:string}[]) =>
        items.map((item, idx) => (
            <Box key={idx} display="flex" alignItems="center" gap={1}>
                {item.certificate.includes("Project") ? (
                    <Article sx={{ color: "#000" }} />
                ) : (
                    <Description sx={{ color: "#000" }} />
                )}
                <Typography variant="body1">{item.certificate.slice(0,10)}</Typography>
                {/* <Image src={item.certificate || ""} alt="certificate" width={100} height={100} /> */}
            </Box>
        ));
    const renderWorkFiles = (items: {internshipWorkFilesId:number,workFile:string}[]) =>
        items.map((item, idx) => (
            <Box key={idx} display="flex" alignItems="center" gap={1}>
                <Description sx={{ color: "#000" }} />
                <Typography variant="body1">{item.workFile.slice(0,10)}</Typography>
                {/* <Image src={item.workFile || ""} alt="workFile" width={100} height={100} /> */}
            </Box>
        ));

    const handleCertificateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const response = await Internship.uploadCertificates(file);
            setUploadCertificates((prev) => [...prev, {internshipCertificatesId:response.internshipCertificatesId,certificate:file.name}]);
        }
    };

    const handleWorkFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const response = await Internship.uploadWorkFiles(file);
            setWorkFiles((prev) => [...prev, {internshipWorkFilesId:response.internshipWorkFilesId,workFile:file.name}]);
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
                        <Stack spacing={1}>{renderFiles(uploadCertificates)}</Stack>

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
                        <Stack spacing={1}>{renderWorkFiles(workFiles)}</Stack>

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
