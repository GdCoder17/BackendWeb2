export interface Student {
  id: number;
  name: string;
  email: string | null;
}

export interface StudentAuthRecord extends Student {
  passwordHash: string;
}
