import React from "react";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
    title: "About InstaVibe",
    description: "Learn more about InstaVibe, a project inspired by Instagram, with custom features built using modern web technologies."
});

const AboutPage = () => {
    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold text-center mt-3">
                A page about the project <span className="text-indigo-500">InstaVibe</span>
            </h1>
            <p className="m-3 text-lg">
                The project is a clone of{" "}
                <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-400 hover:text-blue-600"
                >
                    Instagram
                </a>{" "}
                with unique customizations and features.
            </p>
            <div className="flex flex-row flex-wrap text-gray-300 ">
                <section>
                    <h2 className="text-xl font-bold m-3">Features</h2>
                    <ul className="list-disc list-inside m-4 p-1 space-y-1">
                        <li>Authentication</li>
                        <li>Post Images</li>
                        <li>Like Posts</li>
                        <li>Comment on Posts</li>
                        <li>Follow Users</li>
                        <li>Direct Messaging</li>
                        <li>Notifications</li>
                        <li>Search</li>
                    </ul>
                </section>
                <section>
                    <h2 className="text-xl font-bold m-3">Technologies Used</h2>
                    <ul className="list-disc list-inside m-4 p-1 space-y-1">
                        <li>Next.js - For its fast performance and built-in SEO support.</li>
                        <li>React.js - To create dynamic and reusable components.</li>
                        <li>Tailwind CSS - For quick and modern UI.</li>
                        <li>shadcn/ui - To save time with prebuilt, customizable components.</li>
                        <li>Prisma - For database management.</li>
                        <li>Neon - For a cloud-based PostgreSQL database.</li>
                        <li>UploadThing - To handle secure image uploads.</li>
                        <li>Clerk - For easy and secure user authentication.</li>
                        <li>Vercel - For seamless deployment.</li>
                    </ul>
                </section>
            </div>
            <footer className="mt-10">
            <p className="m-3  text-gray-500">
                This project was created by{" "}
                <a
                    href="https://github.com/kannanhacker123"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-400 hover:text-blue-600"
                >
                    Kannan
                </a>.
            </p>
                <p className="text-gray-500 m-3">
                    This project is open source and available on{" "}
                    <a
                        href="https://github.com/kannanhacker123/instavibe"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-400 hover:text-blue-600"
                    >
                        GitHub
                    </a>.
                </p>
            </footer>
        </div>
    );
};

export default AboutPage;
