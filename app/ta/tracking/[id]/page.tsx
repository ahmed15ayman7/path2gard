"use client";
import { useState, useEffect, use } from 'react';
import RoadmapSection from '@/components/track/RoadmapSection';
import { Box, Avatar, Typography } from '@mui/material';
interface Video {
    id: string;
    title: string;
    type: 'video' | 'project' | 'test';
    completed: boolean;
    url: string;
    error?: boolean;
}

interface Section {
    id: string;
    title: string;
    videos: Video[];
}

interface TrackContentProps {
    trackName: string;
    sections: Section[];
    progress?: number;
}
const data = [
    { name: "Ayman Salim Reda", id: 211050165, track: "AI", percentage: 62 },
    { name: "Ayman Salim Reda", id: 210105205, track: "AI", percentage: 85 },
    { name: "Ayman Salim Reda", id: 205424242, track: "AI", percentage: 47 },
    { name: "Ayman Salim Reda", id: 214240285, track: "AI", percentage: 52 },
    { name: "Ayman Salim Reda", id: 211050165, track: "AI", percentage: 68 },
];
const aiTrackContent: TrackContentProps = {
    trackName: "Artificial Intelligence",
    progress: 39,
    sections: [
        {
            id: "python",
            title: "Python",
            videos: [
                { id: "1", title: "Introduction to python programming, Arabic course", type: "video" as const, completed: true, url: "" },
                { id: "2", title: "OOP using python - Udemy", type: "video" as const, completed: true, url: "" },
                { id: "3", title: "Pandas library in python, Docs", type: "project" as const, completed: false, url: "" },
                { id: "4", title: "Project", type: "project" as const, completed: false, url: "" },
                { id: "5", title: "Test", type: "test" as const, completed: false, url: "" },
            ]
        },
        {
            id: "data-viz",
            title: "Data Visualization",
            videos: [
                { id: "6", title: "Introduction to data visualization with Matplotlib", type: "video" as const, completed: true, url: "" },
                { id: "7", title: "Introduction to data visualization with Seaborn, Kaggle", type: "video" as const, completed: false, url: "" },
                { id: "8", title: "Power BI Training, Arabic course", type: "video" as const, completed: false, url: "" },
                { id: "9", title: "Project & tutorials", type: "project" as const, completed: false, url: "" },
                { id: "10", title: "Project", type: "project" as const, completed: false, url: "" },
                { id: "11", title: "Test", type: "test" as const, completed: false, url: "" },
            ]
        },
        {
            id: "ml",
            title: "Machine Learning",
            videos: [
                { id: "12", title: "Coursera - Old Course by Andrew Ng (Octave)/MATLAB", type: "video" as const, completed: true, url: "" },
                { id: "13", title: "Coursera Andrew's new ML Specialization (Python)", type: "video" as const, completed: true, url: "" },
                { id: "14", title: "CS480/680 Intro to Machine Learning - Spring 2019 - University of Waterloo", type: "video" as const, completed: true, url: "" },
                { id: "15", title: "IBM ML with Python", type: "project" as const, completed: false, url: "" },
                { id: "16", title: "Machine Learning for Engineers 2022 / (YouTube)", type: "video" as const, completed: false, url: "" },
                { id: "17", title: "Machine Learning From Scratch - YouTube (Python Engineer)", type: "video" as const, completed: false, url: "" },
                { id: "18", title: "ML scientist", type: "project" as const, completed: false, url: "" },
                { id: "19", title: "Introduction to Machine Learning Course - Udacity", type: "video" as const, completed: false, url: "" },
                { id: "20", title: "ML Projects", type: "project" as const, completed: false, url: "" },
                { id: "21", title: "Test", type: "test" as const, completed: false, url: "" },
            ]
        },
        {
            id: "dl",
            title: "Deep Learning",
            videos: [
                { id: "22", title: "Deep Learning Fundamentals", type: "video" as const, completed: true, url: "" },
                { id: "23", title: "Introduction to Deep Learning - MIT", type: "video" as const, completed: true, url: "" },
                { id: "24", title: "Deep Learning for coders with fastai & PyTorch", type: "project" as const, completed: false, url: "" },
                { id: "25", title: "Project", type: "project" as const, completed: false, url: "" },
                { id: "26", title: "Test", type: "test" as const, completed: false, url: "" },
            ]
        }
    ]
};

const TrackContent = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const [sections, setSections] = useState(aiTrackContent.sections);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const totalSections = sections.length;
        const progressPerSection = 100 / totalSections;

        const completedProgress = sections.reduce((total, section) => {
            const totalVideos = section.videos.length;
            const progressPerVideo = progressPerSection / totalVideos;
            const completedVideos = section.videos.filter(video => video.completed).length;
            return total + (completedVideos * progressPerVideo);
        }, 0);

        setProgress(Math.round(completedProgress));
    }, [sections]);

    const handleVideoToggle = (sectionId: string, videoId: string) => {
        setSections(prevSections => {
            return prevSections.map(section => {
                if (section.id !== sectionId) return section;

                const videoIndex = section.videos.findIndex(v => v.id === videoId);

                const allPreviousCompleted = section.videos
                    .slice(0, videoIndex)
                    .every(v => v.completed);

                if (!allPreviousCompleted) {
                    return {
                        ...section,
                        videos: section.videos.map(video =>
                            video.id === videoId
                                ? { ...video, error: true }
                                : video
                        )
                    };
                }

                return {
                    ...section,
                    videos: section.videos.map(video =>
                        video.id === videoId
                            ? { ...video, completed: !video.completed, error: false }
                            : video
                    )
                };
            });
        });
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <Box display="flex" alignItems="center">
                    <Avatar
                        alt={data.find(item => +item.id === +id)?.name || ""}
                        src="/images/user1.jpg"
                        sx={{ marginRight: 2 }}
                    />
                    <Typography variant="body1">{data.find(item => +item.id === +id)?.name || ""}</Typography>
                </Box>
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <h2 className="text-xl text-gray-600">You make a good job, Let's continue!</h2>
                        <h1 className="text-2xl font-semibold">{aiTrackContent.trackName}</h1>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative w-20 h-20">
                            <div className="w-full h-full rounded-full bg-[#0A2647] flex items-center justify-center">
                                <span className="text-white text-xl font-bold">{progress}%</span>
                            </div>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#0A2647] transition-all duration-500 ease-in-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>
                <h3 className="text-xl font-medium">Roadmap:</h3>
            </div>

            <div className="space-y-4">
                {sections.map((section, index) => (
                    <RoadmapSection
                        key={section.id}
                        section={section}
                        sectionNumber={index + 1}
                        isExpanded={expandedSection === section.id}
                        onToggle={() => setExpandedSection(
                            expandedSection === section.id ? null : section.id
                        )}
                        onVideoToggle={(videoId) => handleVideoToggle(section.id, videoId)}
                    />
                ))}
            </div>
        </div>
    );
};

export default TrackContent;
