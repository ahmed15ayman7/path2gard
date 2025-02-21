"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FileText, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SurveyForm from "@/components/recommendation/SurveyForm";

const tracks = [
  {
    name: "AI",
    icon: "/icons/ai.png",
    description: "Artificial Intelligence (AI) is a specialized field of computer science that focuses on creating systems capable of performing tasks that typically require human intelligence. These tasks include problem-solving, decision-making, natural language understanding, vision, learning, and more.",
    prerequisites: [
      "Mathematics",
      "Programming Skills",
      "Machine Learning Basics",
      "Computer Science Fundamentals",
      "AI Tools & Frameworks",
      "Problem-Solving & Research",
      "Soft Skills"
    ],
    articles: [
      "Artificial Intelligence Index Report 2024",
      "Top Artificial Intelligence Trends for 2024",
      "Generative AI: How It's Changing Business and Beyond",
      "AI in Everyday Life: From Assistants to Automation",
      "Ethical Implications of Artificial Intelligence",
      "Top Artificial Intelligence Trends for 2024",
      "AI in Everyday Life: From Assistants to Automation"
    ],
    videos: [
      {
        thumbnail: "/images/ai-roadmap.png",
        title: "Intro to AI"
      },
      {
        thumbnail: "/images/ai-roadmap.png",
        title: "What is AI?"
      },
      {
        thumbnail: "/images/ai-roadmap.png",
        title: "Intro to AI"
      },
      {
        thumbnail: "/images/ai-roadmap.png",
        title: "What is AI?"
      }
    ],
    roadmapImage: "/images/ai-roadmap.png"
  },
  {
    name: "Front end",
    icon: "/icons/ai.png",
    description: "Front-end development focuses on creating the user interface and experience of web applications. It involves working with HTML, CSS, JavaScript, and modern frameworks to build responsive and interactive web interfaces.",
    prerequisites: [
      "HTML & CSS",
      "JavaScript",
      "React/Vue/Angular",
      "Responsive Design",
      "Web Performance",
      "Version Control",
      "UI/UX Principles"
    ],
    articles: [
      "Modern Frontend Development Trends 2024",
      "React vs Vue: Choosing Your Framework",
      "Building Responsive Web Applications",
      "Web Performance Optimization Guide",
      "Frontend Security Best Practices"
    ],
    videos: [
      {
        thumbnail: "/images/frontend-roadmap.png",
        title: "Intro to Frontend"
      },
      {
        thumbnail: "/images/frontend-roadmap.png",
        title: "React Basics"
      }
    ],
    roadmapImage: "/images/frontend-roadmap.png"
  },
  {
    name: "Back end",
    icon: "/icons/ai.png",
    description: "Back-end development deals with server-side logic, databases, and application architecture. It involves creating APIs, managing databases, and handling server operations.",
    prerequisites: [
      "Server-side Languages",
      "Database Management",
      "API Design",
      "Security",
      "System Architecture",
      "Cloud Services",
      "DevOps Basics"
    ],
    articles: [
      "Modern Backend Development Trends 2024",
      "Building Restful APIs with Node.js",
      "Database Design Principles",
      "Security Best Practices for Back-end Development",
    ],
    videos: [
      {
        thumbnail: "/images/backend-roadmap.png",
        title: "Intro to Backend"
      },
      {
        thumbnail: "/images/backend-roadmap.png",
        title: "Node.js Basics"
      }
    ],
    roadmapImage: "/images/backend-roadmap.png"
  },
  {
    name: "Flutter",
    icon: "/icons/ai.png",
    description: "Flutter is Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase.",
    prerequisites: [
      "Dart Programming",
      "Widget Concepts",
      "State Management",
      "Mobile Design",
      "API Integration",
      "Testing",
      "App Publishing"
    ],
    articles: [
      "Modern Flutter Development Trends 2024",
      "Building Responsive Flutter Apps",
      "Flutter Widget Gallery",
      "Flutter Architecture Guide",
      "Flutter Security Best Practices",
    ],
    videos: [{
      thumbnail: "/images/flutter-roadmap.png",
      title: "Intro to Flutter"
    },
    {
      thumbnail: "/images/flutter-roadmap.png",
      title: "What is Flutter?"
    },
    {
      thumbnail: "/images/flutter-roadmap.png",
      title: "Intro to Flutter"
    },
    {
      thumbnail: "/images/flutter-roadmap.png",
      title: "What is Flutter?"
    }],
    roadmapImage: "/images/flutter-roadmap.png"
  },
  {
    name: "Cyber security",
    icon: "/icons/ai.png",
    description: "Cybersecurity focuses on protecting systems, networks, and programs from digital attacks. It involves understanding security principles, threat analysis, and implementing protective measures.",
    prerequisites: [
      "Networking Basics",
      "Operating Systems",
      "Cryptography",
      "Security Tools",
      "Risk Assessment",
      "Incident Response",
      "Ethical Hacking"
    ],
    articles: [
      "Modern Cybersecurity Trends 2024",
      "Cybersecurity Risk Assessment",
      "Incident Response Strategies",
      "Ethical Hacking Essentials",
      "Security Compliance Guidelines"
    ],
    videos: [{
      thumbnail: "/images/cybersecurity-roadmap.png",
      title: "Intro to Cybersecurity"
    },
    {
      thumbnail: "/images/cybersecurity-roadmap.png",
      title: "What is cyber security?"
    },
    {
      thumbnail: "/images/cybersecurity-roadmap.png",
      title: "Intro to Cybersecurity"
    },
    {
      thumbnail: "/images/cybersecurity-roadmap.png",
      title: "What is cyber security?"
    }],
    roadmapImage: "/images/cybersecurity-roadmap.png"
  }
];

