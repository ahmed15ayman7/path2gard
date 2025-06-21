"use client";
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

// Reusable prerequisites data
const trackData: Record<string, {
  logo: string;
  title: string;
  intro: string;
  prerequisites: string[];
  roadmap: string[];
}> = {
  "AI_Engineer": {
    logo: "/icons/ai.png",
    title: "Artificial Intelligence (AI)",
    intro:
      "Artificial Intelligence (AI) is a specialized field of computer science that focuses on creating systems capable of performing tasks that typically require human intelligence.",
    prerequisites: [
      "Mathematics",
      "Programming Skills",
      "Machine Learning Basics",
      "Computer Science Fundamentals",
      "AI Tools & Frameworks",
      "Problem-Solving & Research",
      "Soft Skills",
    ],
    roadmap: [
      "BASICS OF AI",
      "MATHEMATICS",
      "PYTHON",
      "BIG DATA",
      "DATA SCIENCE",
      "MACHINE LEARNING",
      "DEEP LEARNING",
      "BUSINESS INTELLIGENCE",
      "AI ENGINEER",
    ],
  },
  "Data_Scientist": {
    logo: "/icons/ai.png",
    title: "Data Science",
    intro:
      "Data Science is the field of extracting insights from structured and unstructured data using scientific methods, algorithms, and tools.",
    prerequisites: [
      "Statistics & Probability",
      "Python/R",
      "Data Wrangling",
      "Machine Learning",
      "SQL & Databases",
      "Data Visualization",
      "Critical Thinking",
    ],
    roadmap: [
      "DATA LITERACY",
      "PYTHON & R",
      "SQL",
      "DATA CLEANING",
      "EDA",
      "MACHINE LEARNING",
      "MODELING",
      "VISUALIZATION",
      "DATA SCIENTIST",
    ],
  },
  "DevOps_Engineer": {
    logo: "/icons/ai.png",
    title: "Software Development",
    intro:
      "Software development involves designing, building, testing, and maintaining software applications across various platforms.",
    prerequisites: [
      "Programming Fundamentals",
      "OOP Concepts",
      "Data Structures & Algorithms",
      "Databases",
      "Version Control (Git)",
      "Testing & Debugging",
      "Agile Methodologies",
    ],
    roadmap: [
      "BASICS",
      "OOP",
      "ALGORITHMS",
      "DATABASES",
      "GIT",
      "DESIGN PATTERNS",
      "TESTING",
      "DEPLOYMENT",
      "SOFTWARE ENGINEER",
    ],
  },
  "FullStack_Developer": {
    logo: "/icons/ai.png",
    title: "Web Development",
    intro:
      "Web development includes designing and building websites and web apps using front-end and back-end technologies.",
    prerequisites: [
      "HTML, CSS, JS",
      "Responsive Design",
      "Front-End Frameworks",
      "Back-End Fundamentals",
      "APIs",
      "Databases",
      "Deployment",
    ],
    roadmap: [
      "HTML/CSS",
      "JAVASCRIPT",
      "REACT",
      "NODE.JS",
      "EXPRESS",
      "MONGO/SQL",
      "REST API",
      "DEPLOYMENT",
      "FULL STACK DEV",
    ],
  },
  "Cybersecurity": {
    logo: "/icons/ai.png",
    title: "Cybersecurity",
    intro:
      "Cybersecurity focuses on protecting computer systems, networks, and data from unauthorized access or attacks.",
    prerequisites: [
      "Networking Basics",
      "Operating Systems",
      "Cryptography",
      "Security Tools",
      "Threat Analysis",
      "Scripting",
      "Incident Response",
    ],
    roadmap: [
      "NETWORKING",
      "OS FUNDAMENTALS",
      "SECURITY BASICS",
      "ETHICAL HACKING",
      "TOOLS (NMAP, WIRESHARK)",
      "THREAT INTELLIGENCE",
      "PENETRATION TESTING",
      "INCIDENT HANDLING",
      "SECURITY ANALYST",
    ],
  },
};

const Index = () => {
  const params = useSearchParams();
  const type = params.get("type") || "Artificial Intelligence";
  const data = trackData[type] || trackData["Artificial Intelligence"];

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
        {/* Left Sidebar */}
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
            <Image src={data.logo} alt={type} width={80} height={80} />
            <Typography variant="h6" align="center" sx={{ mt: 1 }}>
              {type}
            </Typography>
          </Paper>
        </Grid>

        {/* Main Area */}
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
                {data.title}
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
                If that suits you, let's get started.
              </Typography>
              {/* <Button variant="outlined" size="small">
                Choose Track
              </Button> */}
            </Box>
          </Paper>
        </Grid>

        {/* Three Sections */}
        <Grid item xs={12}>
          <Paper elevation={1} sx={{ borderRadius: 3 }}>
            <Grid container>
              {/* Definition Panel */}
              <Grid
                item
                xs={12}
                md={4}
                sx={{ p: 3, borderRight: { md: "1px solid #e0e0e0" } }}
              >
                <Typography variant="h6" gutterBottom>
                  {data.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {data.intro}
                </Typography>
              </Grid>

              {/* Prerequisites Panel */}
              <Grid
                item
                xs={12}
                md={4}
                sx={{ p: 3, borderRight: { md: "1px solid #e0e0e0" } }}
              >
                <Typography variant="h6" gutterBottom>
                  Prerequisites
                </Typography>
                <Stack spacing={1}>
                  {data.prerequisites.map((item, idx) => (
                    <Typography
                      key={idx}
                      variant="body2"
                      color="text.secondary"
                    >
                      {idx + 1}. {item}
                    </Typography>
                  ))}
                </Stack>
              </Grid>

              {/* Roadmap Panel */}
              <Grid item xs={12} md={4} sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  align="center"
                  gutterBottom
                  sx={{ textTransform: "uppercase", fontWeight: "bold" }}
                >
                  Roadmap
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 1,
                    width: "100%",
                  }}
                >
                  {data.roadmap.map((item, index) => (
                    <Box
                      key={index}
                      sx={{ position: "relative", textAlign: "center" }}
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
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Index />
    </Suspense>
  );
}
