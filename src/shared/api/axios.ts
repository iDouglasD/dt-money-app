import axios, { AxiosInstance } from "axios";
import { Platform } from "react-native";

const baseURL = Platform.select({
  ios: process.env.EXPO_PUBLIC_API_URL_IOS,
  android: process.env.EXPO_PUBLIC_API_URL_ANDROID,
})

export const api: AxiosInstance = axios.create({
  baseURL
})
