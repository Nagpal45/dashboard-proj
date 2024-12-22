import React from 'react';
import { Cohort } from '../lib/types';

interface CohortSelectProps {
  cohorts: Cohort[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  isCourse?: boolean;
}

export const CohortSelect = ({ cohorts, onChange, className, isCourse }: CohortSelectProps) => (
  <select
    id="cohortId"
    className={`w-full p-2 border border-gray-300 rounded-lg ${className} bg-[#E9EDF1] text-[16px]`}
    onChange={onChange}
  >
    {isCourse ? (<option value="" disabled selected>
      {cohorts.length === 0 ? "No courses available" : "Select a course"}
    </option>): (<option value="" disabled selected>
      {cohorts.length === 0 ? "No cohorts available" : "Select a cohort"}
    </option>)}
    {cohorts.map((cohort) => (
      <option key={cohort.id} value={cohort.id}>
        {cohort.name}
      </option>
    ))}
  </select>
);