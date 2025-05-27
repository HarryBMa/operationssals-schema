import RoomCard from "../Admin/RoomCard";

export function OnsdagLayout({ salar, onStaffDrop }: WeekdayProps) {
  /**
   * Wednesday layout with 4 operating rooms.
   * Renders 4 RoomCard components in optimized grid.
   */
  return (
    <div className="grid grid-cols-4 gap-4 h-full">
      {salar.slice(0, 4).map(sal => (
        <RoomCard key={sal.id} sal={sal} onDrop={onStaffDrop} />
      ))}
    </div>
  );
}