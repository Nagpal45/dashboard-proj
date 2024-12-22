import React from 'react';
import { Cohort } from '../../lib/types';
import { CohortSelect } from '../cohortSelect';

interface CreateCourseFormProps {
  onSubmit: (e: React.FormEvent) => void;
  response: string;
  cohorts: Cohort[];
}

export const CreateCourseForm = ({ onSubmit, response, cohorts }: CreateCourseFormProps) => (
  <form className="mt-5 flex flex-col" onSubmit={onSubmit}>
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
    <CohortSelect cohorts={cohorts} onChange={() => {}} />
    <p className="mt-5 text-green-500">{response}</p>
    <button
      className="bg-black text-white px-4 py-2 rounded-lg mt-5 justify-self-end"
      type="submit"
    >
      Done
    </button>
  </form>
);