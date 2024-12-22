
export const handleSubmit = async (title: string, e: React.FormEvent) => {
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