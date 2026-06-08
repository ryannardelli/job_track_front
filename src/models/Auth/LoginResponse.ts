export interface LoginResponse {
    token: string;
    user: {
      uuid: string;
      name: string;
      email: string;
    };
}