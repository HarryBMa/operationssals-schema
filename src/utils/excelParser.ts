import ExcelJS from 'exceljs';

export interface StaffRow {
  name: string;
  workHours: string;
  comments?: string;
}

const parseExcel = async (file: File): Promise<StaffRow[]> => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(await file.arrayBuffer());
  const worksheet = workbook.getWorksheet(1);
  const data: StaffRow[] = [];

  if (!worksheet) return data;

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      data.push({
        name: String(row.getCell(1).value ?? ''),
        workHours: String(row.getCell(2).value ?? ''),
        comments: row.getCell(3).value ? String(row.getCell(3).value) : undefined,
      });
    }
  });

  return data;
};

export default parseExcel;