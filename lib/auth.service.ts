import { jwtDecode } from 'jwt-decode';
import { authApi } from '@/lib/api';
import { setTokensF, gettoken, removeTokens, redirectToLogin } from './server-cookie.service';

interface TokenPayload {
  exp: number;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

class AuthService {
  private static instance: AuthService;
  private refreshTokenTimeout?: NodeJS.Timeout;
  private token: string = '';
  private refresh_token: string = '';

  private constructor() { }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // تعيين التوكن عند تسجيل الدخول
  public async setTokens(token: string) {
    if (!token ) {
      console.error('Invalid tokens provided');
      return;
    }

    this.token = token;
    await setTokensF(token        );

  }

  // الحصول على التوكن الحالي
  public async gettokenFromCookie(): Promise<string> {
    let token = await gettoken()
    return  token || this.token ||'';
  }

  // التحقق من حالة تسجيل الدخول
  public async isAuthenticated(): Promise<boolean> {
    const token = await this.gettokenFromCookie();
    if (!token) return false;

    try {
      const decodedToken = jwtDecode<TokenPayload>(token);
      return decodedToken.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  // تسجيل الخروج
  public async logout() {
    this.token = '';
    this.refresh_token = '';
    await removeTokens();
    redirectToLogin();

  }

  public async clearTokens() {
    this.token = '';
    this.refresh_token = '';
    await removeTokens();
  }
}

export default AuthService.getInstance(); 