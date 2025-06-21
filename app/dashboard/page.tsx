// "use client";
// import { useEffect, useState } from 'react';
// import EnrollmentCard from '@/components/cards/EnrollmentCard';
// import ProgressCard from '@/components/cards/ProgressCard';
// import WelcomeCard from '@/components/cards/WelcomeCard';
// import { useProjectEnrolled, useTrackEnrolled, useUserEmail } from '@/lib/zustand';
// import { userApi } from '@/lib/api';
// import { useSession } from 'next-auth/react';
// import { log } from 'console';
// export default function Dashboard() {
//   const [userdata,setuserdata] = useState<any>({})
//   const { trackEnrolled, setTrackEnrolled } = useTrackEnrolled();
//   const { projectEnrolled, setProjectEnrolled } = useProjectEnrolled();
//   const {userEmail}=useUserEmail()
//  useEffect(()=>{

//    const getuserdata = async () => {
//     console.log("getuserdata");
//      const userdata = await userApi.getuserdata(userEmail?.role!)
//      setuserdata(userdata)
//      console.log(userdata);
//   }
//   getuserdata()
//  },[])    
//   // Example data for the track
//   const trackData = {
//     title: "Artificial Intelligence",
//     progress: 62,
//     timeline: [
//       { date: "SAT", task: "Pandas" },
//       { date: "SUN", task: "Numpy" },
//       { date: "MON", task: "Seaborn" },
//       { date: "TUE", task: "Matplotlib" },
//       { date: "WED", task: "KNN" },
//     ],
//     initialTodos: [
//       { id: "1", task: "Pandas", completed: true },
//       { id: "2", task: "Numpy", completed: false },
//       { id: "3", task: "Seaborn", completed: false },
//       { id: "4", task: "Matplotlib", completed: false },
//     ],
//   };

//   // Example data for the project
//   const projectData = {
//     title: "Hospital System",
//     progress: 12,
//     timeline: [
//       { date: "OCT", task: "UI" },
//       { date: "NOV", task: "Diagrams" },
//       { date: "DEC", task: "Documentation" },
//       { date: "DEC", task: "Database" },
//       { date: "JAN", task: "Implementation" },
//     ],
//     initialTodos: [
//       { id: "1", task: "Diagrams", completed: true },
//       { id: "2", task: "Documentation", completed: false },
//       { id: "3", task: "Database", completed: false },
//       { id: "4", task: "Implementation", completed: false },
//     ],
//   };

//   const handleTrackTodoToggle = (todoId: string) => {
//     console.log('Track todo toggled:', todoId);
//     // Here you can add API call to update the todo status in your backend
//   };

//   const handleProjectTodoToggle = (todoId: string) => {
//     console.log('Project todo toggled:', todoId);
//     // Here you can add API call to update the todo status in your backend
//   };

//   return (
//     <div className="p-5">
//       <WelcomeCard 
//         name={userdata.studentName}
//         progress={1}
//         isFirstTime={true}
//       />
//       <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
//         {/* Track Section */}
//         <div className="flex justify-center items-center">
//           {!trackEnrolled ? (
//             <EnrollmentCard
//               type="track"
//               onEnrollClick={() => {
//                 setTrackEnrolled(true);
//               }}
//             />
//           ) : (
//             <ProgressCard
//               type="track"
//               {...trackData}
//               onTodoToggle={handleTrackTodoToggle}
//             />
//           )}
//         </div>

//         {/* Vertical Divider */}
//         <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-200 transform -translate-x-1/2" />

//         {/* Project Section */}
//         <div className="flex justify-center items-center">
//           {!projectEnrolled ? (
//             <EnrollmentCard
//               type="project"
//               onEnrollClick={() => {
//                 setProjectEnrolled(true);
//               }}
//             />
//           ) : (
//             <ProgressCard
//               type="project"
//               {...projectData}
//               onTodoToggle={handleProjectTodoToggle}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import EnrollmentCard from "@/components/cards/EnrollmentCard";
import ProgressCard from "@/components/cards/ProgressCard";
import WelcomeCard from "@/components/cards/WelcomeCard";
import { useProjectEnrolled, useTrackEnrolled, useUserEmail } from "@/lib/zustand";
import { userApi,trackApi } from "@/lib/api";

export default function Dashboard() {
  const [userdata, setuserdata] = useState<any>({});
  const [trackRate, setTrackRate] = useState<any>({});
  const [trackData, setTrackData] = useState<any[]>([]);  
  const { trackEnrolled, setTrackEnrolled } = useTrackEnrolled();
  const { projectEnrolled, setProjectEnrolled } = useProjectEnrolled();
  const { userEmail } = useUserEmail();
  useEffect(() => {
    const getuserdata = async () => {
      console.log("getuserdata");
      const userdata = await userApi.getuserdata(userEmail?.role!);
      setuserdata(userdata);
      console.log(userdata);
    };
    getuserdata();
    const getTrackRate = async () => {
      const trackRate = await trackApi.getTrackRate();
      setTrackRate(trackRate);
      console.log(trackRate);
    };
    getTrackRate();
    const getTrackData = async () => {
      const trackData = await trackApi.getTrack();
      setTrackData(trackData);
      console.log(trackData);
    };
    getTrackData();
  }, []);

  // AI Track converted to nested lessons/items format
  // const trackData = {
  //   trackName: "Artificial Intelligence",
  //   items: [
  //     {
  //       itemName: "Python Data Libraries",
  //       lessons: [
  //         { lessonName: "Pandas", isComplet: true },
  //         { lessonName: "Numpy", isComplet: true },
  //         { lessonName: "Seaborn", isComplet: false },
  //         { lessonName: "Matplotlib", isComplet: false },
  //       ],
  //     },
  //     {
  //       itemName: "Machine Learning Algorithms",
  //       lessons: [{ lessonName: "KNN", isComplet: false }],
  //     },
  //   ],
  // };
  // let progress = trackData.items.reduce((acc: number, item: any) => {
  //   return acc + item.lessons.filter((lesson: any) => lesson.isComplet).length;
  // }, 0)/ trackData.items.length;

  const projectData = {
    trackName: "Hospital System",
    items: [
      {
        itemName: "System Design",
        lessons: [
          { lessonName: "UI", isComplet: false },
          { lessonName: "Diagrams", isComplet: true },
          { lessonName: "Documentation", isComplet: false },
        ],
      },
      {
        itemName: "Development Phase",
        lessons: [
          { lessonName: "Database", isComplet: false },
          { lessonName: "Implementation", isComplet: false },
        ],
      },
    ],
  };

  const handleTrackTodoToggle = async (lessonName: string,isComplet:boolean) => {
    const response = await trackApi.updateTrack(lessonName,isComplet);
    console.log("Track lesson toggled:", lessonName);
    // Add backend update logic if needed
  };

  const handleProjectTodoToggle = async (lessonName: string,isComplet:boolean) => {
    // const response = await trackApi.updateTrack(lessonName,isComplet);
    console.log("Project lesson toggled:", lessonName);
    // Add backend update logic if needed
  };

  return (
    <div className="p-5">
      <WelcomeCard name={userdata.studentName} progress={Math.ceil(trackRate.percentComplete)} isFirstTime={true} />

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
            trackData.map((item:any,index:number)=>(
              <ProgressCard
                key={index}
                type="track"
                data={item}
                onTodoToggle={handleTrackTodoToggle}
              />
            ))
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
              data={projectData}
              onTodoToggle={handleProjectTodoToggle}
            />
          )}
        </div>
      </div>
    </div>
  );
}
