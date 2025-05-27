import { DagSchema, Personal } from "../renderer/types";

export interface ElectronAPI {
  importExcel: () => Promise<Personal[]>;
  exportBackup: (data: DagSchema) => Promise<boolean>;
  openWindow: (type: 'admin' | 'dashboard') => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}