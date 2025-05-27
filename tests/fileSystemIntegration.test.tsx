import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import AdminPage from '../src/renderer/components/Admin/AdminPage';

// Mock window.electron API for save/load
beforeAll(() => {
  (window as any).electron = {
    saveSchedule: vi.fn(async (data) => ({ success: true, filePath: 'test.ops' })),
    loadSchedule: vi.fn(async () => ({ success: true, data: [{ id: '1', namn: 'Test', arbetstid: '08:00-16:00', roll: 'fast', kommentarer: '', tilldeladSalId: null, isCustom: false, createdAt: new Date() }], filePath: 'test.ops' })),
  };
});

describe('AdminPage File System Integration', () => {
  it('saves schedule successfully', async () => {
    render(<AdminPage />);
    const saveBtn = screen.getByText(/spara schema/i);
    await fireEvent.click(saveBtn);
    expect(window.electron.saveSchedule).toHaveBeenCalled();
  });

  it('loads schedule successfully', async () => {
    render(<AdminPage />);
    const loadBtn = screen.getByText(/ladda schema/i);
    await fireEvent.click(loadBtn);
    expect(window.electron.loadSchedule).toHaveBeenCalled();
    expect(await screen.findByText(/Test/)).toBeInTheDocument();
  });

  it('handles save error', async () => {
    (window as any).electron.saveSchedule = vi.fn(async () => ({ success: false, error: 'Disk error' }));
    render(<AdminPage />);
    const saveBtn = screen.getByText(/spara schema/i);
    await fireEvent.click(saveBtn);
    // No throw, but alert is called (would need to mock window.alert for full check)
    expect(window.electron.saveSchedule).toHaveBeenCalled();
  });

  it('handles load error', async () => {
    (window as any).electron.loadSchedule = vi.fn(async () => ({ success: false, error: 'File not found' }));
    render(<AdminPage />);
    const loadBtn = screen.getByText(/ladda schema/i);
    await fireEvent.click(loadBtn);
    expect(window.electron.loadSchedule).toHaveBeenCalled();
  });
});
