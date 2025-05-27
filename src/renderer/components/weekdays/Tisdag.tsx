import RoomCard from "../Admin/RoomCard";

export function TisdagLayout({ salar, onStaffDrop }: WeekdayProps) {
  /**
   * Tuesday layout with 3 operating rooms.
   * Renders 3 RoomCard components in optimized grid.
   */
  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      {salar.slice(0, 3).map(sal => (
        <RoomCard key={sal.id} sal={sal} onDrop={onStaffDrop} />
      ))}
    </div>
  );
}