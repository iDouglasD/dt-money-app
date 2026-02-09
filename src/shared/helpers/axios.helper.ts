import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosInstance } from "axios";
import { AuthenticateResponse } from "../interfaces/https/authenticate-response";

export function addTokenToHeader(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.request.use(async (config) => {
    const storedAuth = await AsyncStorage.getItem('@dtmoney:auth');

    if (storedAuth) {
      const { token } = JSON.parse(storedAuth) as AuthenticateResponse

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config
  })
}