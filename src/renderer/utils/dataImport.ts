// import the correct type from '../types' or define StaffMember here if missing
// import { StaffMember } from '../types';
type StaffMember = {
  // define the properties of StaffMember here as per your project requirements
  id: string;
  name: string;
  // add other fields as needed
};

export function importFromJson(json: string): StaffMember[] {
  try {
    return JSON.parse(json);
  } catch {
    return [];
  }
}
