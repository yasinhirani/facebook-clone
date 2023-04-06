import React from "react";

export interface IAuthData {
  userName: string;
  email: string;
  access_token: string;
  userId: string;
  avatar: string;
}

export interface IAuthContext {
  authData: IAuthData | null;
  setAuthData: React.Dispatch<React.SetStateAction<IAuthData | null>>;
}
