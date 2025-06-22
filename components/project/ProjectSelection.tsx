"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { projectApi } from '@/lib/api';

interface ProjectData {
  projectRequirements: string[];
  projectFiles: string[];
  projectTasks: string[];
}

const ProjectSelection = () => {
  const router = useRouter();
  const [projectData, setProjectData] = useState<ProjectData>({
    projectRequirements: [],
    projectFiles: [],
    projectTasks: [],
  });


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        // Replace with your actual API call
        const response = await projectApi.getProjectData();
        const data: ProjectData = response;

        setProjectData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching project data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0A2647]"></div>
      </div>
    );
  }

  const hasData =
    projectData.projectRequirements.length > 0 ||
    projectData.projectFiles.length > 0 ||
    projectData.projectTasks.length > 0;

  if (!hasData) {
    return (
      <div className="min-h-[90vh] h-[90vh] flex items-center justify-center">
        <div className="w-full h-full flex justify-between items-center">
          {/* Left Side - Logo */}
          <div className="h-full bg-[#0A2647] w-2/5 rounded-r-[70px] flex items-center justify-center">
            <div className="flex justify-center md:justify-end">
              <div className="bg-gray-200 rounded-lg p-8 w-full max-w-md aspect-square flex items-center justify-center">
                <Image
                  src="/images/logo-project.png"
                  alt="Path2Project Logo"
                  width={300}
                  height={300}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Project Selection */}
          <div className="p-12 flex items-center justify-center max-md:w-full w-3/5">
            <div className="bg-white rounded-3xl w-full max-w-md">
              <div className="space-y-8">
                <h1 className="text-2xl font-semibold text-center">
                  You are not enrolled at any Project!
                </h1>

                <div className="space-y-4 rounded-lg shadow-lg p-5">
                  <button
                    onClick={() => router.push('/graduation-project/choose')}
                    className="w-full py-3 rounded-md text-[#0A2647] font-medium border-2 border-[#0A2647] hover:bg-[#0A2647] hover:text-white transition-colors"
                  >
                    Choose from projects bank
                  </button>

                  <div className="text-center text-gray-500">or</div>

                  <button
                    onClick={() => router.push('/graduation-project/customize')}
                    className="w-full py-3 rounded-md text-white font-medium bg-[#0A2647] hover:bg-[#0A2647]/90"
                  >
                    Customize my project
                  </button>
                </div>

                <p className="text-center text-gray-600">
                  Need help choosing a project?{' '}
                  <Link href="/recommendation" className="text-[#0A2647] hover:underline">
                    Get a recommendation
                  </Link>
                  !
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render project data if exists
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#0A2647]">Your Project Data</h1>
  
      <div className="grid gap-6 lg:grid-cols-3">
        {projectData.projectRequirements.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-[#0A2647]">
            <h2 className="text-2xl font-semibold text-[#0A2647] mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-[#0A2647]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h6l5 5v11a2 2 0 01-2 2z" />
              </svg>
              Project Requirements
            </h2>
            <ul className="space-y-2">
              {projectData.projectRequirements.map((req: any, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 w-2 h-2 bg-[#0A2647] rounded-full"></span>
                  <span>{req.requirementName}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
  
        {projectData.projectFiles.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-green-600">
            <h2 className="text-2xl font-semibold text-green-700 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h3m10-2a2 2 0 002-2V7a2 2 0 00-2-2h-3M7 7h10M7 17h10M9 3v4m6-4v4" />
              </svg>
              Project Files
            </h2>
            <ul className="space-y-2">
              {projectData.projectFiles.map((file: any, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 w-2 h-2 bg-green-600 rounded-full"></span>
                  <span>{file.fileName}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
  
        {projectData.projectTasks.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-yellow-500">
            <h2 className="text-2xl font-semibold text-yellow-600 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6M5 7h14M12 17v4m0 0H8m4 0h4" />
              </svg>
              Project Tasks
            </h2>
            <ul className="space-y-2">
              {projectData.projectTasks.map((task: any, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>{task.taskName}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default ProjectSelection;
