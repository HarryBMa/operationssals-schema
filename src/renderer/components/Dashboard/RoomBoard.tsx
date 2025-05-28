import React from 'react';
import RoomCard from './RoomCard';
import StaffCard from './StaffCard';

const rooms = [
  { name: 'Sal 1', status: 'Klar', opssk: { name: 'Anna S', hours: '07:00-16:00' }, anessk: { name: 'Johan P', hours: '07:00-16:00' }, usk: { name: 'Maria L', hours: '07:00-16:00' } },
  { name: 'Sal 2', status: 'Väntar', opssk: { name: 'Erik B', hours: '07:00-16:00' }, anessk: { name: 'Sara K', hours: '07:00-16:00' }, usk: { name: 'Oskar N', hours: '07:00-16:00' } },
  { name: 'Sal 3', status: 'Saknas', opssk: null, anessk: null, usk: null },
  { name: 'Sal 4', status: 'Klar', opssk: { name: 'Lina M', hours: '07:00-16:00' }, anessk: { name: 'Per T', hours: '07:00-16:00' }, usk: { name: 'Emma R', hours: '07:00-16:00' } },
  { name: 'Sal 5', status: 'Väntar', opssk: { name: 'Moa F', hours: '07:00-16:00' }, anessk: null, usk: { name: 'Kalle Z', hours: '07:00-16:00' } },
  { name: 'Sal 6', status: 'Klar', opssk: { name: 'Nina Q', hours: '07:00-16:00' }, anessk: { name: 'Viktor W', hours: '07:00-16:00' }, usk: null },
] as const;

const RoomBoard: React.FC = () => (
  <div className="w-full max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-6 rounded-2xl box-border overflow-x-auto min-h-0">
    {rooms.map((room) => (
      <RoomCard
        key={room.name}
        name={room.name}
        status={room.status}
        opssk={room.opssk ? <StaffCard name={room.opssk.name} role="Opssk" hours={room.opssk.hours} /> : undefined}
        anessk={room.anessk ? <StaffCard name={room.anessk.name} role="Anessk" hours={room.anessk.hours} /> : undefined}
        usk={room.usk ? <StaffCard name={room.usk.name} role="USK" hours={room.usk.hours} /> : undefined}
      />
    ))}
  </div>
);

export default RoomBoard;
