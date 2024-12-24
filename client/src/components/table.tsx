import { useDispatch } from "react-redux";
import apiRequest from "../lib/apiRequest";
import { Student } from "../lib/types";
import { AppDispatch } from "../store";
import { fetchStudents } from "../store/slices/studentSlice";

const Table = ({ data}: { data: Student[] }) => {
    const dispatch = useDispatch<AppDispatch>();


    const handleStatusChange = async (student: Student) => {
        try {
          const updatedStatus = student.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      
          await apiRequest.put(`/student/${student.id}`, {
            name: student.name,
            status: updatedStatus,
            courses: student.courses.map((course) => course.id),
          });
          
          dispatch(fetchStudents({ cohortId: "" }));
        } catch (error) {
          console.error("Error updating student status:", error);
        }
      };
      

    return (
            <table className="w-full table-fixed border-collapse mt-[40px] text-[12px] font-medium">
                <thead>
                    <tr style={{ height: "50px" }}>
                        <th className="md:w-1/6 text-left md:px-4 md:py-2">Student Name</th>
                        <th className="md:w-1/6 text-left md:px-4 md:py-2">Cohort</th>
                        <th className="md:w-1/4 text-left md:px-4 md:py-2">Courses</th>
                        <th className="md:w-1/6 text-left px-4 py-2">Date Joined</th>
                        <th className="hidden md:block text-left md:px-4 md:py-2">Last Login</th>
                        <th className="md:w-1/12 text-center px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((student) => (
                        <tr
                            key={student.id}
                            className="border-b border-t hover:bg-gray-100"
                            style={{ height: "50px" }}
                        >
                            <td className="md:px-4 md:py-2">{student.name}</td>
                            <td className="md:px-4 md:py-2">{student.cohort.name}</td>
                            <td className="px-4 py-2">
                                {student.courses.map((course) => (
                                    <div
                                        key={course.id}
                                        className="inline-block bg-gray-200 text-gray-700 px-2 py-1 m-1 rounded"
                                    >
                                        <img src="/instructor.svg" alt="instructor" width={20} height={20} className="inline-block mr-1" />
                                        {course.name}
                                    </div>
                                ))}
                            </td>
                            <td className="px-4 py-2">{student.createdAt.split("T")[0].split("-").reverse().join(".")}</td>
                            <td className="hidden md:block px-4 py-2">{student.updatedAt.split("T")[0].split("-").reverse().join(".") + " " + student.updatedAt.split("T")[1].split(".")[0].split(":").slice(0, 2).join(":")}</td>
                            <td className="text-center px-4 py-2">
                            <div className="flex justify-center items-center">
                                    <div
                                        className={`w-[14.4px] h-[14px] cursor-pointer rounded-full border-2 ${
                                            student.status === "ACTIVE"
                                                ? "bg-[#4AEA40] border-[#4AEA40]"
                                                : "bg-[#EA4E40] border-[#EA4E40]"
                                        }`} onClick={() => handleStatusChange(student)}
                                        >
                                        </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
    );
};

export default Table;
