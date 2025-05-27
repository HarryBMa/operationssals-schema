import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import RoomCard from './RoomCard';
import StaffCard from './StaffCard';
import { v4 as uuidv4 } from 'uuid'; // TODO: Add @types/uuid if needed

interface Staff {
  id: string;
  name: string;
  workHours: string;
  comments?: string;
  isCustom?: boolean;
}

interface Room {
  id: string;
  name: string;
  staff: Staff[];
}

// Dummy initial data for demonstration
const initialRooms: Room[] = [
  { id: uuidv4(), name: 'Sal 1', staff: [] },
  { id: uuidv4(), name: 'Sal 2', staff: [] },
  { id: uuidv4(), name: 'Sal 3', staff: [] },
];
const initialStaff: Staff[] = [
  { id: uuidv4(), name: 'Anna', workHours: '08:00-16:00' },
  { id: uuidv4(), name: 'Erik', workHours: '09:00-17:00', isCustom: true },
];

const RoomBoard: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [staff, setStaff] = useState<Staff[]>(initialStaff);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return; // Edge case: dropped outside any room
    const staffId = active.id as string;
    const roomId = over.id as string;
    const draggedStaff = staff.find((s) => s.id === staffId);
    if (!draggedStaff) return;
    // Remove staff from sidebar
    setStaff((prev) => prev.filter((s) => s.id !== staffId));
    // Add staff to the room
    setRooms((prev) =>
      prev.map((room) =>
        room.id === roomId
          ? { ...room, staff: [...room.staff, draggedStaff] }
          : room
      )
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex gap-6">
        <div className="w-1/3 bg-gray-50 p-2 rounded">
          <h2 className="font-bold mb-2">Personal</h2>
          {staff.length === 0 ? (
            <div className="text-gray-400 italic">Ingen personal kvar</div>
          ) : (
            staff.map((member) => (
              <div key={member.id} className="mb-2">
                <StaffCard {...member} />
              </div>
            ))
          )}
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room.id} id={room.id} name={room.name} staff={room.staff} />
          ))}
        </div>
      </div>
    </DndContext>
  );
};

export default RoomBoard;