export type accessKeyType = "accessTokenKey" | "refreshKTokenKey";

export interface CreateUserData {
  email: string;
  name: String;
  password: string;
  salt: string;
}

export interface ApiResponseOptions {
  data: Record<string, unknown>;
  status?: Number;
  message: String;
}
