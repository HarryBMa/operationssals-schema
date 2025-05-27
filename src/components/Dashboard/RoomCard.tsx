type StaffMember = {
  id: string;
  name: string;
  workHours: string;
  comments: string;
  isCustom?: boolean;
};

interface RoomCardProps {
  roomName: string;
  staff: StaffMember[];
  onRemoveStaff?: (id: string) => void;
}

export default function RoomCard({ roomName, staff, onRemoveStaff }: RoomCardProps) {
  return (
    <div className="rounded-xl shadow-lg bg-white border p-4 flex flex-col min-h-[180px]">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-bold text-lg text-blue-900">{roomName}</h2>
        <span className="text-xs text-gray-500">{staff.length} pers</span>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        {staff.length === 0 ? (
          <div className="text-gray-400 text-center italic">Ingen personal tilldelad</div>
        ) : (
          staff.map((member) => (
            <div
              key={member.id}
              className={`rounded-lg px-3 py-2 flex items-center gap-2 bg-blue-50 border border-blue-100 ${
                member.isCustom ? 'border-l-4 border-l-green-500' : ''
              }`}
            >
              <div className="flex-1">
                <div className="font-semibold text-sm">{member.name}</div>
                <div className="text-xs text-gray-600">Arbetstid: {member.workHours}</div>
                {member.comments && (
                  <div className="text-xs text-gray-500 italic">{member.comments}</div>
                )}
                {member.isCustom && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded ml-1">
                    Tillfällig
                  </span>
                )}
              </div>
              {onRemoveStaff && (
                <button
                  onClick={() => onRemoveStaff(member.id)}
                  className="ml-2 text-red-500 hover:text-red-700 text-lg"
                >
                  ×
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
