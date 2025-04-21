"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";

const questions = [
  {
    id: 1,
    question: "What do you enjoy working on the most?",
    options: [
      "Building visually appealing and interactive user interfaces",
      "Creating and managing databases and server-side logic",
      "Developing mobile apps for Android and iOS",
      "Analyzing data and creating intelligent systems",
    ],
  },
  {
    id: 2,
    question: "What excites you about solving problems?",
    options: [
      "Making websites/apps more user-friendly",
      "Optimizing systems for better performance and scalability",
      "Developing mobile apps for Android and iOS",
      "Teaching machines to make smart decisions",
    ],
  },
  {
    id: 3,
    question: "What tools/technologies do you want to work with?",
    options: [
      "HTML, CSS, JavaScript, React, or Angular",
      "Databases, APIs, and backend frameworks like Node.js or Django",
      "Dart and Flutter for cross-platform mobile development",
      "Python, TensorFlow, or other AI/ML tools",
    ],
  },
  {
    id: 4,
    question: "What type of projects interest you the most?",
    options: [
      "Designing websites or apps that people love to use",
      "Creating and managing databases and server-side logic",
      "Developing mobile apps for Android and iOS",
      "Analyzing data and creating intelligent systems",
    ],
  },
  {
    id: 5,
    question: "How do you prefer to work?",
    options: [
      "Designing creative and aesthetic solutions",
      "Solving technical problems in the background",
      "Developing mobile apps for Android and iOS",
      "Analyzing data and creating intelligent systems",
    ],
  },
];

export default function SurveyForm({ onClose }: { onClose: () => void }) {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const router = useRouter();
  const handleSubmit = () => {
    // Here you can analyze the answers and recommend a track
    router.push("/recommendation/servay");
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
