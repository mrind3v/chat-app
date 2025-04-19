import {create} from "zustand"

// set --> setter function for our states
export const useAuthStore = create ((set)=>{
    // returns an object containing states related to authentication
    return {
        authUser: null, // initially, we don't know if user is authenticated
        checkingAuth: true, // as soon as refresh, we check if user is authenticated
        isSigningUp: false,
        isLoggingIn: false,
        isUpdatingProfile: false,
    }
})