import parseExcel from '../../src/utils/excelParser';

describe('parseExcel', () => {
  it('should return error for missing name', async () => {
    // Simulate a file with missing name in row 2
    // This is a placeholder: in real test, use a mock ExcelJS workbook
    // For now, just check the validation function directly
    const { validateRow } = await import('../../src/utils/excelParser');
    expect(validateRow(['', '08:00-16:00', ''], 2)).toMatch(/Namn saknas/);
  });

  it('should return error for missing work hours', async () => {
    const { validateRow } = await import('../../src/utils/excelParser');
    expect(validateRow(['Anna', '', ''], 2)).toMatch(/Arbetstid saknas/);
  });

  it('should return error for invalid work hours format', async () => {
    const { validateRow } = await import('../../src/utils/excelParser');
    expect(validateRow(['Anna', '8-16', ''], 2)).toMatch(/Ogiltigt arbetstidsformat/);
  });

  it('should pass for valid row', async () => {
    const { validateRow } = await import('../../src/utils/excelParser');
    expect(validateRow(['Anna', '08:00-16:00', ''], 2)).toBeNull();
  });
});
