import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import { toast } from "react-hot-toast"

// set --> setter function for our states
export const useAuthStore = create ((set)=>{
    // returns an object containing states related to authentication
    return {
        authUser: null, // initially, we don't know if user is authenticated
        isSigningUp: false,
        isLoggingIn: false,
        isUpdatingProfile: false,
        checkingAuth: true, // as soon as refresh, we check if user is authenticated
        checkAuth: async () => {
            try {
                const res = await axiosInstance.get("/auth/check")
                set({authUser: res.data})
            } catch (error) {
                console.log("Error checking auth", error)
                set({authUser: null})
            }
            finally {
                set({checkingAuth: false})
            }
        },
        signup: async (data) => {
            set({ isSigningUp: true });
            try {
              const res = await axiosInstance.post("/auth/signup", data);
              set({ authUser: res.data });
              toast.success("Account created successfully");
            } catch (error) {
              toast.error(error.response.data.message);
            } finally {
              set({ isSigningUp: false });
            }
        },
        logout: async () => {
            try {
              await axiosInstance.post("/auth/logout");
              set({ authUser: null });
              toast.success("Logged out successfully");
            } catch (error) {
              toast.error(error.response.data.message);
            }
        },
        

    }
})