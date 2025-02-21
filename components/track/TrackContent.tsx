"use client";
import { useState, useEffect } from 'react';
import RoadmapSection from './RoadmapSection';

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

const TrackContent = ({ trackName, sections: initialSections }: TrackContentProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [sections, setSections] = useState(initialSections);
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
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h2 className="text-xl text-gray-600">You make a good job, Let's continue!</h2>
            <h1 className="text-2xl font-semibold">{trackName}</h1>
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
