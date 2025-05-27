import { useDraggable } from '@dnd-kit/core';
import { Personal } from '../../types';

export function StaffCard({ personal }: { personal: Personal }) {
  /**
   * Draggable staff card component.
   * Shows: namn, arbetstid, roll, kommentarer in Swedish
   */
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: personal.namn });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`staff-card rounded-lg px-3 py-2 flex flex-col gap-1 bg-white border shadow cursor-move transition-transform ${
        isDragging ? 'opacity-50 scale-105 ring-2 ring-blue-400 z-50' : ''
      }`}
      style={{
        boxShadow: isDragging ? '0 4px 16px rgba(0,0,0,0.15)' : undefined,
      }}
    >
      <div className="font-semibold text-sm">{personal.namn}</div>
      <div className="text-xs text-gray-600">Arbetstid: {personal.arbetstid}</div>
      {personal.roll && <div className="text-xs text-blue-700">Roll: {personal.roll}</div>}
      {personal.kommentarer && <div className="text-xs text-gray-500 italic">{personal.kommentarer}</div>}
    </div>
  );
}

export default StaffCard;