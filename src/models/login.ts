export interface LogInForm {
  email: string;
  password: string;
}
export interface AuthContextType {
  authState: {
    isLoading: boolean;
    authUser: object | null;
  };
  authHandler: {
    logIn: (form: LogInForm) => Promise<string | null | undefined | object>;
    logOut: () => Promise<null>;
  };
}
