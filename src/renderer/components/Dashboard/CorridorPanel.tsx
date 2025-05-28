import React from 'react';
import StaffCard from './StaffCard';

interface Staff {
  name: string;
  role: string;
  lunchRoom: string;
}

interface CorridorPanelProps {
  staff: Staff[];
}

const CorridorPanel: React.FC<CorridorPanelProps> = ({ staff }) => (
  <div className="bg-white rounded-lg shadow p-4 mt-4">
    <h2 className="font-semibold text-gray-700 mb-2">Korridorpanel – Lunchlöser</h2>
    <ul className="space-y-2">
      {staff.map((s) => (
        <li key={s.name} className="flex items-center gap-2">
          <StaffCard name={s.name} role={s.role} />
          <span className="text-xs text-gray-500">lunchlöser {s.lunchRoom}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default CorridorPanel;
