import { SignInSchema } from "@/screens/sign-in/_validations/sign-in-schema";
import { api } from "../api/axios";
import { AuthenticateResponse } from "../interfaces/https/authenticate-response";
import { RegisterSchema } from "@/screens/register/_validations/register-schema";


export async function authenticate(userData: SignInSchema): Promise<AuthenticateResponse> {
  const { data } = await api.post<AuthenticateResponse>("/auth/login", userData)
  return data;
}

export async function registerUser(userData: RegisterSchema): Promise<AuthenticateResponse> {
  const { data } = await api.post<AuthenticateResponse>("/auth/register", userData)
  return data;
}