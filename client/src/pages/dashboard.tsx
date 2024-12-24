import React, { useEffect, useRef, useState } from "react";
import { DashboardCard } from "../components/dashboardCard";
import { DialogHeader } from "../components/dialogHeader";
import { CreateCohortForm } from "../components/forms/createCohort";
import { CreateCourseForm } from "../components/forms/createCourse";
import { AddStudentForm } from "../components/forms/addStudent";
import { ViewCohorts } from "../components/views/viewCohorts";
import { ViewCourses } from "../components/views/viewcourses";
import { ViewStudents } from "../components/views/viewStudents";
import { createCourse, fetchCourses } from "../store/slices/courseSlice";
import { createStudent, fetchStudents } from "../store/slices/studentSlice";
import { createCohort, fetchCohorts } from "../store/slices/cohortSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { DashboardOption } from "../lib/types";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cohorts = useSelector((state: RootState) => state.cohorts.items);
  const courses = useSelector((state: RootState) => state.courses.items);
  const students = useSelector((state: RootState) => state.students.items);
  
  const [dialogContent, setDialogContent] = useState({ title: '', description: '' });
  const [response, setResponse] = useState<string>('');
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dispatch(fetchCohorts());
  }, [dispatch]);

  const handleSubmit = async (title: string, e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (title === 'Create Cohort') {
        const cohortName = (e.target as HTMLFormElement).cohortName.value;
        await dispatch(createCohort(cohortName)).unwrap();
      } else if (title === 'Create Course') {
        const courseName = (e.target as HTMLFormElement).courseName.value;
        const cohortId = (e.target as HTMLFormElement).cohortId.value;
        await dispatch(createCourse({ name: courseName, cohortId })).unwrap();
      } else if (title === 'Add Student') {
        const studentName = (e.target as HTMLFormElement).studentName.value;
        const cohortId = (e.target as HTMLFormElement).cohortId.value;
        const courses = Array.from(
          (e.target as HTMLFormElement).courseId as unknown as HTMLInputElement[]
        )
          .filter((input: HTMLInputElement) => input.checked)
          .map((input: HTMLInputElement) => input.value);
        
        await dispatch(createStudent({ name: studentName, cohortId, courses })).unwrap();
      }
      
      (e.target as HTMLFormElement).reset();
      setResponse('Success!');
      setTimeout(() => setResponse(''), 2000);
    } catch (error) {
      console.error(error);
      setResponse('Error occurred');
    }
  };

  const handleViewCourses = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cohortId = e.target.value;
    dispatch(fetchCourses(cohortId));
  };

  const handleViewStudents = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cohortId = e.target.value;
    dispatch(fetchStudents({ cohortId }));
  };

  
  const dashboardOptions: DashboardOption[] = [
    { title: "Create Cohort", description: "Create a new cohort for your students"},
    {title: "View Cohorts", description: "View all the cohorts you have created"},
    { title: "Create Course", description: "Create a new course in your cohort"},
    { title: "View Courses", description: "View all the courses in your cohort"},
    { title: "Add Student", description: "Add a student to your cohort and assign courses"},
    { title: "View Students", description: "View all the students in your cohort"},
  ];


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
    setDialogContent({ title: "", description: "" });
  };


  return (
    <div className="lg:p-5 lg:pb-10">
      <div className="md:grid grid-cols-2 gap-7 overflow-hidden">
        {dashboardOptions.map((option, index) => (
          <DashboardCard key={index} option={option} onAction={() => openDialog(option)}/>
        ))}
      </div>

      <dialog ref={dialogRef} className="rounded-lg p-5 w-5/6 md:w-1/2 lg:w-1/3 backdrop:bg-black/70 max-h-[600px]">
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
