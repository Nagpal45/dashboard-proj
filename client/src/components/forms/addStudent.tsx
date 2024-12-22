import React from 'react';
import { Cohort, Course } from '../../lib/types';
import { CohortSelect } from '../cohortSelect';

interface AddStudentFormProps {
  onSubmit: (e: React.FormEvent) => void;
  response: string;
  cohorts: Cohort[];
  courses: Course[];
  onCohortSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const AddStudentForm = ({
  onSubmit,
  response,
  cohorts,
  courses,
  onCohortSelect,
}: AddStudentFormProps) => (
  <form className="mt-5 flex flex-col" onSubmit={onSubmit}>
    <label className="block mb-2" htmlFor="studentName">
      Student Name
    </label>
    <input
      type="text"
      id="studentName"
      className="w-full p-2 border border-gray-300 rounded-lg"
    />
    
    <label className="block mb-2 mt-5" htmlFor="cohortId">
      Cohort
    </label>
    <CohortSelect
      cohorts={cohorts}
      onChange={onCohortSelect}
    />
    
    <label className="block mb-2 mt-5" htmlFor="courseId">
      Courses
    </label>
    {courses.length === 0 ? (
      <p>No courses available</p>
    ) : (
      <div className="space-y-2">
        {courses.map(course => (
          <div key={course.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={course.id}
              name="courseId"
              value={course.id}
              className="rounded border-gray-300"
            />
            <label htmlFor={course.id} className="text-sm">
              {course.name}
            </label>
          </div>
        ))}
      </div>
    )}

    <p className="mt-5 text-green-500">{response}</p>
    <button
      className="bg-black text-white px-4 py-2 rounded-lg mt-5 justify-self-end"
      type="submit"
    >
      Done
    </button>
  </form>
);
