import React, { useState } from "react";
import { useDroppable } from "@dnd-kit/core";

interface EditableExternalRoomCardProps {
  staff?: Array<{
    id: string;
    name: string;
    workHours: string;
    comments?: string;
    isCustom?: boolean;
  }>;
  initialName?: string;
  onNameChange?: (newName: string) => void;
  onDrop?: (staffId: string, targetRoomId: string) => void;
}

/**
 * Card for displaying staff assigned to external work (CRNA lent to other units), with editable name.
 */
const EditableExternalRoomCard: React.FC<EditableExternalRoomCardProps> = ({
  staff = [],
  initialName = "Extern tjänstgöring",
  onNameChange,
  onDrop,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id: "external-work" });
  const borderClass = isOver ? "border-2 border-yellow-500 bg-yellow-50" : "border";
  const [name, setName] = useState(initialName);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    onNameChange?.(e.target.value);
  };

  return (
    <div
      ref={setNodeRef}
      className={`room-card rounded-xl shadow-lg bg-white p-4 flex flex-col min-h-[120px] transition-all ${borderClass}`}
    >
      <input
        className="font-bold text-lg mb-2 text-yellow-700 bg-transparent border-b border-yellow-300 focus:outline-none focus:border-yellow-600"
        value={name}
        onChange={handleNameChange}
        aria-label="Extern tjänstgöring namn"
      />
      <div className="flex-1 flex flex-col gap-2">
        {staff.length === 0 ? (
          <div className="text-gray-400 text-center italic">Ingen personal tilldelad</div>
        ) : (
          staff.map((member) => (
            <div key={member.id} className="rounded px-2 py-1 bg-yellow-100 text-sm">
              {member.name} <span className="text-xs text-gray-500">({member.workHours})</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EditableExternalRoomCard;
