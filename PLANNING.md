# PLANNING.md - Operationssals Personalschema

## Project Vision
Build a Swedish Operating Room Staff Scheduling desktop application that runs as a portable executable on work PCs with UAC restrictions. The app enables drag-and-drop staff scheduling across multiple operating rooms with offline-first functionality.

## Architecture & Tech Stack

### Core Technologies
- **Framework**: Electron (portable executable)
- **Build Tool**: Vite
- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS 4.1+ (CSS-only config)
- **UI Components**: ShadCN/UI
- **Drag & Drop**: @dnd-kit/core, @dnd-kit/sortable
- **Excel Processing**: ExcelJS (modern replacement for xlsx)
- **State Management**: React Context + useReducer
- **Storage**: localStorage (offline-first)

### Key Architectural Decisions
1. **Portable Deployment**: Electron packaged as single executable
2. **No Network Dependency**: All data stored locally after initial setup
3. **Swedish Localization**: All UI text in Swedish
4. **Multi-Mode Interface**: Planning mode + Dashboard/Display mode
5. **Modular Components**: Keep files under 500 lines, split when needed

## Core Features & User Stories

### 1. Excel Import System
- Import staff data with columns: Name, Work hours, Comments
- Validate and sanitize imported data
- Handle Swedish characters and formatting
- Preview before import confirmation

### 2. Drag & Drop Planning Interface
- Visual staff cards with work hours and comments
- Drag staff to operating rooms (3-5 rooms per day)
- Different room configurations per weekday:
  - Tuesday/Thursday: 3 rooms
  - Monday/Wednesday/Friday: 4-5 rooms
- Real-time validation (work hours, conflicts)

### 3. Multi-Day Planning
- Tabbed interface for Monday-Sunday
- Independent room configurations per day
- Copy/paste schedules between days
- Save/load different weekly templates

### 4. Dashboard Display Mode
- Full-screen read-only view for wall-mounted displays
- Clean, large text for visibility
- Auto-refresh current day schedule
- Toggle between days with arrow keys

### 5. Custom Staff Management
- Manual entry for temporary staff, students, substitutes
- Quick-add cards during planning
- Persistent storage of custom entries

## Technical Constraints

### Deployment Environment
- Windows work PCs with UAC restrictions
- No admin privileges for installation
- No internet connectivity assumed
- Portable executable requirement

### Performance Requirements
- Smooth drag & drop interactions
- Fast Excel import (up to 1000+ staff records)
- Responsive UI on older hardware
- Minimal memory footprint

### Localization Requirements
- All UI text in Swedish
- Swedish date/time formats
- Handle Swedish characters (å, ä, ö) properly
- Cultural conventions for work scheduling

## File Structure Guidelines
```
src/
├── components/          # Feature-organized components (<500 lines each)
│   ├── Admin/          # Planning interface components
│   │   ├── StaffSidebar.tsx
│   │   ├── RoomBoard.tsx
│   │   ├── StaffCard.tsx
│   │   ├── RoomCard.tsx
│   │   ├── ExcelImport.tsx
│   │   ├── CustomStaffModal.tsx
│   │   └── Filters.tsx
│   ├── Dashboard/      # Display mode components
│   │   └── SchemaDisplay.tsx
│   ├── Settings/       # Configuration components
│   │   └── RoomConfig.tsx
│   ├── ui/            # Reusable UI primitives
│   │   ├── Header.tsx
│   │   ├── Button.tsx
│   │   └── Modal.tsx
│   └── common/        # Shared utility components
├── hooks/             # Custom React hooks
│   ├── useLocalStorage.ts
│   ├── useStaff.ts
│   └── useRooms.ts
├── utils/             # Utility functions
│   ├── excelParser.ts
│   ├── dataExport.ts
│   └── dataImport.ts
├── types/             # TypeScript definitions
│   └── index.ts
├── i18n/              # Swedish localization
│   └── sv.ts
├── weekdays/          # Day-specific components
│   ├── Måndag.tsx
│   ├── Tisdag.tsx
│   ├── Onsdag.tsx
│   ├── Torsdag.tsx
│   ├── Fredag.tsx
│   ├── Lördag.tsx
│   └── Söndag.tsx
├── App.tsx
├── main.tsx
└── index.css
routes/                # Route-level components
├── Admin.tsx
├── Dashboard.tsx
└── Settings.tsx
```

## Development Workflow Rules
1. Keep components under 500 lines - split into modules when needed
2. Start fresh AI conversations often - long threads degrade quality
3. One task per AI request for clarity
4. Test early and often - unit tests for every function
5. Write documentation and comments as you code
6. Use markdown files (PLANNING.md, TASK.md) for project management
7. Be specific in AI requests with examples and context

## Swedish UI Terminology
- **Operationssal** = Operating Room
- **Personal** = Staff
- **Arbetstid** = Work Hours
- **Schema** = Schedule
- **Måndag-Söndag** = Monday-Sunday
- **Planering** = Planning
- **Översikt** = Overview/Dashboard
- **Importera** = Import
- **Exportera** = Export

## Next Steps
1. Set up basic Electron + Vite + React project structure
2. Configure Tailwind CSS 4.1 with ShadCN
3. Create core TypeScript types and interfaces
4. Implement Excel import functionality
5. Build drag & drop planning interface
6. Add multi-day scheduling tabs
7. Create dashboard display mode
8. Package as portable executable