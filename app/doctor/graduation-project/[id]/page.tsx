"use client";
import {
    Container,
    Typography,
    Box,
    TextField,
    Button,
    Grid,
    Paper,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    IconButton,

} from "@mui/material";
import { Assignment, People, Description, InsertDriveFile, Upload } from "@mui/icons-material";
import { Download } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { use, useEffect, useState } from "react";
import { doctorApi, downListApi } from "@/lib/api";

const theme = createTheme({
    palette: {
        primary: {
            main: "#0A2647",
        },
    },
});
interface Project {
    projectId: number;
    projectName: string;
    description: string;
    projectFields: {
        projectFieldId: number;
        projectId: number;
        fieldId: number;
        field: string | null;
    }[];
    numberOfTeam: number;
        students: {
            studentId: number;
            studentName: string;
            pic: string | null;
        }[];
    supervisors: {
        supervisorId: number;
        supervisorName: string;
        pic: string | null;
    }[];
    projectRequirements?: string[] | null;
    projectFiles?: {
        name: string;
        url: string;
    }[];
}

export default function Home({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [projectData, setProjectData] = useState<Project | null>(null);
    let [projectFields, setProjectFields] = useState<{
        fieldId: number;
        fieldName: string;
    }[]>([]);
    useEffect(() => {
        let getProjectData = async () => {
            let response = await doctorApi.getProjectById(id);
            console.log(response);
            setProjectData(response);
            getProjectFields();
        }
        let getProjectFields = async () => {
            let response = await downListApi.getProjectField();
            setProjectFields(response);
        }
        getProjectData();
    }, [id]);
    // const projectData = {
    //     projectName: "Path2Grad Student tracking & graduation system",
    //     projectDescription:
    //         "Path2Grad is a comprehensive educational platform designed to support computer science students in their academic journey and personal growth.",
    //     projectField: ["Web", "AI"],
    //     teamMembers: [
    //         { name: "Ayman Salim Reda", role: "Router" },
    //         { name: "Rania Mohamed", role: "Front-end" },
    //         { name: "Ayman Salim Reda", role: "Backend" },
    //         { name: "Ayman Salim Reda", role: "Back-end" },
    //     ],
    //     supervisors: [
    //         { name: "Dr. Ahmed Khalid Ali", role: "Supervisor" },
    //         { name: "Eng. Rania Mohamed", role: "Co-Supervisor" },
    //     ],
    //     projectFiles: [
    //         { name: "NUB_GP 2024-2025.xlsx", url: "#" },
    //         { name: "GP-abstract.docx", url: "#" },
    //         { name: "Project Concept and Plan Template.docx", url: "#" },
    //         { name: "GP-Template.docx", url: "#" },
    //     ],
    //     projectRequirements: [
    //         "Project 1st term requirements",
    //         "Project 2nd term requirements",
    //     ],
    // };

    const styles = {
        container: {
            display: "flex",
            gap: "20px",
            padding: "20px",
        },
        paper: {
            padding: "20px",
            borderRadius: "10px",
        },
        sectionTitle: {
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
        },
        listItem: {
            display: "flex",
            alignItems: "center",
            marginBottom: "5px",
        },
        fileItem: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "5px",
        },
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    {/* ... (rest of the code remains the same, except for the addition of icons below) */}
                    <Grid item xs={12} md={6}>
                        <Paper style={styles.paper}>
                            <Typography variant="h6" style={styles.sectionTitle}>Project Name</Typography>
                            <TextField label="Project Name" defaultValue={projectData?.projectName} fullWidth margin="normal" />
                            <Typography variant="h6" style={styles.sectionTitle}>Brief About Project</Typography>
                            <TextField label="Description" multiline rows={4} defaultValue={projectData?.description} fullWidth margin="normal" />
                            <Typography variant="h6" style={styles.sectionTitle}>Project Field</Typography>
                            <Box display="flex" gap={1}>
                                {projectData?.projectFields.map((field) => (
                                    <Button key={field.fieldId} variant="outlined" color="primary" size="small">{projectFields.find((f) => f.fieldId === field.fieldId)?.fieldName}</Button>
                                ))}
                            </Box>
                            <Typography variant="h6" style={styles.sectionTitle}>Number of team members</Typography>
                            <TextField type="number" defaultValue={4} fullWidth margin="normal" />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper style={styles.paper}>
                            <Typography variant="h6" style={styles.sectionTitle}>Project members and supervisors</Typography>
                            <Typography variant="subtitle1">Supervisor</Typography>
                            {projectData?.supervisors.map((supervisor) => (
                                <Box key={supervisor.supervisorName} style={styles.listItem}>
                                    <Avatar alt={supervisor.supervisorName} src="/images/user1.jpg" />
                                    <ListItemText primary={supervisor.supervisorName} />
                                </Box>
                            ))}
                            {/* <Typography variant="subtitle1">Co-Supervisor</Typography>
                            {projectData?.supervisors.map((supervisor) => (
                                <Box key={supervisor.supervisorName} style={styles.listItem}>
                                    <Avatar alt={supervisor.supervisorName} src="/images/user1.jpg" />
                                    <ListItemText primary={supervisor.supervisorName} secondary={supervisor.role} />
                                </Box>
                            ))} */}
                            <Typography variant="subtitle1">Team Members</Typography>
                            <List>
                                {projectData?.students.map((member, index) => (
                                    <ListItem key={index} style={styles.listItem}>
                                        <ListItemAvatar>
                                            <Avatar alt={member.studentName} src={member.pic || "/images/user1.jpg"} />
                                        </ListItemAvatar>
                                        <ListItemText primary={member.studentName} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper style={styles.paper}>
                            <Typography variant="h6" style={styles.sectionTitle}>
                                <Description /> Project Requirements
                            </Typography>
                            <List>
                                {projectData?.projectRequirements?.map((req) => (
                                    <ListItem key={req}>
                                        <ListItemText primary={req} />
                                    </ListItem>
                                ))}
                            </List>
                            {/* <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                startIcon={<Upload />}
                            >
                                Upload File
                            </Button> */}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper style={styles.paper}>
                            <Typography variant="h6" style={styles.sectionTitle}>
                                <InsertDriveFile /> Project Files
                            </Typography>
                            <List>
                                {projectData?.projectFiles?.map((file) => (
                                    <ListItem key={file.name} style={styles.fileItem}>
                                        <ListItemText primary={file.name} />
                                        <Button variant="outlined" color="primary" startIcon={<Download />}>Download</Button>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}