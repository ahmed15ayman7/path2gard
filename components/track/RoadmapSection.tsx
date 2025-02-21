"use client";
import { motion, AnimatePresence } from 'framer-motion';

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

interface RoadmapSectionProps {
  section: Section;
  sectionNumber: number;
  isExpanded: boolean;
  onToggle: () => void;
  onVideoToggle: (videoId: string) => void;
}

const RoadmapSection = ({
  section,
  sectionNumber,
  isExpanded,
  onToggle,
  onVideoToggle,
}: RoadmapSectionProps) => {
  const getVideoIcon = (type: string) => {
    switch (type) {
      case 'video':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'project':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      case 'test':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Section Header */}
      <div
        className="p-6 cursor-pointer flex items-center justify-between"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl font-semibold">{sectionNumber}.</span>
          <h3 className="text-xl font-semibold">{section.title}</h3>
        </div>
        <svg
          className={`w-6 h-6 transform transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Videos List */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-3">
              {section.videos.map((video) => (
                <div
                  key={video.id}
                  className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer ${
                    video.completed ? 'text-gray-500' : ''
                  }`}
                  onClick={() => onVideoToggle(video.id)}
                >
                  {/* Icon based on type */}
                  <span className="text-gray-600">{getVideoIcon(video.type)}</span>

                  {/* Title */}
                  <span className={`flex-grow ${video.completed ? 'line-through' : ''}`}>
                    {video.title}
                  </span>

                  {/* Checkbox */}
                  <div
                    className={`w-6 h-6 rounded flex items-center justify-center border-2 
                      ${video.completed 
                        ? 'bg-[#0A2647] border-[#0A2647]' 
                        : video.error 
                          ? 'bg-red-500 border-red-500'
                          : 'border-gray-300'
                      }`}
                  >
                    {video.completed && (
                      <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    {video.error && (
                      <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoadmapSection;
