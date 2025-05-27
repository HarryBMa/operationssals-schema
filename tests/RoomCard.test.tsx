import React from 'react';
import { render } from '@testing-library/react';
import RoomCard from '../src/components/Admin/RoomCard';

describe('RoomCard', () => {
  it('renders room name and empty state', () => {
    const { getByText } = render(
      <RoomCard id="room1" name="Sal 1" staff={[]} />
    );
    expect(getByText('Sal 1')).toBeInTheDocument();
    expect(getByText(/Ingen personal tilldelad/)).toBeInTheDocument();
  });

  it('renders assigned staff', () => {
    const staff = [
      { id: '1', name: 'Anna', workHours: '08:00-16:00' },
      { id: '2', name: 'Erik', workHours: '09:00-17:00', isCustom: true },
    ];
    const { getByText } = render(
      <RoomCard id="room2" name="Sal 2" staff={staff} />
    );
    expect(getByText('Anna')).toBeInTheDocument();
    expect(getByText('Erik')).toBeInTheDocument();
  });

  it('handles edge case: no staff prop', () => {
    // @ts-expect-error
    render(<RoomCard id="room3" name="Sal 3" />);
  });
});
