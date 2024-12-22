interface DialogHeaderProps {
  title: string;
  description: string;
  onClose: () => void;
}

export const DialogHeader = ({ title, description, onClose }: DialogHeaderProps) => (
  <div className="flex flex-row justify-between items-start">
    <div>
      <h2 className="text-2xl font-bold mb-1">{title}</h2>
      <p>{description}</p>
    </div>
    <button
      className="bg-black text-white w-10 h-10 rounded-full mr-2 font-bold flex items-center justify-center"
      onClick={onClose}
    >
      X
    </button>
  </div>
);