export interface Cohort {
    id: string;
    name: string;
  }
  
  export interface Course {
    id: string;
    name: string;
    cohortId: string;
  }
  
  export interface Student {
    status: ReactNode;
    updatedAt: ReactNode;
    createdAt: ReactNode;
    cohort: any;
    id: string;
    name: string;
    cohortId: string;
    courses: Course[];
  }
  
  export interface DashboardOption {
    title: string;
    description: string;
  }