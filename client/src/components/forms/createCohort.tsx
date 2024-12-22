import React from 'react';

interface CreateCohortFormProps {
  onSubmit: (e: React.FormEvent) => void;
  response: string;
}

export const CreateCohortForm = ({ onSubmit, response }: CreateCohortFormProps) => (
  <form className="mt-5 flex flex-col" onSubmit={onSubmit}>
    <label className="block mb-2" htmlFor="cohortName">
      Cohort Name
    </label>
    <input
      type="text"
      id="cohortName"
      className="w-full p-2 border border-gray-300 rounded-lg"
    />
    <p className="mt-5 text-green-500">{response}</p>
    <button
      className="bg-black text-white px-4 py-2 rounded-lg mt-5 justify-self-end"
      type="submit"
    >
      Done
    </button>
  </form>
);