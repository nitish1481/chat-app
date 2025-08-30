import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:`https://chat-app-th3k.onrender.com/api`,
  withCredentials: true,
  
});
