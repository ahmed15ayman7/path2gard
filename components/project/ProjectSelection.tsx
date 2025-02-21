"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ProjectsBank from './ProjectsBank';

const ProjectSelection = () => {
  const router = useRouter();
  const [showProjectsBank, setShowProjectsBank] = useState(false);

  if (showProjectsBank) {
    return <ProjectsBank />;
  }

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
};

export default ProjectSelection;
