import { Response } from '@utils/types';

export type LoginRequestPayload = {
  username: string;
  password: string;
  keepSignedIn: boolean;
};

export type LoginData = {
  accessRights?: string[];
  accessRoles?: string[];
  fullName?: string;
  firstLogin?: boolean;
  imageUrl?: string;
  token?: string;
};

export interface ILoginSuccessResponse extends Response {
  data: LoginData;
}
