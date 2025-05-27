export const sv = {
  navigation: {
    admin: 'Personalplanering',
    dashboard: 'Dagens Schema',
    settings: 'Inställningar'
  },
  staff: {
    importExcel: 'Importera Excel',
    createCustom: 'Skapa Personal',
    createSubstitute: 'Skapa Personalvikarie',
    arbetstid: 'Arbetstid',
    kommentarer: 'Kommentarer',
    roll: {
      fast: 'Fast anställd',
      vikarie: 'Vikarie',
      student: 'Student',
      annan: 'Annan'
    }
  },
  rooms: {
    operationssal: 'Operationssal',
    tilldeladPersonal: 'Tilldelad Personal',
    tomSal: 'Tom sal'
  },
  excel: {
    importError: 'Fel vid import av Excel-fil. Kontrollera filformatet.',
    noData: 'Ingen data hittades i Excel-filen.',
    missingName: 'Namn saknas.',
    missingWorkHours: 'Arbetstid saknas.',
    invalidWorkHours: 'Ogiltigt arbetstidsformat (förväntat HH:MM-HH:MM).',
    importedRows: (count: number) => `${count} rader importerade utan fel.`
  },
  storage: {
    quotaExceeded: 'Lagringsutrymmet är fullt. Kan inte spara data.',
    generic: 'Fel vid sparande till localStorage.'
  },
  common: {
    personalplanering: 'Personalplanering',
    dagensSchema: 'Dagens Schema',
    importeraExcel: 'Importera Excel',
    skapaPersonalvikarie: 'Skapa Personalvikarie',
    arbetstid: 'Arbetstid',
    kommentarer: 'Kommentarer',
    operationssal: 'Operationssal',
    tilldeladPersonal: 'Tilldelad Personal'
  }
};

// Legacy export for backward compatibility
export const swedishLabels = sv.common;

export default sv;