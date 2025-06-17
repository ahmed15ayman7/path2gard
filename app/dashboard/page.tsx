"use client";
import { useState } from 'react';
import EnrollmentCard from '@/components/cards/EnrollmentCard';
import ProgressCard from '@/components/cards/ProgressCard';
import WelcomeCard from '@/components/cards/WelcomeCard';
import { useProjectEnrolled, useTrackEnrolled } from '@/lib/zustand';

export default function Dashboard() {
  const { trackEnrolled, setTrackEnrolled } = useTrackEnrolled();
  const { projectEnrolled, setProjectEnrolled } = useProjectEnrolled();

  // Example data for the track
  const trackData = {
    title: "Artificial Intelligence",
    progress: 62,
    timeline: [
      { date: "SAT", task: "Pandas" },
      { date: "SUN", task: "Numpy" },
      { date: "MON", task: "Seaborn" },
      { date: "TUE", task: "Matplotlib" },
      { date: "WED", task: "KNN" },
    ],
    initialTodos: [
      { id: "1", task: "Pandas", completed: true },
      { id: "2", task: "Numpy", completed: false },
      { id: "3", task: "Seaborn", completed: false },
      { id: "4", task: "Matplotlib", completed: false },
    ],
  };

  // Example data for the project
  const projectData = {
    title: "Hospital System",
    progress: 12,
    timeline: [
      { date: "OCT", task: "UI" },
      { date: "NOV", task: "Diagrams" },
      { date: "DEC", task: "Documentation" },
      { date: "DEC", task: "Database" },
      { date: "JAN", task: "Implementation" },
    ],
    initialTodos: [
      { id: "1", task: "Diagrams", completed: true },
      { id: "2", task: "Documentation", completed: false },
      { id: "3", task: "Database", completed: false },
      { id: "4", task: "Implementation", completed: false },
    ],
  };

  const handleTrackTodoToggle = (todoId: string) => {
    console.log('Track todo toggled:', todoId);
    // Here you can add API call to update the todo status in your backend
  };

  const handleProjectTodoToggle = (todoId: string) => {
    console.log('Project todo toggled:', todoId);
    // Here you can add API call to update the todo status in your backend
  };

  return (
    <div className="p-5">
      <WelcomeCard 
        name="Ahmed"
        progress={1}
        isFirstTime={true}
      />
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        {/* Track Section */}
        <div className="flex justify-center items-center">
          {!trackEnrolled ? (
            <EnrollmentCard
              type="track"
              onEnrollClick={() => {
                setTrackEnrolled(true);
              }}
            />
          ) : (
            <ProgressCard
              type="track"
              {...trackData}
              onTodoToggle={handleTrackTodoToggle}
            />
          )}
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-200 transform -translate-x-1/2" />

        {/* Project Section */}
        <div className="flex justify-center items-center">
          {!projectEnrolled ? (
            <EnrollmentCard
              type="project"
              onEnrollClick={() => {
                setProjectEnrolled(true);
              }}
            />
          ) : (
            <ProgressCard
              type="project"
              {...projectData}
              onTodoToggle={handleProjectTodoToggle}
            />
          )}
        </div>
      </div>
    </div>
  );
}
