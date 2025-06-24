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
} from "@mui/material";
import { Description, InsertDriveFile, Upload } from "@mui/icons-material";
import { Download } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { downListApi, projectAdminApi } from "@/lib/api";

const theme = createTheme({
    palette: {
        primary: {
            main: "#0A2647",
        },
    },
});

interface Project {
    id: number;
    icon: string;
    title: string;
    projectName: string;
    projectDescription: string;
    projectField: string[];
    teamSize: number;
    members: {
        id: string;
        name: string;
        image: string;
        field: string;
        role: string;
    }[];
    supervisor: {
        id: string;
        name: string;
        image: string;
        field: string;
        role: string;
    };
    projectFiles: { name: string; url: string }[];
    projectRequirements: string[];
}

export default function ProjectDetails({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const [projectData, setProjectData] = useState<Project | null>(null);
    let [projectFields, setProjectFields] = useState<{
        fieldId: number;
        fieldName: string;
    }[]>([]);
    useEffect(() => {
        let getProjectData = async () => {
            let response = await projectAdminApi.getProjectById(id);
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

    if (!projectData) {
        return <div className="flex justify-center items-center h-screen">
            <div className="text-2xl font-bold"> ❌ No project found</div>
        </div>;
    }

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
                    <Grid item xs={12} md={6}>
                        <Paper style={styles.paper}>
                            <Typography variant="h6" style={styles.sectionTitle}>{projectData.title}</Typography>
                            {/* <TextField label="Project Name" defaultValue={projectData.projectName} fullWidth margin="normal" /> */}
                            <Typography variant="h6" style={styles.sectionTitle}>Brief About Project</Typography>
                            <TextField  multiline rows={4} defaultValue={projectData.projectDescription} fullWidth margin="normal" />
                            <Typography variant="h6" style={styles.sectionTitle}>Project Field</Typography>
                            <Box display="flex" gap={1}>
                                {projectData.projectField.map((field: any) => (
                                    <Button key={field} variant="outlined" color="primary" size="small">{field}</Button>
                                ))}
                            </Box>
                            <Typography variant="h6" style={styles.sectionTitle}>Number of team members</Typography>
                            <TextField type="number" defaultValue={projectData.teamSize} fullWidth margin="normal" />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper style={styles.paper}>
                            <Typography variant="h6" style={styles.sectionTitle}>Project members and supervisors</Typography>
                            <Typography variant="subtitle1">Supervisor</Typography>
                            {projectData.supervisor && (
                                <Box key={projectData.supervisor.id} style={styles.listItem}>
                                    <Avatar alt={projectData.supervisor.name} src={projectData.supervisor.image} />
                                    <ListItemText primary={projectData.supervisor.name} secondary={projectData.supervisor.role} />
                                </Box>
                            )}
                            {/* <Typography variant="subtitle1">Co-Supervisor</Typography>
                            {project.supervisor && (
                                <Box key={project.supervisor.id} style={styles.listItem}>
                                    <Avatar alt={project.supervisor.name} src={project.supervisor.image} />
                                    <ListItemText primary={project.supervisor.name} secondary={project.supervisor.role} />
                                </Box>
                            )} */}
                            <Typography variant="subtitle1">Team Members</Typography>
                            <List>
                                {projectData.members?.map((member: any) => (
                                    <ListItem key={member.id} style={styles.listItem}>
                                        <ListItemAvatar>
                                            <Avatar alt={member.name} src={member.image} />
                                        </ListItemAvatar>
                                        <ListItemText primary={member.name} secondary={member.role} />
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
                                {projectData.projectRequirements.map((req: any) => (
                                    <ListItem key={req}>
                                        <ListItemText primary={req} />
                                    </ListItem>
                                ))}
                            </List>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                startIcon={<Upload />}
                            >
                                Upload File
                            </Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper style={styles.paper}>
                            <Typography variant="h6" style={styles.sectionTitle}>
                                <InsertDriveFile /> Project Files
                            </Typography>
                            <List>
                                {projectData.projectFiles.map((file: any) => (
                                    <ListItem key={file.name} style={styles.fileItem}>
                                        <ListItemText primary={file.name} />
                                        <Button variant="outlined" color="primary" startIcon={<Download />}>Download</Button>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
                <div className="flex justify-center items-center my-4 gap-4">
                    <Button variant="contained" color="primary" onClick={() => {
                        fetch(`/api/projects/${id}`, {
                            method: "PUT",
                            body: JSON.stringify(projectData),
                        });
                        router.push("/admin/graduation-project");
                    }}>
                        Submit Project
                    </Button>
                    <Button variant="contained" color="error" onClick={() => {
                        fetch(`/api/projects?id=${id}`, {
                            method: "DELETE",
                        });
                        router.push("/admin/graduation-project");
                    }}>
                        Delete Project
                    </Button>
                </div>
            </Container>
        </ThemeProvider>
    );
}