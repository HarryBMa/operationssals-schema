# HR Staff Planning System - Import to Room/Staff Planner

## System Overview
This is a staff scheduling system that imports HR data from Excel files to create draggable staff cards for room assignments. The system handles multiple staff categories and combines schedules when staff work in multiple departments.

## File Structure Analysis

### Header Information
- **File Version**: v.48 (weeknumber)
- **Date Range**: Monday 241125 to Friday 241129 (5-day work week)
- **Format**: Weekly schedule grid with staff names and daily time slots

### Staff Categories

#### 1. OP SSK (Operating Room Registered Nurses)
**Section starts at Row 2**: "OP ssk" followed by weekday headers
- **Staff scheduling**: Name in column A, time slots for each weekday
- **Time format**: HH:MM-HH:MM (e.g., "07:00-16:00")
- **Special notations**:
  - "Ledig" = Available/Free
  - "K-utv" = Continuing education/training
  - "sjuk/[initials]" = Sick leave (with supervisor initials)
  - Various meeting notes and special assignments

#### 2. OP USK (Operating Room Assistant Nurses)
**Section starts at Row 37**: "Usk" followed by weekday headers
- **Same format** as SSK but for assistant-level staff
- **Rotation indicators**: "Civa" = Rotation to different unit
- **Competency notes**: Comments about independence levels and remaining training needs
- **Special roles**: "VL" = "Vårdledare" team leader roles

### Special Entries and System Logic

#### Invalid Entries to Filter Out:
1. **"usk" rows**: These are table break/separator rows under schedules
2. **Empty/separator rows**: Blank rows between staff entries
3. **Comment-only rows**: Rows containing only reminder comments

#### Valid Staff Entries:
1. **Staff name** in first column
2. **Time schedules** across weekday columns
3. **Status indicators** (Ledig, sick leave, training, etc.)

#### Special Categories:
1. **"Vakant ssk/usk"**: Available staff from other units who can be assigned
2. **"KÄK"**: Dental surgery staff (special assignment type)

### Data Processing Requirements

#### For Daily Staff Cards Creation:
1. **Parse each staff member's weekly schedule**
2. **Extract daily availability** for each weekday
3. **Handle special statuses**:
   - Available staff ("Ledig")
   - Training assignments ("K-utv", "Civa")
   - Sick leave ("sjuk/initials")
   - Meeting commitments
   - Other unit assignments

#### For Dual-Department Staff (OP + ANE):
1. **Identify staff** appearing in both OP and CRNA (Anesthesia) schedules
2. **Combine schedules** from both Excel files
3. **Create unified staff cards** showing complete daily availability
4. **Handle scheduling conflicts** between departments

### Implementation for AI System

#### Data Extraction Process:
```
1. Read Excel file
2. Identify section headers (OP ssk, Usk)
3. Parse staff entries (skip invalid/empty rows)
4. Extract daily schedules for each staff member
5. Handle special notations and comments
6. Create staff objects with:
   - Name
   - Category (SSK/USK)
   - Daily schedules
   - Special statuses
   - Comments/notes
```

#### Card Generation Logic:
```
1. For each staff member and each day:
   - Create draggable card if scheduled
   - Include time range
   - Show availability status
   - Add relevant notes/comments
   - Handle dual-department combinations
```

#### Room Assignment System:
```
1. Staff cards can be dragged to room assignments
2. Cards show:
   - Staff name
   - Qualification level (SSK/USK)
   - Time availability
   - Special constraints
```

### Key Data Quality Considerations

#### Comments and Notes:
- Comments appear in rows below staff names
- Contain important scheduling information
- Include supervisor initials for changes
- May contain meeting schedules or special assignments

#### Time Format Variations:
- Standard: "07:00-16:00"
- Variations: "07.00-16.00" (period instead of colon)
- Special statuses: "Ledig", "sjuk/XX", training codes

#### Multi-line Entries:
- Staff schedules may span multiple rows
- Comments and clarifications in subsequent rows
- Training or meeting details in additional rows

This system enables flexible staff assignment with drag-and-drop functionality while maintaining awareness of qualifications, availability, and special circumstances for optimal room staffing decisions.