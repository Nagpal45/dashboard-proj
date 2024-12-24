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
    status: string;
    updatedAt: string;
    createdAt: string;
    cohort: Cohort;
    id: string;
    name: string;
    cohortId: string;
    courses: Course[];
  }
  
  export interface DashboardOption {
    title: string;
    description: string;
  }