// app/profile/page.tsx

import Image from "next/image";

const userImage = "/images/user1.jpg";

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
            <div className="bg-white shadow-lg rounded-xl w-full  grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                {/* Left Side */}
                <div className="space-y-6">
                    {/* User Header */}
                    <div className="flex items-center gap-4">
                        <Image
                            src={userImage}
                            alt="User"
                            width={60}
                            height={60}
                            className="rounded-full"
                        />
                        <h2 className="text-xl font-semibold">Ahmed Ali Mohamed</h2>
                    </div>

                    {/* User Details */}
                    <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                        <h3 className="font-medium text-gray-700 mb-2">User details</h3>
                        <p>
                            <span className="font-medium">Email address: </span>
                            <a href="mailto:Ahmed12@nub.edu.eg" className="text-blue-600">Ahmed12@nub.edu.eg</a>
                        </p>
                        <p><span className="font-medium">ID:</span> 211050187</p>
                        <p><span className="font-medium">Mobile Number:</span> 01516489168</p>
                    </div>

                    {/* Track Details */}
                    <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                        <h3 className="font-medium text-gray-700 mb-2">Track details</h3>
                        <p>Artificial Intelligence - <span className="font-semibold">48%</span></p>
                    </div>

                    {/* Project Details */}
                    <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                        <h3 className="font-medium text-gray-700 mb-2">Project details</h3>
                        <p>Path2Grad - <span className="font-semibold">68%</span></p>
                    </div>

                    {/* Internship Details */}
                    <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                        <h3 className="font-medium text-gray-700 mb-2">Internship details</h3>
                        <div className="flex justify-between">
                            <p>ITI - AI</p>
                            <p>75 hours - 95%</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Samsung - AI</p>
                            <p>90 hours - 89%</p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Project Members */}
                <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                        <h3 className="font-medium text-gray-700 mb-4">Project members details</h3>

                        {/* Supervisor */}
                        <div className="mb-4">
                            <p className="font-semibold">Supervisor</p>
                            <div className="flex items-center justify-between mt-1">
                                <div className="flex items-center gap-2">
                                    <Image src={userImage} alt="Supervisor" width={30} height={30} className="rounded-full" />
                                    <p>Dr. Ahmed Khalid Ali</p>
                                </div>
                                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">AI</span>
                            </div>
                        </div>

                        {/* Co-Supervisor */}
                        <div className="mb-4">
                            <p className="font-semibold">Co-Supervisor</p>
                            <div className="flex items-center justify-between mt-1">
                                <div className="flex items-center gap-2">
                                    <Image src={userImage} alt="Co-Supervisor" width={30} height={30} className="rounded-full" />
                                    <p>Eng. Rania Mohamed</p>
                                </div>
                                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">AI</span>
                            </div>
                        </div>

                        <hr className="my-2" />

                        {/* Team Members */}
                        <p className="font-semibold">Team Members</p>

                        {[
                            { name: "Ayman Salim Reda", role: "Flutter" },
                            { name: "Rania Mohamed", role: "Front-End" },
                            { name: "Ayman Salim Reda", role: "Back-End" },
                        ].map((member, idx) => (
                            <div key={idx} className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-2">
                                    <Image src={userImage} alt={member.name} width={30} height={30} className="rounded-full" />
                                    <p>{member.name}</p>
                                </div>
                                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">{member.role}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
