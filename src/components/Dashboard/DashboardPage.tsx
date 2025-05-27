import RoomCard from "./RoomCard";

// Dummy data for demonstration; replace with real props/state
const demoRooms = [
  { roomName: "Sal 1", staff: [{ id: "1", name: "Anna", workHours: "08:00-16:00", comments: "", isCustom: false }] },
  { roomName: "Sal 2", staff: [] },
  { roomName: "Sal 3", staff: [{ id: "2", name: "Erik", workHours: "09:00-17:00", comments: "Vikarie", isCustom: true }] },
];

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoRooms.map((room) => (
          <RoomCard key={room.roomName} roomName={room.roomName} staff={room.staff} onRemoveStaff={() => {}} />
        ))}
      </div>
    </div>
  );
}
