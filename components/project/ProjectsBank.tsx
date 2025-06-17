"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter, useSearchParams } from 'next/navigation';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  status: string;
}

interface Team {
  composition: {
    backend?: number;
    frontend?: number;
    ai?: number;
    flutter?: number;
    mobile?: number;
  };
  supervisor: TeamMember;
  coSupervisor: TeamMember;
  members: TeamMember[];
}

interface Project {
  id: string;
  title: string;
  icon: string;
  description: string;
  specification: string;
  team: Team;
  fields: string[];
}

const ProjectsBank = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects');
        const fetchedProjects = response.data;
        setProjects(fetchedProjects);
        
        // Get selected project from URL or default to first project
        const selectedId = searchParams.get('project');
        const selected = selectedId 
          ? fetchedProjects.find((p: Project) => p.id === selectedId)
          : fetchedProjects[0];
        
        setSelectedProject(selected);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, [searchParams]);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    router.push(`/graduation-project/choose?project=${project.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0A2647]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Projects Bank</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Project List */}
        <div className="lg:col-span-1 space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all
                ${selectedProject?.id === project.id 
                  ? 'border-[#0A2647] bg-[#0A2647]/5' 
                  : 'border-gray-200 hover:border-[#0A2647]'
                }`}
              onClick={() => handleProjectSelect(project)}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{project.icon}</span>
                <div>
                  <h3 className="font-medium">{project.title}</h3>
                  <p className="text-sm text-gray-600">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side - Project Details */}
        {selectedProject && (
          <div className="lg:col-span-2 space-y-8">
            {/* Project Header */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <span className="text-4xl">{selectedProject.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                  <p className="text-gray-600">{selectedProject.description}</p>
                </div>
              </div>
            </div>

            {/* Project Specification */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Project Specification</h3>
              <p className="text-gray-600">{selectedProject.specification}</p>
            </div>

            {/* Team Composition */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Team Composition</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(selectedProject?.team?.composition||{}).map(([role, count]:any) => (
                  <div key={role} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium capitalize">{role}</div>
                    <div className="text-lg font-bold text-[#0A2647]">{count}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Fields */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Project Fields</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject?.fields?.map((field) => (
                  <span
                    key={field}
                    className="px-3 py-1 bg-[#0A2647]/10 text-[#0A2647] rounded-full text-sm"
                  >
                    {field}
                  </span>
                ))}
              </div>
            </div>

            {/* Connect With Members */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-6">Connect With Members</h3>
              
              {/* Supervisor */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={selectedProject?.team?.supervisor?.image} />
                      <AvatarFallback>
                        {selectedProject?.team?.supervisor?.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{selectedProject?.team?.supervisor?.name}</div>
                      <div className="text-sm text-gray-500">Supervisor</div>
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    selectedProject?.team?.supervisor?.status === 'online' 
                      ? 'bg-green-500' 
                      : 'bg-gray-300'
                  }`} />
                </div>

                {/* Co-Supervisor */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={selectedProject?.team?.coSupervisor?.image} />
                      <AvatarFallback>
                        {selectedProject?.team?.coSupervisor?.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{selectedProject?.team?.coSupervisor?.name}</div>
                      <div className="text-sm text-gray-500">Co-Supervisor</div>
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    selectedProject?.team?.coSupervisor?.status === 'online' 
                      ? 'bg-green-500' 
                      : 'bg-gray-300'
                  }`} />
                </div>

                {/* Team Members */}
                {selectedProject?.team?.members?.map((member:any, index:any) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.image} />
                        <AvatarFallback>
                          {member.name
                            .split(' ')
                            .map((n:any) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.role}</div>
                      </div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      member.status === 'online' ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  </div>
                ))}

                {/* Add Team Member Button */}
                <button className="w-full mt-4 flex items-center justify-center gap-2 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#0A2647] hover:text-[#0A2647] transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add team member
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button className="w-full py-3 bg-[#0A2647] text-white rounded-lg hover:bg-[#0A2647]/90 transition-colors">
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsBank;
