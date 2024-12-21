import React, { useEffect, useRef, useState } from "react";
import apiRequest from "../lib/apiRequest";

const Dashboard = () => {
  interface Cohort {
    id: string;
    name: string;
  }

  interface Course {
    id: string;
    name: string;
    cohortId: string;
  }

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    description: "",
  });
  const [response, setResponse] = useState<string>("");
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  const dashboardOptions = [
    {
      title: "Create Cohort",
      description: "Create a new cohort for your students",
    },
    {
      title: "View Cohorts",
      description: "View all the cohorts you have created",
    },
    {
      title: "Create Course",
      description: "Create a new course in your cohort",
    },
    {
      title: "View Courses",
      description: "View all the courses in your cohort",
    },
    {
      title: "Add Student",
      description: "Add a student to your cohort and assign courses",
    },
    {
      title: "View Students",
      description: "View all the students in your cohort",
    },
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
  };

  const handleViewCourses = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cohortId = e.target.value;
    try {
      const response = await apiRequest.get(`/course/${cohortId}`);
      if (response.data.length === 0) {
        setCourses([{ id: "0", name: "No courses available", cohortId }]);
      }else{
        setCourses(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-5 pb-10">
      <div className="grid grid-cols-2 gap-7 overflow-hidden">
        {dashboardOptions.map((option, index) => (
          <div
            key={index}
            className="border border-2 p-4 rounded-2xl flex flex-row shadow-lg items-center justify-between"
          >
            <div>
              <h3 className="text-xl font-bold">{option.title}</h3>
              <p>{option.description}</p>
            </div>
            <button
              className="bg-black text-white w-[90px] h-[42px] mt-10 rounded-full"
              onClick={() => openDialog(option)}
            >
              {option.title.split(" ")[0]}
            </button>
          </div>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="rounded-lg p-5 w-1/3 backdrop:bg-black/70"
      >
        <div className="flex flex-row justify-between items-start">
          <div className="">
            <h2 className="text-2xl font-bold mb-1">{dialogContent.title}</h2>
            <p>{dialogContent.description}</p>
          </div>
          <button
            className="bg-black text-white w-10 h-10 rounded-full mr-2 font-bold flex items-center justify-center"
            onClick={closeDialog}
          >
            X
          </button>
        </div>

        {dialogContent.title.split(' ')[0] !== 'View' && (
          <form
            className="mt-5 flex flex-col"
            onSubmit={(e) => handleSubmit(dialogContent.title, e)}
          >
            {dialogContent.title === "Create Cohort" && (
              <>
                <label className="block mb-2" htmlFor="cohortName">
                  Cohort Name
                </label>
                <input
                  type="text"
                  id="cohortName"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </>
            )}
            
            {dialogContent.title === "Create Course" && (
              <>
                <label className="block mb-2" htmlFor="courseName">
                  Course Name
                </label>
                <input
                  type="text"
                  id="courseName"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <label className="block mb-2 mt-5" htmlFor="cohortId">
                  Cohort
                </label>
                <select
                  id="cohortId"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="" disabled selected>
                    {cohorts.length === 0
                      ? "No cohorts available"
                      : "Select a cohort"}
                  </option>
                  {cohorts.map((cohort) => (
                    <option key={cohort.id} value={cohort.id}>
                      {cohort.name}
                    </option>
                  ))}
                </select>
              </>
            )}
            <p className="mt-5 text-green-500">{response}</p>
            <button
              className="bg-black text-white px-4 py-2 rounded-lg mt-5 justify-self-end"
              type="submit"
            >
              Done
            </button>
          </form>
        )}

        <div className="mt-5">
        {dialogContent.title === "View Cohorts" && (
              <ul>
                {cohorts.map((cohort) => (
                  <li key={cohort.id}>{cohort.name}</li>
                ))}
              </ul>
          )}
          
          {dialogContent.title === "View Courses" && (
            <>
              <select
                id="cohortId"
                className="w-full p-2 border border-gray-300 rounded-lg"
                onChange={(e) => handleViewCourses(e)}
              >
                <option value="" disabled selected>
                  {cohorts.length === 0
                    ? "No cohorts available"
                    : "Select a cohort"}
                </option>
                {cohorts.map((cohort) => (
                  <option key={cohort.id} value={cohort.id}>
                    {cohort.name}
                  </option>
                ))}
              </select>
              <ul className="mt-5">
                {courses.map((course) => (
                  <li key={course.id}>{course.name}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default Dashboard;
