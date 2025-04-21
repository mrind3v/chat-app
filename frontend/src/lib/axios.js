import axios from "axios";

// axios helps us making HTTP requests from React apps
export const axiosInstance = axios.create({
  //baseURL: "http://localhost:5001/api",
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "https://chat-app-xy1m.onrender.com/api",
  withCredentials: true, // send cookies in every single HTTP request 
});
