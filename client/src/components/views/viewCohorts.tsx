import { Cohort } from "../../lib/types";

interface ViewCohortsProps {
  cohorts: Cohort[];
}

export const ViewCohorts = ({ cohorts }: ViewCohortsProps) => (
  <div className="mt-5">
    {cohorts.length === 0 ? (
      <p>No cohorts available</p>
    ) : (
      <ul className="space-y-2">
        {cohorts.map((cohort) => (
          <li
            key={cohort.id}
            className="p-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            {cohort.name}
          </li>
        ))}
      </ul>
    )}
  </div>
);
