
export interface Task {
  id: number;
  name: string;
  estimatedPomodoros: number;
  completedPomodoros: number;
  completed: boolean;
  note?: string;
  project?: string;
}