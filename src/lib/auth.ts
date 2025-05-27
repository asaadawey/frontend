import { User, LoginRequest, AuthResponse } from '@/types/auth';
import { apiClient } from './api';
import { API_ROUTES } from '@/constants/apiRoutes';
import envVars from '@/config/environment'

export class AuthService {
    private static readonly TOKEN_KEY = envVars.authorization.headerKey;
    private static readonly USER_KEY = envVars.localStorage.userKey;

    static async login(credentials: LoginRequest): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>(API_ROUTES.LOGIN, credentials);

        localStorage.setItem(this.TOKEN_KEY, response.token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));

        return response;
    }

    // static async register(userData: RegisterRequest): Promise<AuthResponse> {
    //     const response = await apiClient.post<AuthResponse>(API_ROUTES.REGISTER, userData);

    //     localStorage.setItem(this.TOKEN_KEY, response.token);
    //     localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));

    //     return response;
    // }

    static logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
    }

    static getToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(this.TOKEN_KEY);
    }

    static getUser(): User | null {
        const userStr = localStorage.getItem(this.USER_KEY);
        return userStr ? JSON.parse(userStr) : null;
    }

    static isAuthenticated(): boolean {
        return !!this.getToken() && !!this.getUser();
    }
}