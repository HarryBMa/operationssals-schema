import React from 'react';
import StaffCard from './StaffCard';
// import { User, Stethoscope, Syringe, UserCog } from 'lucide-react'; // Uncomment if lucide-react is installed

interface RoomCardProps {
  name: string;
  status: 'Klar' | 'Väntar' | 'Saknas';
  opssk?: React.ReactNode;
  anessk?: React.ReactNode;
  usk?: React.ReactNode;
}

const statusColors: Record<string, string> = {
  'Klar': 'bg-green-200 text-green-900',
  'Väntar': 'bg-yellow-200 text-yellow-900',
  'Saknas': 'bg-red-200 text-red-900',
};

const RoomCard: React.FC<RoomCardProps> = ({ name, status, opssk, anessk, usk }) => (
  <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-4 min-h-[200px] max-w-full box-border overflow-hidden">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        {/* <User className="w-5 h-5 text-gray-400" /> */}
        <h3 className="text-xl font-semibold uppercase tracking-wide truncate max-w-[220px]">{name}</h3>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[status]}`}>{status}</span>
    </div>
    <div className="flex flex-col gap-4 mt-2">
      <div className="flex items-center gap-2 min-w-0">
        {/* <Stethoscope className="w-4 h-4 text-blue-400" /> */}
        <span className="font-medium text-gray-700 truncate">Opssk</span>
        <div className="flex-1 flex justify-end min-w-0">{opssk || <div className="w-36 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-400">-</div>}</div>
      </div>
      <div className="flex items-center gap-2 min-w-0">
        {/* <Syringe className="w-4 h-4 text-purple-400" /> */}
        <span className="font-medium text-gray-700 truncate">Anessk</span>
        <div className="flex-1 flex justify-end min-w-0">{anessk || <div className="w-36 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-400">-</div>}</div>
      </div>
      <div className="flex items-center gap-2 min-w-0">
        {/* <UserCog className="w-4 h-4 text-pink-400" /> */}
        <span className="font-medium text-gray-700 truncate">USK</span>
        <div className="flex-1 flex justify-end min-w-0">{usk || <div className="w-36 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-400">-</div>}</div>
      </div>
    </div>
    {/* Drag-and-drop support will be added later with dnd-kit */}
  </div>
);

export default RoomCard;
