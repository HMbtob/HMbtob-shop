export interface LogInForm {
  email: string;
  password: string;
}
export interface AuthContextType {
  authState: {
    isLoading: boolean;
    authUser: object | null | undefined | string;
    exchangeRate: any;
  };
  authHandler: {
    logIn: (form: LogInForm) => Promise<string | null | undefined | object>;
    logOut: () => Promise<void>;
  };
}
