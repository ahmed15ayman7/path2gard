"use client";

import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FileIcon, DownloadIcon } from "@/components/icons";
import ProjectTasks from "@/components/project/ProjectTasks";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { Project } from "next/dist/build/swc/types";
import { projectApi } from "@/lib/api";

interface ProjectFile {
  name: string;
  type: string;
}
export default function ProjectFilesPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectFilesPage  />
    </Suspense>
  );
}
const ProjectFilesPage = () => {
  let searchParams = useSearchParams();
  let id = searchParams.get("id");
  let [project, setProject] = useState<any>();
  const [files, setFiles] = useState<ProjectFile[]>([
    // { name: "NUB_GP 2024-2025.xlsx", type: "xlsx" },
    // { name: "GP-abstract.docx", type: "docx" },
    // { name: "Project Concept and Plan Template.docx", type: "docx" },
    // { name: "GP-Template.docx", type: "docx" },
  ]);
useEffect(() => {
  let getProject = async () => {
    let response = await fetch(`/api/projects?id=${id}`);
    console.log(response);
    let data = await response.json();
    setProject(data[0]);
  }
  getProject();
}, [project]);
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles) {
      const newFiles = Array.from(uploadedFiles).map((file) => ({
        name: file.name,
        type: file.name.split(".").pop() || "",
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };
  // const { updateProject } = useProjectStore();
  const router = useRouter();
  const handleSubmit = async (project: any) => {
    // console.log("Submit Project");
    let response=await projectApi.customizeProject({
      projectName: project.projectName,
      description: project.description,
      fields: project.fields,
      numberOfTeam: project.numberOfTeam,
    })
    console.log(response)
    // await fetch(`/api/projects`, {
    //   method: "PUT",
    //   body: JSON.stringify({...project, projectFiles: files.map((file) => ({
    //     name: file.name,
    //     url: file.name,
    //   })), projectRequirements: files.map((file) => file.name),id}),
    // });
    if(response){
      toast.success("Project submitted successfully");
      router.push("/dashboard");
    }else{
      toast.error("Project submitted failed");
    }
  };

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Side - Project Requirements & Tasks */}
          <div className="space-y-8">
            {/* Project Requirements */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl lg:text-2xl font-semibold mb-6">Project Requirements</h2>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-lg shadow gap-4">
                  <div className="flex items-center gap-3">
                    <FileIcon className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Project 1st term requirements</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="bg-[#F5F7F4] hover:bg-[#E8EBE7] text-black w-full sm:w-auto"
                  >
                    <DownloadIcon className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-lg shadow gap-4">
                  <div className="flex items-center gap-3">
                    <FileIcon className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Project 2nd term requirements</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="bg-[#F5F7F4] hover:bg-[#E8EBE7] text-black w-full sm:w-auto"
                  >
                    <DownloadIcon className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>

            {/* Project Tasks Section */}
            <ProjectTasks />
          </div>

          {/* Right Side - Project Files */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl lg:text-2xl font-semibold mb-6">Project Files</h2>
            <div className="space-y-4">
              <div className="grid gap-4">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-white rounded-lg shadow"
                  >
                    <FileIcon className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm sm:text-base break-all">{file.name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                >
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg
                      className="w-5 h-5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span className="text-sm sm:text-base">Upload File</span>
                  </div>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
            <Button variant="outline" className="w-full" onClick={() => handleSubmit(project!)}>
              Submit Project
            </Button>
          </div>
      </div>
    </div>
  );
};

