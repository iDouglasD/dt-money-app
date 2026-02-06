import { SignInSchema } from "@/screens/sign-in/_validations/sign-in-schema";
import { api } from "../api/axios";
import { AuthenticateResponse } from "../interfaces/https/authenticate-response";


export async function authenticate(userData: SignInSchema): Promise<AuthenticateResponse> {
  const { data } = await api.post<AuthenticateResponse>("/auth/login", userData)
  return data;
}