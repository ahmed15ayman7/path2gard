"use client";

import { doctorApi, studentApi, teachingAssistantApi } from "@/lib/api";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useUserEmail } from '@/lib/zustand';
import { toast } from "react-toastify";

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
    // const [requests, setRequests] = useState(initialRequests);
    let {userEmail} = useUserEmail();
    let [projectRequests, setProjectRequests] = useState([]);
    let [isfinished,setIsFinished] = useState(0);
    useEffect(() => {
        let getProjectRequests = async () => {
            let response =userEmail?.role==="Doctor"?await doctorApi.getProjectRequest():userEmail?.role==="TeachingAssistant"?await teachingAssistantApi.getProjectRequest():await studentApi.getStudentRequest();
            setProjectRequests(response);
        }
        getProjectRequests();
    }, [isfinished]);

    const handleRemove = async (id: number) => {
        let toastId = toast.loading("Request removed...");
        try{
            let response = userEmail?.role==="Doctor"?await doctorApi.statusRequest(id,"Remove",0):userEmail?.role==="TeachingAssistant"?await teachingAssistantApi.statusRequest(id,"Remove",0):await studentApi.statusRequest(id,"Remove",0);
            if(response.status===200){
                toast.update(toastId, { render: "Request removed successfully", type: "success", isLoading: false, autoClose: 3000 });
            }
            setIsFinished(Math.random());
        }catch(error){
            setIsFinished(Math.random());
            toast.update(toastId, { render: "Request failed", type: "error", isLoading: false, autoClose: 3000 });
        }
    };
    
    const handleAccept = async (id: number,projectId:number) => {
        let toastId = toast.loading("Request accepted...");
        try{
            let response = userEmail?.role==="Doctor"?await doctorApi.statusRequest(id,"Accept",projectId):userEmail?.role==="TeachingAssistant"?await teachingAssistantApi.statusRequest(id,"Accept",projectId):await studentApi.statusRequest(id,"Accept",projectId);
            if(response.status===200){
                toast.update(toastId, { render: "Request accepted successfully", type: "success", isLoading: false, autoClose: 3000 });
            }else{
                toast.update(toastId, { render: "Request failed", type: "error", isLoading: false, autoClose: 3000 });
            }
            setIsFinished(Math.random());
        }catch(error){
            setIsFinished(Math.random());
            toast.update(toastId, { render: "Request failed", type: "error", isLoading: false, autoClose: 3000 });
        }
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
                {projectRequests.map((req:any,index:number) => (
                    <Card key={index} sx={{ borderRadius: 2 }}>
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
                                <Avatar alt={req.studentName} src={req.senderPic||"/images/user1.jpg"} />
                                <Typography fontWeight={500}>{req.senderName}</Typography>
                            </Box>

                            {/* Middle: Project Title */}
                            <Typography>{req.projectName}</Typography>

                            {/* Right: Buttons */}
                                {req.status==="Rejected"?<Box display="flex" gap={1}>
                                    <Typography color="error">Rejected</Typography>
                                </Box>:
                            <Box display="flex" gap={1}>
                                <Button
                                    variant="outlined"
                                    onClick={() => handleRemove(req.requestId)}
                                >
                                    Remove
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: primaryColor }}
                                    onClick={() => handleAccept(req.requestId,req.projectId)}
                                >
                                    {req.status==="Pending"?"Accept":"Accept"}
                                </Button>
                            </Box>}
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Box>
    );
}
