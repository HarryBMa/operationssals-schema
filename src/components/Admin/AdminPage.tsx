import React from 'react';
import StaffSidebar from './StaffSidebar';
import RoomBoard from './RoomBoard';
import { v4 as uuidv4 } from 'uuid';

interface Staff {
  id: string;
  name: string;
  workHours: string;
  comments?: string;
  isCustom?: boolean;
}

// Dummy initial staff for demonstration
const initialStaff: Staff[] = [
  { id: uuidv4(), name: 'Anna', workHours: '08:00-16:00' },
  { id: uuidv4(), name: 'Erik', workHours: '09:00-17:00', isCustom: true },
];

export default function AdminPage() {
  return (
    <div className="p-8 flex gap-6">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">Admin</h1>
        <p>Detta är admin-vyn. Hantera användare, inställningar och import/export här.</p>
      </div>
      <StaffSidebar staff={initialStaff} />
      <RoomBoard />
    </div>
  );
}
