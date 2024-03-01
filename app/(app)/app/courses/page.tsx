'use client'

import CourseCard from "@app/components/CourseCard";
import Upload from "@app/components/Upload";

import React, { useEffect, useState } from "react";

interface Course {
  _id: string;
  title: string;
  summary: string;
  pdf: string;
  createdAt: string;
}

const Page: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/course");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h6 className="text-2xl font-bold mb-4">Courses</h6>



      <h4 className="my-10 font-semibold">View Available Courses Here</h4>
      {courses.length > 0 ? (
        <div className="flex flex-col gap-4">
          {courses.map((course) => (
            <div key={course._id} className="flex flex-col gap-5">
              <CourseCard
                title={course.title}
                summary={course.summary}
                pdf={course.pdf}
                _id={course._id}
                createdAt={course.createdAt}
                setRefresh={setRefresh}

              />
              
            </div>
          ))}
        </div>
      ) : (
        <h5>No Course Found</h5>
      )}
    </div>
  );
};

export default Page;
