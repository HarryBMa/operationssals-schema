import { dialog } from 'electron';
import ExcelJS from 'exceljs'

// Define the Personal type for Swedish staff
export interface Personal {
  namn: string;
  arbetstid: string;
  kommentar?: string;
}

export async function importExcelFile(): Promise<Personal[]> {
  // Open file dialog for Excel files
  const { canceled, filePaths } = await dialog.showOpenDialog({
    filters: [
      { name: 'Excel Files', extensions: ['xlsx', 'xls'] },
    ],
    properties: ['openFile']
  });
  if (canceled || filePaths.length === 0) return [];

  // Read and parse the Excel file using ExcelJS
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePaths[0]);
  const worksheet = workbook.worksheets[0];
  const personals: Personal[] = [];

  worksheet.eachRow((row, rowNumber) => {
    const namn = row.getCell(1).value?.toString().trim();
    const arbetstid = row.getCell(2).value?.toString().trim();
    const kommentar = row.getCell(3).value?.toString().trim();
    if (!namn || !arbetstid) return; // Skip invalid/empty rows
    personals.push({
      namn,
      arbetstid,
      kommentar: kommentar || undefined,
    });
  });
  return personals;
}