"use client";
import React, { useState } from 'react';

interface TimelineItem {
  date: string;
  task: string;
}

interface TodoItem {
  id: string;
  task: string;
  completed: boolean;
}

interface ProgressCardProps {
  type: 'track' | 'project';
  title: string;
  progress: number;
  timeline: TimelineItem[];
  initialTodos: TodoItem[];
  onTodoToggle?: (todoId: string) => void;
}

const ProgressCard = ({
  type,
  title,
  progress,
  timeline,
  initialTodos,
  onTodoToggle,
}: ProgressCardProps) => {
  const [todos, setTodos] = useState(initialTodos);

  const handleTodoClick = (todoId: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
    onTodoToggle?.(todoId);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm w-full max-w-md">
      <div className="space-y-6">
        {/* Title */}
        <h2 className="text-xl font-semibold">{type === 'track' ? 'Track' : 'Graduation project'}</h2>
        
        {/* Project/Track Name with Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-lg">{title}</span>
            <span className="text-[#0A2647]">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0A2647] transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          <h3 className="font-medium">Timeline</h3>
          <div className="relative">
            {/* Horizontal Line */}
            <div className="absolute top-4 left-0 right-0 h-[2px] bg-[#0A2647]" />
            
            {/* Timeline Items */}
            <div className="relative flex justify-between">
              {timeline.map((item, index) => (
                <div key={index} className="flex flex-col items-center text-sm pt-2">
                  {/* Vertical Line with Circle */}
                  <div className="relative">
                    <div className="absolute top-[-8px] left-1/2 transform -translate-x-1/2 w-[2px] h-4 bg-[#0A2647]" />
                    <div className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-[#0A2647]" />
                  </div>
                  
                  {/* Date and Task */}
                  <div className="mt-6 flex flex-col items-center">
                    <span className="text-gray-600 font-medium">{item.date}</span>
                    <span className="text-gray-500 text-xs mt-1">{item.task}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TO-DO */}
        <div className="space-y-3">
          <h3 className="font-medium">TO-DO</h3>
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li 
                key={todo.id}
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => handleTodoClick(todo.id)}
              >
                <div className={`
                  w-5 h-5 rounded border-2 border-[#0A2647] flex items-center justify-center
                  ${todo.completed ? 'bg-[#0A2647]' : 'bg-white'}
                  transition-colors duration-200
                `}>
                  {todo.completed && (
                    <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className={`text-gray-700 group-hover:text-gray-900 ${todo.completed ? 'line-through' : ''}`}>
                  {todo.task}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
