import CustomizeProject from "@/components/project/CustomizeProject";
import { Suspense } from "react";

export  function CustomizeProjectPage() {
  return <CustomizeProject />;
}
export default function CustomizeProjectPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomizeProjectPage />
    </Suspense>
  );
}
