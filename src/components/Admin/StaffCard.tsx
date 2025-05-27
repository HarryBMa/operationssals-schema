import React from 'react';
import { useDraggable } from '@dnd-kit/core';

interface StaffCardProps {
  id: string;
  name: string;
  workHours: string;
  comments?: string;
  isCustom?: boolean;
}

const StaffCard: React.FC<StaffCardProps> = ({ id, name, workHours, comments, isCustom }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`staff-card rounded-lg px-3 py-2 flex flex-col gap-1 bg-white border shadow cursor-move transition-transform ${
        isDragging ? 'opacity-50 scale-105 ring-2 ring-blue-400 z-50' : ''
      } ${isCustom ? 'border-l-4 border-l-green-500' : ''}`}
      style={{
        boxShadow: isDragging ? '0 4px 16px rgba(0,0,0,0.15)' : undefined,
      }}
    >
      <div className="font-semibold text-sm">{name}</div>
      <div className="text-xs text-gray-600">Arbetstid: {workHours}</div>
      {comments && <div className="text-xs text-gray-500 italic">{comments}</div>}
      {isCustom && (
        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded ml-1">Tillfällig</span>
      )}
    </div>
  );
};

export default StaffCard;