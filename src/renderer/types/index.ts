export enum PersonalRoll {
  FAST = 'fast',
  VIKARIE = 'vikarie',
  STUDENT = 'student',
  ANNAN = 'annan'
}

export interface Personal {
  id: string;
  namn: string;
  arbetstid: string;
  roll: PersonalRoll;
  kommentarer: string;
  tilldeladSalId: string | null;
  isCustom: boolean;
  createdAt: Date;
}

export interface Operationssal {
  id: string;
  namn: string;
  tilldeladPersonal: Personal[];
  maxPersonal?: number;
}

export interface DagSchema {
  datum: string;
  veckodag: 'måndag' | 'tisdag' | 'onsdag' | 'torsdag' | 'fredag' | 'lördag' | 'söndag';
  salar: Operationssal[];
  antalSalar: number; // 3 for Tue/Thu, 4-5 for Mon/Wed/Fri
}
