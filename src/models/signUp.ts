export interface SignUpForm {
  email: string;
  password: string;
  fullName: string;
  companyName: string;
  country: string;
  address: string;
  phoneNumber: number;
  taxId: string;
  monthly: string;
  payment: string;
  transport: string;
  howToSell: string;
  provider: string;
  requests: string;
}

export interface Countries {
  countries: any;
}

export interface SignUpType {
  signUp: (form: SignUpForm) => Promise<void>;
}
