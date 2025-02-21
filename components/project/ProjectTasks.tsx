"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CalendarIcon, Plus } from "@/components/icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  name: string;
  assignedTo: {
    name: string;
    avatar: string;
    field: string;
  };
  deadline: Date;
  completed: boolean;
}

const ProjectTasks = () => {
  const [showNewTask, setShowNewTask] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      name: "Complete project requirements",
      assignedTo: {
        name: "Ahmed Ayman",
        avatar: "/avatars/01.png",
        field: "Frontend Developer",
      },
      deadline: new Date(2024, 2, 28),
      completed: false,
    },
    {
      id: "2",
      name: "UI",
      assignedTo: {
        name: "Rania Mohamed",
        avatar: "/images/user1.jpg",
        field: "Front-End",
      },
      deadline: new Date("2024-02-23"),
      completed: false,
    },
    {
      id: "3",
      name: "Database",
      assignedTo: {
        name: "Ayman Salim Reda",
        avatar: "/images/user1.jpg",
        field: "Back-End",
      },
      deadline: new Date("2024-12-15"),
      completed: false,
    },
    {
      id: "4",
      name: "SRS",
      assignedTo: {
        name: "Nagwa Ahmed",
        avatar: "/images/user1.jpg",
        field: "Flutter",
      },
      deadline: new Date("2024-12-25"),
      completed: false,
    },
  ]);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    completed: false,
  });

  const handleAddTask = () => {
    if (newTask.name && newTask.assignedTo && newTask.deadline) {
      setTasks((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          name: newTask.name!,
          assignedTo: newTask.assignedTo!,
          deadline: newTask.deadline!,
          completed: false,
        },
      ]);
      setNewTask({ completed: false });
      setShowNewTask(false);
    }
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const teamMembers = [
    {
      name: "Ahmed Ayman",
      avatar: "/avatars/01.png",
      field: "Frontend Developer",
    },
    {
      name: "Rania Mohamed Gamal",
      avatar: "/images/user1.jpg",
      field: "Front-End",
    },
    {
      name: "Nagwa Ahmed Mahmoud",
      avatar: "/images/user1.jpg",
      field: "Flutter",
    },
  ];

  return (
    <div className="space-y-6 bg-white rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Project Tasks</h2>
        <Button
          onClick={() => setShowNewTask(!showNewTask)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add new task
        </Button>
      </div>

      {showNewTask && (
        <div className="bg-white p-4 rounded-lg shadow space-y-4">
          <input
            type="text"
            placeholder="Task name"
            className="w-full p-2 border rounded"
            value={newTask.name || ""}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          />
          <div className="flex gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !newTask.assignedTo && "text-muted-foreground"
                  )}
                >
                  {newTask.assignedTo ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={newTask.assignedTo.avatar} alt={newTask.assignedTo.name} />
                        <AvatarFallback>{newTask.assignedTo.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{newTask.assignedTo.name}</span>
                    </div>
                  ) : (
                    <span>Select member</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[240px] p-0" align="start">
                <div className="space-y-2 p-2">
                  {teamMembers.map((member) => (
                    <div
                      key={member.name}
                      className="flex items-center justify-between p-2 hover:bg-accent rounded-md cursor-pointer"
                      onClick={() => {
                        setNewTask({ ...newTask, assignedTo: member });
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium leading-none">
                            {member.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {member.field}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="bg-[#0A2647] text-white hover:bg-[#0A2647]/90">
                        Choose
                      </Button>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !newTask.deadline && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {newTask.deadline ? (
                    format(newTask.deadline, "PPP")
                  ) : (
                    <span>Pick a deadline</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={newTask.deadline}
                  onSelect={(date) =>
                    setNewTask({ ...newTask, deadline: date || undefined })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowNewTask(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTask}>Add Task</Button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Task Name</th>
              <th className="text-left p-4">Assigned To</th>
              <th className="text-left p-4">Deadline</th>
              <th className="text-left p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-b last:border-0">
                <td className="p-4">{task.name}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={task.assignedTo.avatar} alt={task.assignedTo.name} />
                      <AvatarFallback>{task.assignedTo.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {task.assignedTo.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {task.assignedTo.field}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4">{format(task.deadline, "PPP")}</td>
                <td className="p-4">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTaskStatus(task.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectTasks;
