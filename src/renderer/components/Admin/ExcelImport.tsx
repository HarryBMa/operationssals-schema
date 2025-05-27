import React, { useState } from 'react';
import parseExcel, { ExcelParseResult, StaffRow } from '../../utils/excelParser';

interface ExcelImportProps {
  onImport?: (importedStaff: StaffRow[]) => void;
}

const ExcelImport: React.FC<ExcelImportProps> = ({ onImport }) => {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [successCount, setSuccessCount] = useState<number | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessages([]);
    setSuccessCount(null);
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const result: ExcelParseResult = await parseExcel(file);
      if (result.errors && result.errors.length > 0) {
        setErrorMessages(result.errors);
      } else {
        setSuccessCount(result.data.length);
        if (onImport) onImport(result.data);
      }
    } catch (err) {
      setErrorMessages(['Fel vid import av Excel-fil. Kontrollera filformatet.']);
    }
  };

  return (
    <div className="excel-import">
      <h2>Importera Excel</h2>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      {errorMessages.length > 0 && (
        <div className="bg-red-100 text-red-700 p-2 mt-2 rounded">
          <ul>
            {errorMessages.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
      {successCount !== null && successCount > 0 && (
        <div className="bg-green-100 text-green-700 p-2 mt-2 rounded">
          {successCount} rader importerade utan fel.
        </div>
      )}
    </div>
  );
};

export default ExcelImport;