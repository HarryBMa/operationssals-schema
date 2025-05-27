import { useState } from 'react';
import StaffSidebar from './StaffSidebar';
import RoomBoard from './RoomBoard';
import ExcelImport from './ExcelImport';
import { v4 as uuidv4 } from 'uuid';
import { Personal, PersonalRoll } from '../../types';

const initialStaff: Personal[] = [
  { id: uuidv4(), namn: 'Anna', arbetstid: '08:00-16:00', roll: PersonalRoll.FAST, kommentarer: '', tilldeladSalId: null, isCustom: false, createdAt: new Date() },
  { id: uuidv4(), namn: 'Erik', arbetstid: '09:00-17:00', roll: PersonalRoll.VIKARIE, kommentarer: '', tilldeladSalId: null, isCustom: true, createdAt: new Date() },
];

export default function AdminPage() {
  const [staff, setStaff] = useState<Personal[]>(initialStaff);

  // Handler to receive imported staff from ExcelImport
  const handleExcelImport = (importedStaff: Personal[]) => {
    setStaff((prev) => [
      ...prev,
      ...importedStaff.map((s) => ({ ...s, id: uuidv4(), createdAt: new Date() }))
    ]);
  };

  // Save schedule handler
  const handleSaveSchedule = async () => {
    // Example: Save current staff list (replace with full schedule state as needed)
    const result = await (window as any).electron.saveSchedule(staff);
    if (result.success) {
      alert('Schema sparat!');
    } else {
      alert('Fel vid sparande: ' + (result.error || 'Okänt fel'));
    }
  };

  // Load schedule handler
  const handleLoadSchedule = async () => {
    const result = await (window as any).electron.loadSchedule();
    if (result.success) {
      setStaff(result.data);
      alert('Schema laddat!');
    } else if (result.error) {
      alert('Fel vid laddning: ' + result.error);
    }
  };

  return (
    <div className="p-8 flex gap-6">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">Admin</h1>
        <p>Detta är admin-vyn. Hantera användare, inställningar och import/export här.</p>
        <ExcelImport onImport={handleExcelImport as any} />
        <div className="mt-4 flex gap-2">
          <button className="btn btn-secondary" onClick={handleSaveSchedule}>Spara schema</button>
          <button className="btn btn-primary" onClick={handleLoadSchedule}>Ladda schema</button>
        </div>
      </div>
      <StaffSidebar staff={staff} />
      <RoomBoard />
    </div>
  );
}
