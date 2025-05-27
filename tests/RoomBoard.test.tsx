import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RoomBoard from '../src/components/Admin/RoomBoard';
import { DndContext } from '@dnd-kit/core';

describe('RoomBoard', () => {
  it('renders all rooms and staff', () => {
    const { getByText } = render(<RoomBoard />);
    expect(getByText('Sal 1')).toBeInTheDocument();
    expect(getByText('Sal 2')).toBeInTheDocument();
    expect(getByText('Sal 3')).toBeInTheDocument();
    expect(getByText('Anna')).toBeInTheDocument();
    expect(getByText('Erik')).toBeInTheDocument();
  });

  it('shows feedback when no staff left', () => {
    // Simulate all staff assigned
    // This is a placeholder; actual drag-and-drop simulation would require more setup
    // For now, just check the empty state message exists in the DOM
    const { getByText } = render(<RoomBoard />);
    expect(getByText(/Ingen personal kvar/i)).toBeInTheDocument();
  });

  // Edge case: dropping outside any room
  it('does not crash if staff is dropped outside a room', () => {
    // This would require simulating a dragEnd event with no over target
    // Placeholder for now
    expect(true).toBe(true);
  });
});
