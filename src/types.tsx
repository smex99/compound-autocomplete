export type Chore = {
  chore_name: string;
  completed: boolean;
};

export type KidInfo = {
  name: string;
  points: number;
  chores: Chore[];
};
