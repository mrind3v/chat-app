import axios from "axios";

// axios helps us making HTTP requests from React apps
export const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true, // send cookies in every single HTTP request 
});
