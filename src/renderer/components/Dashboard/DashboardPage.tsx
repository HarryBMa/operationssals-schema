import React from 'react';
import Header from './Header';
import InfoCard from './InfoCard';
import RoomBoard from './RoomBoard';
import CorridorPanel from './CorridorPanel';

// Dummy data for demonstration
const today = new Date(2025, 4, 28); // May is month 4 (0-indexed)
const leads = { op: 'Anna S', ane: 'Johan P' };
const info = {
  title: 'Dagens information',
  message: 'Blod saknas efter 13:00. Kontakta transfusionsenheten vid behov.'
};
const rooms: {
  id: number;
  name: string;
  status: "Klar" | "Långsal" | "Stängd";
  roles: { Opssk: null; Anessk: null; USK: null };
}[] = [
  { id: 1, name: 'Sal 1', status: 'Klar', roles: { Opssk: null, Anessk: null, USK: null } },
  { id: 2, name: 'Sal 2', status: 'Långsal', roles: { Opssk: null, Anessk: null, USK: null } },
  { id: 3, name: 'Sal 3', status: 'Stängd', roles: { Opssk: null, Anessk: null, USK: null } },
  { id: 4, name: 'Sal 4', status: 'Klar', roles: { Opssk: null, Anessk: null, USK: null } },
  { id: 5, name: 'Sal 5', status: 'Långsal', roles: { Opssk: null, Anessk: null, USK: null } },
  { id: 6, name: 'Sal 6', status: 'Klar', roles: { Opssk: null, Anessk: null, USK: null } },
];
const staff = [
  { name: 'Maria L', role: 'USK', lunchRoom: 'Sal 2' },
  { name: 'Erik B', role: 'Opssk', lunchRoom: 'Sal 4' },
  { name: 'Sara K', role: 'Anessk', lunchRoom: 'Sal 1' },
];

const DashboardPage: React.FC = () => {
  return (
    <div className="w-full max-w-[1920px] min-h-screen min-w-0 mx-auto bg-slate-100 overflow-x-auto box-border flex flex-col">
      <Header date={today} leads={leads} />
      <InfoCard title={info.title} message={info.message} />
      <RoomBoard rooms={rooms} />
      <CorridorPanel staff={staff} />
    </div>
  );
};

export default DashboardPage;
