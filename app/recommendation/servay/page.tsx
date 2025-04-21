import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import Image from "next/image";
// Data for the prerequisites list
const prerequisites = [
    "Mathematics",
    "Programming Skills",
    "Machine Learning Basics",
    "Computer Science Fundamentals",
    "AI Tools & Frameworks",
    "Problem-Solving & Research",
    "Soft Skills",
];


const Index = () => {
    return (
        <Box
            sx={{
                width: "100%",
                mx: "auto",
                p: 2,
                bgcolor: "#f5f5f5",
                minHeight: "100vh",
            }}
        >
            <Grid container spacing={2}>
                {/* Left sidebar with AI logo */}
                <Grid item xs={12} md={3}>
                    <Paper
                        elevation={1}
                        sx={{
                            p: 3,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            borderRadius: 3,
                        }}
                    >
                        <Image src="/icons/ai.png" alt="AI" width={80} height={80} />
                        <Typography variant="h6" align="center" sx={{ mt: 1 }}>
                            AI
                        </Typography>
                    </Paper>
                </Grid>

                {/* Main content area */}
                <Grid item xs={12} md={9}>
                    <Paper elevation={1} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
                        <Typography variant="h6" color="success.main" gutterBottom>
                            Nice Work!
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            We Suggest You The Track of{" "}
                            <Typography
                                component="span"
                                variant="h5"
                                color="primary"
                                fontWeight="bold"
                            >
                                Artificial Intelligence (AI)
                            </Typography>
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mt: 2,
                            }}
                        >
                            <Typography variant="body1" color="text.secondary">
                                If that Suits you, let's get started.
                            </Typography>
                            <Button variant="outlined" size="small">
                                Choose Track
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
                {/* Three panels section */}
                <Grid item xs={12} md={12}>
                    <Paper elevation={1} sx={{ borderRadius: 3 }}>
                        <Grid container>
                            {/* AI Definition Panel */}
                            <Grid
                                item
                                xs={12}
                                md={4}
                                sx={{ p: 3, borderRight: { md: "1px solid #e0e0e0" } }}
                            >
                                <Typography variant="h6" gutterBottom>
                                    AI (Artificial Inelegance)
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Artificial Intelligence (AI) is a specialized field of
                                    computer science that focuses on creating systems capable of
                                    performing tasks that typically require human intelligence.
                                    These tasks include problem-solving, decision-making, natural
                                    language understanding, vision, learning, and more.
                                </Typography>
                            </Grid>

                            {/* AI Prerequisites Panel */}
                            <Grid
                                item
                                xs={12}
                                md={4}
                                sx={{ p: 3, borderRight: { md: "1px solid #e0e0e0" } }}
                            >
                                <Typography variant="h6" gutterBottom>
                                    AI Prerequisites
                                </Typography>
                                <Stack spacing={1}>
                                    {prerequisites.map((prerequisite, index) => (
                                        <Typography
                                            key={index}
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {index + 1}. {prerequisite}
                                        </Typography>
                                    ))}
                                </Stack>
                            </Grid>

                            {/* AI Roadmap Panel */}
                            <Grid item xs={12} md={4} sx={{ p: 3 }}>
                                <Typography
                                    variant="h6"
                                    align="center"
                                    gutterBottom
                                    sx={{ textTransform: "uppercase", fontWeight: "bold" }}
                                >
                                    Roadmap of AI Engineer
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        "& img": {
                                            maxWidth: "100%",
                                            height: "auto",
                                        },
                                    }}
                                >
                                    {/* This would ideally be replaced with actual roadmap visualization components */}
                                    {/* For now using a placeholder for the roadmap visualization */}
                                    <Box
                                        sx={{
                                            display: "grid",
                                            gridTemplateColumns: "repeat(3, 1fr)",
                                            gap: 1,
                                            width: "100%",
                                        }}
                                    >
                                        {[...Array(9)].map((_, index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    position: "relative",
                                                    textAlign: "center",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: "50%",
                                                        bgcolor:
                                                            index % 3 === 0
                                                                ? "#ff6b6b"
                                                                : index % 3 === 1
                                                                    ? "#4ecdc4"
                                                                    : "#45b7d8",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        margin: "0 auto",
                                                        color: "white",
                                                        fontWeight: "bold",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    {index + 1}
                                                </Box>
                                                {index % 3 !== 2 && index < 6 && (
                                                    <Box
                                                        sx={{
                                                            position: "absolute",
                                                            top: "50%",
                                                            right: "-50%",
                                                            width: "100%",
                                                            height: 2,
                                                            bgcolor: "#ccc",
                                                            zIndex: 0,
                                                        }}
                                                    />
                                                )}
                                                <Typography
                                                    variant="caption"
                                                    display="block"
                                                    sx={{ mt: 1, fontSize: "8px" }}
                                                >
                                                    {index === 0
                                                        ? "BASICS OF AI"
                                                        : index === 1
                                                            ? "MATHEMATICS"
                                                            : index === 2
                                                                ? "PYTHON"
                                                                : index === 3
                                                                    ? "BIG DATA"
                                                                    : index === 4
                                                                        ? "DATA SCIENCE"
                                                                        : index === 5
                                                                            ? "MACHINE LEARNING"
                                                                            : index === 6
                                                                                ? "DEEP LEARNING"
                                                                                : index === 7
                                                                                    ? "BUSINESS INTELLIGENCE"
                                                                                    : "AI ENGINEER"}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>

                </Grid>
            </Grid>
        </Box>
    );
};

export default Index;