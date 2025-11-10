export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token?: string;
  user: UserDto;
}

export interface UserDto {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface RefreshTokenDto {
  refresh_token: string;
}
