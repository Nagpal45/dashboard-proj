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
    { title: "Create Cohort", description: "Create a new cohort for your students" },
    { title: "View Cohorts", description: "View all the cohorts you have created" },
    { title: "Create Course", description: "Create a new course in your cohort" },
    { title: "View Courses", description: "View all the courses in your cohort" },
    { title: "Add Student", description: "Add a student to your cohort and assign courses" },
    { title: "View Students", description: "View all the students in your cohort" },
  ];

  const fetchData = async (url: string, setState: Function, fallback: any = []) => {
    try {
      const response = await apiRequest.get(url);
      setState(response.data.length ? response.data : fallback);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSuccess = (statusText: string) => {
    setResponse(`${statusText}!`);
    setTimeout(() => setResponse(""), 2000);
  };

  useEffect(() => {
    fetchData("/cohort", setCohorts);
  }, [response]);

  const openDialog = (option: { title: string; description: string }) => {
    setDialogContent(option);
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    setResponse("");
    setCourses([]);
    setDialogContent({ title: "", description: "" });
  };

  const handleSubmit = async (title: string, e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    try {
      if (title === "Create Cohort") {
        const response = await apiRequest.post("/cohort", { name: form.cohortName.value });
        form.reset();
        handleSuccess(response.statusText);

      } else if (title === "Create Course") {
        const response = await apiRequest.post("/course", {
          name: form.courseName.value,
          cohortId: form.cohortId.value,
        });
        form.reset();
        handleSuccess(response.statusText);
        
      } else if (title === "Add Student") {
        const courses = Array.from(form.courseId as unknown as HTMLInputElement[])
          .filter((input) => input.checked)
          .map((input) => input.value);

        const response = await apiRequest.post("/student", {
          name: form.studentName.value,
          cohortId: form.cohortId.value,
          courses,
        });
        form.reset();
        handleSuccess(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleView = async (type: string, cohortId: string) => {
    if (type === "courses") {
      fetchData(`/course/${cohortId}`, setCourses, [{ id: "0", name: "No courses available", cohortId }]);
    } else if (type === "students") {
      fetchData(`/student/${cohortId}`, setStudents, [{ id: "0", name: "No students available", cohortId, courses: [] }]);
    }
  };

  const formComponents: Record<string, JSX.Element> = {
    "Create Cohort": <CreateCohortForm onSubmit={(e) => handleSubmit(dialogContent.title, e)} response={response} />,
    "Create Course": (
      <CreateCourseForm
        onSubmit={(e) => handleSubmit(dialogContent.title, e)}
        response={response}
        cohorts={cohorts}
      />
    ),
    "Add Student": (
      <AddStudentForm
        onSubmit={(e) => handleSubmit(dialogContent.title, e)}
        response={response}
        cohorts={cohorts}
        courses={courses}
        onCohortSelect={(e) => handleView("courses", e.target.value)}
      />
    ),
  };

  const viewComponents: Record<string, JSX.Element> = {
    "View Cohorts": <ViewCohorts cohorts={cohorts} />,
    "View Courses": (
      <ViewCourses
        cohorts={cohorts}
        courses={courses}
        onCohortSelect={(e) => handleView("courses", e.target.value)}
      />
    ),
    "View Students": (
      <ViewStudents
        cohorts={cohorts}
        students={students}
        onCohortSelect={(e) => handleView("students", e.target.value)}
      />
    ),
  };

  return (
    <div className="p-5 pb-10">
      <div className="grid grid-cols-2 gap-7 overflow-hidden">
        {dashboardOptions.map((option, index) => (
          <DashboardCard
            key={index}
            option={option}
            onAction={() => openDialog(option)}
          />
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="rounded-lg p-5 w-1/3 backdrop:bg-black/70 max-h-[600px]"
      >
        <DialogHeader
          title={dialogContent.title}
          description={dialogContent.description}
          onClose={closeDialog}
        />

        {formComponents[dialogContent.title] || viewComponents[dialogContent.title]}
      </dialog>
    </div>
  );
};

export default Dashboard;
