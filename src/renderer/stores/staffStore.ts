import create from 'zustand';
import { StaffMember } from '../types';

interface StaffStoreState {
  staff: StaffMember[];
  setStaff: (staff: StaffMember[]) => void;
  addStaff: (member: StaffMember) => void;
  clearStaff: () => void;
}

interface SetStaff {
  (staff: StaffMember[]): void;
}

interface AddStaff {
  (member: StaffMember): void;
}

interface ClearStaff {
  (): void;
}

export const useStaffStore = create<StaffStoreState>((set: (partial: Partial<StaffStoreState> | ((state: StaffStoreState) => Partial<StaffStoreState>), replace?: boolean) => void) => ({
  staff: [],
  setStaff: (staff: StaffMember[]) => set({ staff }),
  addStaff: (member: StaffMember) => set((state: StaffStoreState) => ({ staff: [...state.staff, member] })),
  clearStaff: () => set({ staff: [] }),
}));