export default function RecommendationPage() {
  const [selectedTrack, setSelectedTrack] = useState(tracks[0]);
  const [showSurvey, setShowSurvey] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Header Section */}
      <div className="text-center space-y-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Confused about which track suits you best?, let's do it together
        </h1>
        <Button 
          onClick={() => setShowSurvey(true)}
          className="bg-white text-[#0A2647] border border-[#0A2647] hover:bg-[#0A2647] hover:text-white transition-colors"
        >
          Start Survey!
        </Button>
      </div>

      {showSurvey && <SurveyForm onClose={() => setShowSurvey(false)} />}

      {/* Tracks Section */}
      <div className="space-y-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          Computer Science Tracks
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {tracks.map((track) => (
            <div
              key={track.name}
              onClick={() => setSelectedTrack(track)}
              className={`bg-white rounded-lg p-4 flex flex-col items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer ${
                selectedTrack.name === track.name ? 'ring-2 ring-[#0A2647] scale-105' : ''
              }`}
            >
              <div className="relative w-20 h-20">
                <Image
                  src={track.icon}
                  alt={track.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium text-center">{track.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Track Details Section */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedTrack.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold mb-4">{selectedTrack.name}</h3>
            <p className="text-sm text-gray-600">{selectedTrack.description}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold mb-4">{selectedTrack.name} Prerequisites</h3>
            <ul className="space-y-2">
              {selectedTrack.prerequisites.map((prereq, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {index + 1}. {prereq}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold mb-4">ROADMAP OF {selectedTrack.name.toUpperCase()} ENGINEER</h3>
            <div className="relative w-full h-48">
              <Image
                src={selectedTrack.roadmapImage}
                alt={`${selectedTrack.name} Roadmap`}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Articles and Videos Section */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedTrack.name + "-content"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Articles */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Articles</h2>
            <div className="space-y-4">
              {selectedTrack.articles.length > 0 ? (
                selectedTrack.articles.map((article, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <FileText className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">{article}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Coming soon...</p>
              )}
            </div>
          </div>

          {/* Videos */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Videos</h2>
            <div className="grid grid-cols-2 gap-4">
              {selectedTrack.videos.length > 0 ? (
                selectedTrack.videos.map((video, index) => (
                  <div
                    key={index}
                    className="group relative cursor-pointer"
                  >
                    <div className="relative w-full h-32 rounded-lg overflow-hidden">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <p className="text-sm font-medium mt-2">{video.title}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 col-span-2">Coming soon...</p>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
