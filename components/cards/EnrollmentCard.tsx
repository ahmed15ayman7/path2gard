import React from 'react';
import Link from 'next/link';

interface EnrollmentCardProps {
  type: 'track' | 'project';
  onEnrollClick: () => void;
}

const EnrollmentCard = ({ type, onEnrollClick }: EnrollmentCardProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm w-full max-w-md">
      <h2 className="text-xl font-semibold text-center mb-6">
        You are not enrolled at any {type}!
      </h2>
      <button
        onClick={onEnrollClick}
        className="w-full bg-[#0A2647] text-white py-3 px-6 rounded-md hover:bg-[#0A2647]/90 transition-colors"
      >
        Enroll now
      </button>
    </div>
  );
};

export default EnrollmentCard;
