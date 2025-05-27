import React from 'react';
import { useDroppable } from '@dnd-kit/core';

interface Staff {
  id: string;
  name: string;
  workHours: string;
  comments?: string;
  isCustom?: boolean;
}

interface RoomCardProps {
  id: string;
  name: string;
  staff?: Staff[]; // Make staff optional
}

const RoomCard: React.FC<RoomCardProps> = ({ id, name, staff = [] }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  // Reason: Visual feedback for drop zone
  const borderClass = isOver ? 'border-2 border-blue-500 bg-blue-50' : 'border';

  return (
    <div
      ref={setNodeRef}
      className={`room-card rounded-xl shadow-lg bg-white p-4 flex flex-col min-h-[120px] transition-all ${borderClass}`}
    >
      <div className="font-bold text-lg mb-2">{name}</div>
      <div className="flex-1 flex flex-col gap-2">
        {staff.length === 0 ? (
          <div className="text-gray-400 text-center italic">Ingen personal tilldelad</div>
        ) : (
          staff.map((member) => (
            <div key={member.id} className="rounded px-2 py-1 bg-blue-100 text-sm">
              {member.name} <span className="text-xs text-gray-500">({member.workHours})</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RoomCard;