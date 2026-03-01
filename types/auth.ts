export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  passwordConfirm: string;
  nombres?: string;
  apellidos?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    id: number;
    email: string;
    nombres?: string;
    apellidos?: string;
    token?: string;
    emailVerificado: boolean;
    estado: string;
  };
  errors?: Record<string, string[]>;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface User {
  id: number;
  email: string;
  nombres?: string;
  apellidos?: string;
  estado: string;
  emailVerificado: boolean;
  createdAt: Date;
}
