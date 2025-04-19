"use client";

import { useState } from "react";
import Image from "next/image";

export default function CVPage() {
    const [cvFile, setCvFile] = useState<File | null>(null);
    const isAccepted = !!cvFile;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === "application/pdf") {
            setCvFile(file);
        } else {
            setCvFile(null);
        }
    };

    return (
        <div className="w-full mx-auto px-4 py-8">
            <div className="bg-white shadow rounded-2xl p-6">
                <h2 className="text-2xl font-semibold mb-4">Your CV</h2>

                {isAccepted ? (
                    <>
                        <p className="text-green-600 font-medium">Accepted</p>
                        <p className="text-gray-600 mt-1">{cvFile?.name}</p>
                    </>
                ) : (
                    <p className="text-red-600 font-medium">Not accepted yet!</p>
                )}

                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="mt-4"
                />

                <h3 className="text-xl font-semibold mt-8 mb-4">CV Templates</h3>
                <div className="grid grid-cols-6 max-sm:grid-cols-1 max-md:grid-cols-4 gap-4">
                    {Array.from({ length: 12 }, (_, i) => (
                        <Image
                            key={i}
                            src={`/images/templet${i + 1}.jpg`}
                            alt={`Template ${i + 1}`}
                            width={200}
                            height={280}
                            className="rounded-xl border"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
