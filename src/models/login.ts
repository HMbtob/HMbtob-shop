export interface LogInForm {
  email: string;
  password: string;
}
export interface AuthContextType {
  authState: {
    isLoading: boolean;
    authUser: any;
    exchangeRate: any;
  };
  authHandler: {
    logIn: (form: LogInForm) => Promise<any>;
    logOut: () => Promise<void>;
  };
}
