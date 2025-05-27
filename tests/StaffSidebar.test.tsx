import React from 'react';
import { render } from '@testing-library/react';
import StaffSidebar from '../src/components/Admin/StaffSidebar';

describe('StaffSidebar', () => {
  it('renders staff list', () => {
    const staff = [
      { id: '1', name: 'Anna', workHours: '08:00-16:00' },
      { id: '2', name: 'Erik', workHours: '09:00-17:00', isCustom: true },
    ];
    const { getByText } = render(<StaffSidebar staff={staff} />);
    expect(getByText('Anna')).toBeInTheDocument();
    expect(getByText('Erik')).toBeInTheDocument();
  });

  it('shows empty state if no staff', () => {
    const { getByText } = render(<StaffSidebar staff={[]} />);
    expect(getByText(/Ingen personal kvar/)).toBeInTheDocument();
  });

  it('handles edge case: missing staff prop', () => {
    // @ts-expect-error
    render(<StaffSidebar />);
  });
});
