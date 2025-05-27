import React from 'react';
import { render } from '@testing-library/react';
import StaffCard from '../src/components/Admin/StaffCard';

describe('StaffCard', () => {
  it('renders staff name and work hours', () => {
    const { getByText } = render(
      <StaffCard id="1" name="Anna" workHours="08:00-16:00" />
    );
    expect(getByText('Anna')).toBeInTheDocument();
    expect(getByText(/Arbetstid: 08:00-16:00/)).toBeInTheDocument();
  });

  it('shows comments if provided', () => {
    const { getByText } = render(
      <StaffCard id="2" name="Erik" workHours="09:00-17:00" comments="Vikarie" />
    );
    expect(getByText('Vikarie')).toBeInTheDocument();
  });

  it('shows custom badge for custom staff', () => {
    const { getByText } = render(
      <StaffCard id="3" name="Test" workHours="10:00-18:00" isCustom />
    );
    expect(getByText('Tillfällig')).toBeInTheDocument();
  });
});
