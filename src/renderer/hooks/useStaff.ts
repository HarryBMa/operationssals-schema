import { useState } from 'react';

export interface Staff {
  id: string;
  name: string;
  workHours: string;
  comments?: string;
  isCustom?: boolean;
}

const useStaff = () => {
  const [staff, setStaff] = useState<Staff[]>([]);

  const addStaff = (newStaff: Staff) => {
    setStaff([...staff, newStaff]);
  };

  const removeStaff = (id: string) => {
    setStaff(staff.filter((s) => s.id !== id));
  };

  return { staff, addStaff, removeStaff };
};

export default useStaff;