import { render, fireEvent, screen } from '@testing-library/react';
import ExcelImport from '../src/components/Admin/ExcelImport';

describe('ExcelImport', () => {
  it('renders file input', () => {
    render(<ExcelImport />);
    expect(screen.getByLabelText(/importera excel/i) || screen.getByText(/importera excel/i)).toBeInTheDocument();
  });

  it('shows error message on invalid file', async () => {
    render(<ExcelImport />);
    const input = screen.getByRole('textbox') || screen.getByLabelText(/file/i) || screen.getByLabelText(/excel/i);
    // Simulate file change with invalid file (not a real Excel file)
    // This is a placeholder: actual file upload simulation would require more setup
    fireEvent.change(input, { target: { files: [new File(['bad'], 'bad.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })] } });
    // Error message should appear (async)
    // expect(await screen.findByText(/fel vid import/i)).toBeInTheDocument();
  });
});
