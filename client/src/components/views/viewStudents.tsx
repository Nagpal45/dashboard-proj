import React from 'react';
import { Cohort, Student } from '../../lib/types';
import { CohortSelect } from '../cohortSelect';

interface ViewStudentsProps {
  cohorts: Cohort[];
  students: Student[];
  onCohortSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const ViewStudents = ({
  cohorts,
  students,
  onCohortSelect,
}: ViewStudentsProps) => (
  <div className="mt-5">
    <CohortSelect
      cohorts={cohorts}
      onChange={onCohortSelect}
    />
    
    <div className="mt-5">
      {students.length === 0 ? (
        <p>Select a cohort to view students</p>
      ) : (
        <ul className="space-y-4">
          {students.map((student) => (
            <li
              key={student.id}
              className="py-1 px-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-row gap-5 items-center justify-between"
            >
              <div className="font-medium">{student.name}</div>
              {student.courses.length > 0 && (
                <div className="mt-2 flex flex-row items-center gap-2">
                  <span className="text-sm text-gray-500">Enrolled in: </span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {student.courses.map((course) => (
                      <span
                        key={course.id}
                        className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded"
                      >
                        {course.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);