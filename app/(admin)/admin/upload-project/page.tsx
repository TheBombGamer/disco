"use client";

import CourseCard from "@app/components/CourseCard";
import ProjectCard from "@app/components/ProjectCard";
import Upload from "@app/components/Upload";
import UploadProject from "@app/components/UploadProject";
import React, { useEffect, useState } from "react";

interface Course {
  _id: string;
  title: string;
  pdf: string;
  summary: string;
  createdAt: string;
}

const Page: React.FC = () => {
  const [project, setProjects] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/project");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h6 className="text-2xl font-bold mb-4">Upload Projects</h6>

      <UploadProject />

      <h4 className="my-10 font-semibold">Uploaded Projects</h4>
      {project.length > 0 ? (
        <div className="flex flex-col gap-4">
          {project.map((project) => (
            <div key={project._id} className="flex flex-col gap-5">
              <ProjectCard
                title={project.title}
                summary={project.summary}
                createdAt={project.createdAt}
                pdf={project.pdf}
                _id={project._id}
              />
            </div>
          ))}
        </div>
      ) : (
        <h5>No Project Found</h5>
      )}
    </div>
  );
};

export default Page;
