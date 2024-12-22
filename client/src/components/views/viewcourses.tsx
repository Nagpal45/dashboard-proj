// components/views/ViewCourses.tsx
import React from 'react';
import { Cohort, Course } from '../../lib/types';
import { CohortSelect } from '../cohortSelect';

interface ViewCoursesProps {
  cohorts: Cohort[];
  courses: Course[];
  onCohortSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const ViewCourses = ({
  cohorts,
  courses,
  onCohortSelect,
}: ViewCoursesProps) => (
  <div className="mt-5">
    <CohortSelect
      cohorts={cohorts}
      onChange={onCohortSelect}
    />
    
    <div className="mt-5">
      {courses.length === 0 ? (
        <p>Select a cohort to view courses</p>
      ) : (
        <ul className="space-y-2">
          {courses.map((course) => (
            <li
              key={course.id}
              className="p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              {course.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);