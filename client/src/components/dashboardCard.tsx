import { DashboardOption } from '../lib/types';

interface DashboardCardProps {
  option: DashboardOption;
  onAction: (option: DashboardOption) => void;
}

export const DashboardCard = ({ option, onAction }: DashboardCardProps) => (
  <div className="border border-2 p-4 rounded-2xl flex flex-row shadow-lg items-center justify-between mb-4 lg:mb-0">
    <div>
      <h3 className="text-xl font-bold">{option.title}</h3>
      <p>{option.description}</p>
    </div>
    <button
      className="bg-black text-white w-[90px] h-[42px] mt-10 rounded-full"
      onClick={() => onAction(option)}
    >
      {option.title.split(" ")[0]}
    </button>
  </div>
);