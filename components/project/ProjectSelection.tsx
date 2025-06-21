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
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Your Project Data</h1>

      {projectData.projectRequirements.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <h2 className="text-xl font-semibold mb-2">Project Requirements</h2>
          <ul className="list-disc pl-5 space-y-1">
            {projectData.projectRequirements.map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      {projectData.projectFiles.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <h2 className="text-xl font-semibold mb-2">Project Files</h2>
          <ul className="list-disc pl-5 space-y-1">
            {projectData.projectFiles.map((file, idx) => (
              <li key={idx}>{file}</li>
            ))}
          </ul>
        </div>
      )}

      {projectData.projectTasks.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <h2 className="text-xl font-semibold mb-2">Project Tasks</h2>
          <ul className="list-disc pl-5 space-y-1">
            {projectData.projectTasks.map((task, idx) => (
              <li key={idx}>{task}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProjectSelection;
