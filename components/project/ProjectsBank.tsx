"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { projectApi } from '@/lib/api';

interface Project {
  projectId: number;
  projectName: string;
  projectDescripition: string;
}

interface ProjectDetails {
  projectId: string;
  projectName: string;
  projectDescripition: string;
  projectSpecification: string;
  projectFields: {
    projectFieldId: number;
    projectField: string;
  }[];
}

const ProjectsBank = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectSelectedData, setProjectSelectedData] = useState<ProjectDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectApi.getProjects();
        const fetchedProjects: Project[] = response;
        setProjects(fetchedProjects);

        const selectedId = searchParams.get('project');
        const selected = selectedId
          ? fetchedProjects.find((p) => p.projectId === Number(selectedId))
          : fetchedProjects[0];

        if (selected) {
          setSelectedProject(selected);
          await fetchProjectDetails(selected.projectId);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    const fetchProjectDetails = async (projectId: number) => {
      try {
        const details = await projectApi.getProjectsById(projectId.toString()); // مثال: API لجلب تفاصيل المشروع
        setProjectSelectedData(details);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjects();
  }, [searchParams]);

  const handleProjectSelect = async (project: Project) => {
    setSelectedProject(project);
    router.push(`/graduation-project/choose?project=${project.projectId}`);
    await fetchProjectDetails(project.projectId);
  };

  const fetchProjectDetails = async (projectId: number) => {
    try {
      const details = await projectApi.getProjectsById(projectId.toString());
      setProjectSelectedData(details);
    } catch (error) {
      console.error('Error fetching project details:', error);
    }
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
        {/* Project List */}
        <div className="lg:col-span-1 space-y-4">
          {projects.map((project) => (
            <div
              key={project.projectId}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all
                ${selectedProject?.projectId === project.projectId
                  ? 'border-[#0A2647] bg-[#0A2647]/5'
                  : 'border-gray-200 hover:border-[#0A2647]'
                }`}
              onClick={() => handleProjectSelect(project)}
            >
              <div>
                <h3 className="font-medium">{project.projectName}</h3>
                <p className="text-sm text-gray-600">{project.projectDescripition}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Project Details */}
        {selectedProject && (
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-2">{selectedProject.projectName}</h2>
              <p className="text-gray-600">{selectedProject.projectDescripition}</p>

              {projectSelectedData && (
                <>
                  <h3 className="text-xl font-semibold mt-4">Specification</h3>
                  <p className="text-gray-600">{projectSelectedData.projectSpecification}</p>

                  <h3 className="text-xl font-semibold mt-4">Fields</h3>
                  <div className="flex flex-wrap gap-2">
                    {projectSelectedData.projectFields.map((field) => (
                      <span
                        key={field.projectFieldId}
                        className="px-3 py-1 bg-[#0A2647]/10 text-[#0A2647] rounded-full text-sm"
                      >
                        {field.projectField}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button
              className="w-full py-3 bg-[#0A2647] text-white rounded-lg hover:bg-[#0A2647]/90 transition-colors"
              onClick={() =>
                router.push(
                  `/graduation-project/customize?projectName=${selectedProject.projectName}&projectDescription=${selectedProject.projectDescripition}`
                )
              }
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsBank;
