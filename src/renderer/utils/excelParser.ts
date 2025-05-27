import ExcelJS from 'exceljs';

// Extended staff row to match workflow in staffing_system_explanation.md
export interface StaffDaySchedule {
  status: string;
  time?: string;
  note?: string;
}

export interface StaffMember {
  name: string;
  category: 'SSK' | 'USK' | string;
  dailySchedules: StaffDaySchedule[];
  comments?: string;
}

export interface ExcelParseResult {
  data: StaffMember[];
  errors: string[];
}

// Parse Excel file according to staffing_system_explanation.md workflow
const parseExcel = async (file: File): Promise<ExcelParseResult> => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(await file.arrayBuffer());
  const worksheet = workbook.getWorksheet(1);
  const data: StaffMember[] = [];
  const errors: string[] = [];

  if (!worksheet) {
    errors.push('Ingen data hittades i Excel-filen.');
    return { data, errors };
  }

  let currentSection: 'SSK' | 'USK' | null = null;
  let rowIndex = 1;
  const maxRows = worksheet.rowCount;

  while (rowIndex <= maxRows) {
    const row = worksheet.getRow(rowIndex);
    const firstCell = row.getCell(1).value?.toString().toLowerCase() || '';

    // 1. Identify section headers
    if (firstCell.includes('op ssk')) {
      currentSection = 'SSK';
      rowIndex++;
      continue;
    }
    if (firstCell.includes('usk')) {
      currentSection = 'USK';
      rowIndex++;
      continue;
    }

    // 2. Skip invalid/empty/comment-only/separator rows
    const isSeparator = firstCell === 'usk';
    const valuesArray = Array.isArray(row.values) ? row.values : [];
    const isEmpty = valuesArray.filter((v) => v !== null && v !== undefined && v !== '').length === 0;
    if (!firstCell || isSeparator || isEmpty) {
      rowIndex++;
      continue;
    }

    // 3. Parse staff entries (skip invalid/empty rows)
    const name = row.getCell(1).value?.toString().trim();
    if (!name) {
      rowIndex++;
      continue;
    }

    // 4. Extract daily schedules for each staff member (columns 2-6)
    const dailySchedules: StaffDaySchedule[] = [];
    for (let i = 2; i <= 6; i++) {
      const cell = row.getCell(i).value?.toString().trim() || '';
      if (!cell) {
        dailySchedules.push({ status: 'Unavailable' });
        continue;
      }
      if (/ledig/i.test(cell)) {
        dailySchedules.push({ status: 'Available' });
      } else if (/k-utv|civa/i.test(cell)) {
        dailySchedules.push({ status: 'Unavailable', note: cell });
      } else if (/sjuk/i.test(cell)) {
        dailySchedules.push({ status: 'Sick', note: cell });
      } else if (/^\d{2}[:\.]\d{2}-\d{2}[:\.]\d{2}$/.test(cell)) {
        dailySchedules.push({ status: 'Scheduled', time: cell.replace('.', ':') });
      } else {
        dailySchedules.push({ status: 'Other', note: cell });
      }
    }

    // 5. Handle special notations and comments (multi-line)
    let comments = '';
    let lookahead = 1;
    while (
      rowIndex + lookahead <= maxRows &&
      !worksheet.getRow(rowIndex + lookahead).getCell(1).value
    ) {
      const commentCell = worksheet.getRow(rowIndex + lookahead).getCell(2).value;
      if (commentCell) comments += commentCell.toString() + ' ';
      lookahead++;
    }

    // 6. Create staff objects with all required fields
    data.push({
      name,
      category: currentSection || '',
      dailySchedules,
      comments: comments.trim() || undefined,
    });

    rowIndex += lookahead;
  }

  return { data, errors };
};

export default parseExcel;