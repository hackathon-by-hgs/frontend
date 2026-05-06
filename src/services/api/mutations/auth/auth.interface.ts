import { User } from "@/stores/auth.store";
export interface IRegister {
  name: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IAuthResponse {
  message: string;
  data: {
    userObj: User;

    accessToken: string;
    refreshToken: string;
  };
}


export interface IAuthLoginResponse {
  message: string;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

