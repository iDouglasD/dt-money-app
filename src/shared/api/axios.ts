import axios, { AxiosInstance } from "axios";
import { Platform } from "react-native";
import { AppError } from "../helpers/app-error";
import { addTokenToHeader } from "../helpers/axios.helper";

const baseURL = Platform.select({
  ios: process.env.EXPO_PUBLIC_API_URL_IOS,
  android: process.env.EXPO_PUBLIC_API_URL_ANDROID,
})

export const api: AxiosInstance = axios.create({
  baseURL
})

addTokenToHeader(api)

api.interceptors.response.use((config) => config, (error) => {
  if (error.response && error.response.data) {
    return Promise.reject(new AppError(error.response.data.message))
  }

  return Promise.reject(new AppError('An unexpected error occurred. Please try again later.'))
})