import React, { useEffect, useRef, useState } from "react";
import apiRequest from "../lib/apiRequest";
import { Cohort, Course, DashboardOption, Student } from "../lib/types";
import { DashboardCard } from "../components/dashboardCard";
import { DialogHeader } from "../components/dialogHeader";
import { CreateCohortForm } from "../components/forms/createCohort";
import { CreateCourseForm } from "../components/forms/createCourse";
import { AddStudentForm } from "../components/forms/addStudent";
import { ViewCohorts } from "../components/views/viewCohorts";
import { ViewCourses } from "../components/views/viewcourses";
import { ViewStudents } from "../components/views/viewStudents";

const Dashboard = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    description: "",
  });
  const [response, setResponse] = useState<string>("");
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  const dashboardOptions: DashboardOption[] = [
    { title: "Create Cohort", description: "Create a new cohort for your students"},
    {title: "View Cohorts", description: "View all the cohorts you have created"},
    { title: "Create Course", description: "Create a new course in your cohort"},
    { title: "View Courses", description: "View all the courses in your cohort"},
    { title: "Add Student", description: "Add a student to your cohort and assign courses"},
    { title: "View Students", description: "View all the students in your cohort"},
  ];

  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        const response = await apiRequest.get("/cohort");
        setCohorts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCohorts();
  }, [response]);

  const openDialog = (option: { title: string; description: string }) => {
    setDialogContent(option);
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    setResponse("");
    setCourses([]);
    setDialogContent({ title: "", description: "" });
  };

  const handleSubmit = async (title: string, e: React.FormEvent) => {
    e.preventDefault();
    if (title === "Create Cohort") {
      const cohortName = (e.target as HTMLFormElement).cohortName.value;
      try {
        const response = await apiRequest.post("/cohort", { name: cohortName });

        (e.target as HTMLFormElement).reset();
        setResponse(response.statusText + "!");
        setTimeout(() => {
          setResponse("");
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    }
    if (title === "Create Course") {
      const courseName = (e.target as HTMLFormElement).courseName.value;
      const cohortId = (e.target as HTMLFormElement).cohortId.value;
      try {
        const response = await apiRequest.post("/course", {
          name: courseName,
          cohortId,
        });
        (e.target as HTMLFormElement).reset();
        setResponse(response.statusText + "!");
        setTimeout(() => {
          setResponse("");
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    }
    if (title === "Add Student") {
      const studentName = (e.target as HTMLFormElement).studentName.value;
      const cohortId = (e.target as HTMLFormElement).cohortId.value;
      const courses = Array.from(
        (e.target as HTMLFormElement).courseId as unknown as HTMLInputElement[]
      )
        .filter((input: HTMLInputElement) => input.checked)
        .map((input: HTMLInputElement) => input.value);

      try {
        const response = await apiRequest.post("/student", {
          name: studentName,
          cohortId,
          courses,
        });
        (e.target as HTMLFormElement).reset();
        setResponse(response.statusText + "!");
        setTimeout(() => {
          setResponse("");
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleViewCourses = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cohortId = e.target.value;
    try {
      const response = await apiRequest.get(`/course/${cohortId}`);
      if (response.data.length === 0) {
        setCourses([{ id: "0", name: "No courses available", cohortId }]);
      } else {
        setCourses(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewStudents = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const cohortId = e.target.value;
    try {
      const response = await apiRequest.get(`/student/${cohortId}`);

      if (response.data.length === 0) {
        setStudents([]);
      } else {
        setStudents(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-5 pb-10">
      <div className="grid grid-cols-2 gap-7 overflow-hidden">
        {dashboardOptions.map((option, index) => (
          <DashboardCard key={index} option={option} onAction={() => openDialog(option)}/>
        ))}
      </div>

      <dialog ref={dialogRef} className="rounded-lg p-5 w-1/3 backdrop:bg-black/70 max-h-[600px]">
        <DialogHeader title={dialogContent.title} description={dialogContent.description} onClose={closeDialog}/>

        {dialogContent.title === "Create Cohort" && (
          <CreateCohortForm onSubmit={(e) => handleSubmit(dialogContent.title, e)} response={response}/>
        )}

        {dialogContent.title === "Create Course" && (
          <CreateCourseForm onSubmit={(e) => handleSubmit(dialogContent.title, e)} response={response} cohorts={cohorts}
          />
        )}

        {dialogContent.title === "Add Student" && (
          <AddStudentForm onSubmit={(e) => handleSubmit(dialogContent.title, e)} response={response} cohorts={cohorts} courses={courses} onCohortSelect={handleViewCourses}/>
        )}

        {dialogContent.title === "View Cohorts" && (
          <ViewCohorts cohorts={cohorts} />
        )}

        {dialogContent.title === "View Courses" && (
          <ViewCourses cohorts={cohorts} courses={courses} onCohortSelect={handleViewCourses}
          />
        )}

        {dialogContent.title === "View Students" && (
          <ViewStudents cohorts={cohorts} students={students} onCohortSelect={handleViewStudents}/>
        )}
      </dialog>
    </div>
  );
};

export default Dashboard;
