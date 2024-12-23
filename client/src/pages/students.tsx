import { useEffect, useRef, useState } from "react";
import { CohortSelect } from "../components/cohortSelect";
import { AddStudentForm } from "../components/forms/addStudent";
import { DialogHeader } from "../components/dialogHeader";
import Table from "../components/table";
import { createStudent, fetchStudents } from "../store/slices/studentSlice";
import { fetchCourses } from "../store/slices/courseSlice";
import { fetchCohorts } from "../store/slices/cohortSlice";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";

const Students = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cohorts = useSelector((state: RootState) => state.cohorts.items);
  const courses = useSelector((state: RootState) => state.courses.items);
  const students = useSelector((state: RootState) => state.students.items);
  
  const [selectedCohort, setSelectedCohort] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dispatch(fetchCohorts());
    dispatch(fetchStudents({ cohortId: '' }));
  }, [dispatch]);

  const handleSubmit = async (title: string, e: React.FormEvent) => {
    e.preventDefault();
    if (title === 'Add Student') {
      const studentName = (e.target as HTMLFormElement).studentName.value;
      const cohortId = (e.target as HTMLFormElement).cohortId.value;
      const courses = Array.from(
        (e.target as HTMLFormElement).courseId as unknown as HTMLInputElement[]
      )
        .filter((input: HTMLInputElement) => input.checked)
        .map((input: HTMLInputElement) => input.value);

      try {
        await dispatch(createStudent({ name: studentName, cohortId, courses })).unwrap();
        (e.target as HTMLFormElement).reset();
        setResponse('Success!');
        setTimeout(() => setResponse(''), 2000);
        dispatch(fetchStudents({ cohortId: '' }));
      } catch (error) {
        console.error(error);
        setResponse('Error occurred');
      }
    }
  };

  const handleCohortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cohortId = e.target.value;
    setSelectedCohort(cohortId);
    dispatch(fetchStudents({ cohortId }));
    dispatch(fetchCourses(cohortId));
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const courseId = e.target.value;
    if (selectedCohort) {
      dispatch(fetchStudents({ cohortId: selectedCohort, courseId }));
    }
  };

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
  };

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
      <Table data={students} />
    </div>
  );
};

export default Students;
