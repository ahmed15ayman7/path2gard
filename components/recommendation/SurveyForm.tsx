"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { surveyApi } from "@/lib/api";
import { toast } from "react-toastify";
const questions = [
  {
    id: 1,
    question: "Which of the following fields interests you the most?",
    options: [
      "Artificial Intelligence",
      "Data Science",
      "Software Development",
      "Web Development",
      "Cybersecurity",
      "Other (please specify)",
    ],
  },
  {
    id: 2,
    question: "How comfortable are you with programming using Python?",
    options: [
      "Excellent",
      "Good",
      "Average",
      "Weak",
      "I don't know it",
    ],
  },
  {
    id: 3,
    question: "What is your level of experience with databases (SQL)?",
    options: [
      "Excellent",
      "Good",
      "Average",
      "Weak",
      "I don't know it",
    ],
  },
  {
    id: 4,
    question: "Do you prefer working on user-facing projects (Front-end) or behind the scenes (Back-end)?",
    options: [
      "Front-end",
      "Back-end",
      "Both",
      "Not sure",
    ],
  },
  {
    id: 5,
    question: "Do you enjoy analyzing data and drawing insights from it?",
    options: [
      "Yes",
      "No",
      "To some extent",
    ],
  },
  {
    id: 6,
    question: "Are you passionate about protecting systems and networks from cyber attacks?",
    options: [
      "Yes",
      "No",
      "To some extent",
    ],
  },
  {
    id: 7,
    question: "How strong are your logical thinking and problem-solving skills?",
    options: [
      "Very strong",
      "Good",
      "Average",
      "Weak",
    ],
  },
  {
    id: 8,
    question: "Have you ever worked on a programming project, either individually or in a team?",
    options: [
      "Yes",
      "No",
      "Currently working on one",
    ],
  },
  {
    id: 9,
    question: "Do you enjoy working with tools like Excel, Power BI, or Python for data analysis?",
    options: [
      "Yes",
      "No",
      "Haven’t tried",
    ],
  },
  {
    id: 10,
    question: "What type of project would you like to work on for your graduation project?",
    options: [
      "Web application",
      "Data analysis",
      "Desktop application",
      "Network security system",
      "AI-based application",
      "Other",
    ],
  },
];


export default function SurveyForm({ onClose }: { onClose: () => void }) {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const router = useRouter();
  const handleSubmit = async () => {
    const data = await surveyApi.postSurvey(answers);
    if(data){
      toast.success("Survey submitted successfully");
      console.log(data);
      router.push(`/recommendation/servay?type=${data}`);
    }
    // Here you can analyze the answers and recommend a track
    console.log(answers);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Exploring Your Interests in Computer Science Tracks
            </h2>
            <p className="text-sm text-gray-600 mt-1">Find Your Perfect Path</p>
          </div>
          <div className="relative w-16 h-16">
            <Image
              src="/icons/ai.png"
              alt="Survey Icon"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="space-y-8">
          {questions.map((q) => (
            <div key={q.id} className="space-y-4">
              <h3 className="font-medium text-gray-800">
                {q.id}. {q.question}
              </h3>
              <RadioGroup
                onValueChange={(value) =>
                  setAnswers((prev) => ({ ...prev, [q.id]: value }))
                }
                value={answers[q.id]}
                className="space-y-2"
              >
                {q.options.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-start space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50"
                  >
                    <RadioGroupItem value={option} className="mt-1" />
                    <span className="text-sm text-gray-600">{option}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-[#0A2647] text-[#0A2647] hover:bg-[#0A2647] hover:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#0A2647] text-white hover:bg-[#0A2647]/90"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
