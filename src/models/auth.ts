export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface AuthTokenPayload {
  studentId: number;
  email: string;
}

export interface AuthTokenResponse {
  token: string;
}
