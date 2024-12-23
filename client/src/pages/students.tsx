import { useEffect, useRef, useState } from "react";
import { CohortSelect } from "../components/cohortSelect";
import { AddStudentForm } from "../components/forms/addStudent";
import apiRequest from "../lib/apiRequest";
import { Cohort, Course, Student } from "../lib/types";
import { DialogHeader } from "../components/dialogHeader";
import Table from "../components/table";

const Students = () => {
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [response, setResponse] = useState<string>("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedCohort, setSelectedCohort] = useState<string>("");

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

  const openDialog = () => {
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
  };

  const handleSubmit = async (title: string, e: React.FormEvent) => {
    e.preventDefault();
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
        fetchStudents("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchStudents = async (cohortId: string, courseId?: string) => {
    try {
      const response = await apiRequest.get(
        `/student/${cohortId}${courseId ? `?courseId=${courseId}` : ""}`
      );
      setStudents(response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCourses = async (cohortId: string) => {
    try {
      const response = await apiRequest.get(`/course/${cohortId}`);
      setCourses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCohortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cohortId = e.target.value;
    setSelectedCohort(cohortId);
    fetchStudents(cohortId);
    fetchCourses(cohortId);
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const courseId = e.target.value;
    if (selectedCohort) {
      fetchStudents(selectedCohort, courseId);
    }
  };

  useEffect(() => {
    fetchStudents('');
  }, []);

  return (
    <div className="flex flex-col w-full pb-10">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-5">
          <div className="w-[200px]">
            <CohortSelect
              cohorts={cohorts}
              onChange={handleCohortChange}
            />
          </div>
          <div className="w-[200px]">
            <CohortSelect
              cohorts={courses}
              onChange={handleCourseChange}
              isCourse={true}
            />
          </div>
        </div>
        <button
          className="bg-[#E9EDF1] w-[200px] rounded-[6px] flex flex-row items-center justify-center gap-[10px] text-[16px] font-bold text-[#3F526E]"
          onClick={openDialog}
        >
          <img src="/add.svg" alt="add" width="20" height="20" />
          Add Student
        </button>
        <dialog
          ref={dialogRef}
          className="rounded-lg p-5 w-1/3 backdrop:bg-black/70 max-h-[600px]"
        >
          <DialogHeader
            title={"Add Student"}
            description={"Add a student to your cohort and assign courses"}
            onClose={closeDialog}
          />
          <AddStudentForm
            onSubmit={(e) => handleSubmit("Add Student", e)}
            response={response}
            cohorts={cohorts}
            courses={courses}
            onCohortSelect={(e) =>
              fetchCourses((e.target as HTMLSelectElement).value)
            }
          />
        </dialog>
      </div>
      <Table data={students} fetchStudents={fetchStudents} />
    </div>
  );
};

export default Students;
