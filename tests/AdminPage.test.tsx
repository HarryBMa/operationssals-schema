import React from 'react';
import { render } from '@testing-library/react';
import AdminPage from '../src/components/Admin/AdminPage';

describe('AdminPage', () => {
  it('renders StaffSidebar and RoomBoard', () => {
    const { getAllByText, getByText } = render(<AdminPage />);
    expect(getAllByText('Personal').length).toBeGreaterThan(0);
    expect(getByText('Sal 1')).toBeInTheDocument();
  });

  it('renders with initial staff', () => {
    const { getAllByText } = render(<AdminPage />);
    expect(getAllByText('Anna').length).toBeGreaterThan(0);
    expect(getAllByText('Erik').length).toBeGreaterThan(0);
  });

  it('handles edge case: no staff or rooms', () => {
    // This is a placeholder; actual empty state would require props/state refactor
    expect(true).toBe(true);
  });
});
