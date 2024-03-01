'use client'

import ProjectCard from "@app/components/ProjectCard";


import React, { useEffect, useState } from "react";

interface Course {
  _id: string;
  title: string;
  summary: string;
  pdf: string;
  createdAt: string;
}

const Page: React.FC = () => {
  const [project, setProjects] = useState<Course[]>([]);
  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/project");
        if (!response.ok) {
          throw new Error("Failed to fetch Projects");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching Projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h6 className="text-2xl font-bold mb-4">Projects</h6>



      <h4 className="my-10 font-semibold">View Projects Here</h4>
      {project.length > 0 ? (
        <div className="flex flex-col gap-4">
          {project.map((project) => (
            <div key={project._id} className="flex flex-col gap-5">
              <ProjectCard
                title={project.title}
                summary={project.summary}
                pdf={project.pdf}
                _id={project._id}
                createdAt={project.createdAt}
                setRefresh={setRefresh}

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
