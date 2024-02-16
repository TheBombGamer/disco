"use client";

import CourseCard from "@app/components/CourseCard";
import Upload from "@app/components/Upload";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const [courses, setCourses] = useState([]);

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
      <h6 className="text-2xl font-bold mb-4">Upload Files</h6>

      <Upload />

      <h4 className="my-10 font-semibold"> Uploaded Courses</h4>
      {courses ? (
        <ul>
          {courses.map((course) => (
            <CourseCard title={course.title} summary={course.summary}  />
          ))}
        </ul>
      ) : (
        <h5>No Course Found</h5>
      )}
    </div>
  );
};

export default page;
