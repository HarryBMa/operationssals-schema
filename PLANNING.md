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
├── main/                    # Electron main process
│   ├── main.ts             # Main entry point
│   ├── fileHandler.ts      # Excel import/export via Electron
│   └── store.ts            # Electron Store setup
├── renderer/               # React application
│   ├── routes/            # Route-level page components
│   │   ├── Admin.tsx      # /admin - Personalplanering
│   │   ├── Dashboard.tsx  # /tavla - Dagens Schema
│   │   └── Settings.tsx   # /installningar - Konfiguration
│   ├── components/        # Feature-organized components (<500 lines each)
│   │   ├── Admin/         # Planning interface components
│   │   │   ├── StaffSidebar.tsx    # Staff cards container with filters
│   │   │   ├── RoomBoard.tsx       # Main drag-drop area with rooms
│   │   │   ├── StaffCard.tsx       # Draggable staff member card
│   │   │   ├── RoomCard.tsx        # Drop zone for room assignments
│   │   │   ├── ExcelImport.tsx     # Excel file import interface
│   │   │   ├── CustomStaffModal.tsx # Create temp/student staff
│   │   │   └── Filters.tsx         # Staff filtering (alla, fast, vikarie, student)
│   │   ├── Dashboard/     # Digital signage display components
│   │   │   └── SchemaDisplay.tsx   # Read-only schedule display
│   │   ├── Settings/      # Configuration components
│   │   │   └── RoomConfig.tsx      # Room count/name configuration
│   │   ├── Weekdays/      # Day-specific room configurations
│   │   │   ├── Måndag.tsx          # 4-5 rooms layout
│   │   │   ├── Tisdag.tsx          # 3 rooms layout
│   │   │   ├── Onsdag.tsx          # 4-5 rooms layout
│   │   │   ├── Torsdag.tsx         # 3 rooms layout
│   │   │   ├── Fredag.tsx          # 4-5 rooms layout
│   │   │   ├── Lördag.tsx          # Weekend layout (if needed)
│   │   │   └── Söndag.tsx          # Weekend layout (if needed)
│   │   ├── ui/            # Reusable UI primitives
│   │   │   ├── Header.tsx          # App header with navigation
│   │   │   ├── Button.tsx          # Styled button variants
│   │   │   └── Modal.tsx           # Modal component wrapper
│   │   └── common/        # Shared utility components
│   │       ├── LoadingSpinner.tsx
│   │       ├── ErrorBoundary.tsx
│   │       └── Layout.tsx
│   ├── hooks/             # Custom React hooks
│   │   ├── useLocalStorage.ts      # Electron Store integration
│   │   ├── useStaff.ts            # Staff management logic
│   │   ├── useRooms.ts            # Room configuration logic
│   │   └── useDragDrop.ts         # Drag & drop state management
│   ├── stores/            # State management
│   │   ├── staffStore.ts          # Zustand store for staff data
│   │   ├── roomStore.ts           # Room assignments & configuration
│   │   └── appStore.ts            # Global app state
│   ├── utils/             # Utility functions
│   │   ├── excelParser.ts         # Parse Excel files to Staff objects
│   │   ├── dataExport.ts          # Export schedules (JSON/PDF backup)
│   │   ├── dataImport.ts          # Import from various formats
│   │   └── dateHelpers.ts         # Swedish date formatting
│   ├── types/             # TypeScript definitions
│   │   └── index.ts               # All interfaces and enums
│   ├── i18n/              # Swedish localization
│   │   └── sv.ts                  # Swedish labels and text
│   ├── App.tsx            # Main app component with routing
│   ├── main.tsx           # React entry point
│   └── index.css          # Tailwind CSS imports
└── shared/                # Shared between main and renderer
    ├── types.ts           # IPC communication types
    └── constants.ts       # App-wide constants
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
