"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProjectsBank from "@/components/project/ProjectsBank";

function ProjectBankPage() {
  const searchParams = useSearchParams();
  
  return (
    <div>
      <ProjectsBank />
    </div>
  );
}

export default function ProjectBankPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectBankPage />
    </Suspense>
  );
}
