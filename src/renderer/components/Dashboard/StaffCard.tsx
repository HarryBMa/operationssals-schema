import React from 'react';
// import { User, Stethoscope, Syringe } from 'lucide-react'; // Uncomment if lucide-react is installed

interface StaffCardProps {
  name: string;
  role: string;
  hours?: string;
}

const roleIcons: Record<string, React.ReactNode> = {
  'Opssk': <span role="img" aria-label="stethoscope">🩺</span>, // Replace with <Stethoscope ... /> if lucide-react is installed
  'Anessk': <span role="img" aria-label="syringe">💉</span>,    // Replace with <Syringe ... />
  'USK': <span role="img" aria-label="user">👩‍⚕️</span>,        // Replace with <User ... />
};

const StaffCard: React.FC<StaffCardProps> = ({ name, role, hours }) => (
  <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-2xl shadow-md text-base min-w-[180px] min-h-[56px] border border-gray-100">
    <span className="text-xl">
      {roleIcons[role] || <span role="img" aria-label="user">👤</span>}
    </span>
    <div className="flex flex-col flex-1">
      <span className="font-semibold leading-tight text-gray-800 flex items-center gap-1">
        {name}
      </span>
      {hours && <span className="text-xs text-gray-500 leading-tight">{hours}</span>}
    </div>
    <span className="ml-1 text-xs text-gray-500 uppercase">{role}</span>
  </div>
);

export default StaffCard;
