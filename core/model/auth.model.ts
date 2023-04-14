import React from "react";

export interface IAuthData {
  userName: string;
  email: string;
  access_token: string;
  userId: string;
  avatarURL: string;
  avatarName: string;
}

export interface IAuthContext {
  authData: IAuthData | null;
  setAuthData: React.Dispatch<React.SetStateAction<IAuthData | null>>;
}
