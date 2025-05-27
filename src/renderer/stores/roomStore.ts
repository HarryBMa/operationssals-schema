import create from 'zustand';

interface RoomAssignment {
  roomId: string;
  staffIds: string[];
}

interface RoomStoreState {
  assignments: RoomAssignment[];
  setAssignments: (assignments: RoomAssignment[]) => void;
  clearAssignments: () => void;
}

interface UseRoomStoreSetAssignments {
  (assignments: RoomAssignment[]): void;
}

interface UseRoomStoreClearAssignments {
  (): void;
}

interface UseRoomStore {
  assignments: RoomAssignment[];
  setAssignments: UseRoomStoreSetAssignments;
  clearAssignments: UseRoomStoreClearAssignments;
}

export const useRoomStore = create<UseRoomStore>((set) => ({
  assignments: [],
  setAssignments: (assignments: RoomAssignment[]) => set({ assignments }),
  clearAssignments: () => set({ assignments: [] }),
}));
