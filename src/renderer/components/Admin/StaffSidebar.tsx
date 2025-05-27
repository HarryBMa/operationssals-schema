import React from 'react';
import StaffCard from './StaffCard';
import { Personal } from '../../types';

interface StaffSidebarProps {
  staff?: Personal[];
}

const StaffSidebar: React.FC<StaffSidebarProps> = ({ staff = [] }) => {
  return (
    <div className="staff-sidebar w-1/3 bg-gray-50 p-2 rounded">
      <h2 className="font-bold mb-2">Personal</h2>
      {staff.length === 0 ? (
        <div className="text-gray-400 italic">Ingen personal kvar</div>
      ) : (
        staff.map((member) => (
          <div key={member.id} className="mb-2">
            <StaffCard personal={member} />
          </div>
        ))
      )}
    </div>
  );
};

export default StaffSidebar;