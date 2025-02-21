"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TrackContent from './TrackContent';

interface Track {
  id: string;
  name: string;
}

// Example track data
const tracks: Track[] = [
  { id: 'ai', name: 'Artificial Intelligence' },
  { id: 'frontend', name: 'Front-end' },
  { id: 'backend', name: 'Back-end' },
];

interface Video {
  id: string;
  title: string;
  type: 'video' | 'project' | 'test';
  completed: boolean;
  url: string;
}

interface Section {
  id: string;
  title: string;
  videos: Video[];
}

interface TrackContentProps {
  trackName: string;
  progress: number;
  sections: Section[];
}

// Example AI track content
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

const TrackSelection = () => {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);

  const handleSelect = () => {
    if (selectedTrack) {
      setShowContent(true);
    }
  };

  if (showContent && selectedTrack === 'ai') {
    return <TrackContent {...aiTrackContent} />;
  }

  return (
    <div className="min-h-[90vh] h-[90vh] flex items-center justify-center">
      <div className="w-full h-full flex justify-between items-center">
        {/* Left Side - Logo */}
        <div className="h-full bg-[#0A2647] w-2/5 rounded-r-[70px] flex items-center justify-center">
          <div className="flex justify-center md:justify-end">
            <div className="bg-gray-200 rounded-lg p-8 w-full max-w-md aspect-square flex items-center justify-center">
              <Image
                src="/images/logo-track.png"
                alt="Path2Track Logo"
                width={300}
                height={300}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Track Selection */}
        <div className="p-12 flex items-center justify-center max-md:w-full w-3/5">
          <div className="bg-white rounded-3xl w-full max-w-md">
            <div className="space-y-8">
              <h1 className="text-2xl font-semibold text-center">
                You are not enrolled at any track!
              </h1>

              <div className="space-y-4">
                <h2 className="text-xl font-medium">Choose your track</h2>
                <div className="space-y-4">
                  {tracks.map((track) => (
                    <div
                      key={track.id}
                      className="flex items-center justify-between border-b border-gray-200 py-4 cursor-pointer"
                      onClick={() => setSelectedTrack(track.id)}
                    >
                      <span className="text-lg text-gray-700">{track.name}</span>
                      <div 
                        className={`w-6 h-6 rounded-full border-2 border-[#0A2647] flex items-center justify-center
                          ${selectedTrack === track.id ? 'bg-[#0A2647]' : 'bg-white'}`}
                      >
                        {selectedTrack === track.id && (
                          <div className="w-3 h-3 bg-white rounded-full" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSelect}
                className={`w-full py-3 rounded-md text-white font-medium
                  ${selectedTrack 
                    ? 'bg-[#0A2647] hover:bg-[#0A2647]/90' 
                    : 'bg-gray-300 cursor-not-allowed'}`}
                disabled={!selectedTrack}
              >
                Select
              </button>

              <p className="text-center text-gray-600">
                For help choosing, visit{' '}
                <Link href="/recommendation" className="text-[#0A2647] hover:underline">
                  Recommendation
                </Link>
                !
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackSelection;
