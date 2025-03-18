import {create} from 'zustand'
import axios from 'axios'
//global state
const API_URL = "http://localhost:3000/api/auth"; 
axios.defaults.withCredentials = true;  

export const useAuthStore = create((set) => ({
    user:null,
    isAuthenticated:false,
    error:null,
    isLoading:false, 
    isCheckingAuth:true,
    signupRequest : async ({ email, password, name }) => {
        set({isLoading:true, error:null});
        try {
            const response = await axios.post(`${API_URL}/signup`, {email, password, name});
            set({user:response.data.user, isAuthenticated:true, isLoading:false});
        } catch (error) {
            set({error: error.response?.data?.message || "Error while signing in", isLoading:false});
            throw error;
        }
    }
    ,
    verifyEmailRequest : async ({ verificationCode }) => {
        set({isLoading:true, error:null});
        try {
            const response = await axios.post(`${API_URL}/verify-email`, { verificationCode });
            set({user:response.data.user, isAuthenticated:true, isLoading:false});
            return response.data;
        } catch (error) {
            set({error: error.response?.data?.message || "Error while verify email", isLoading:false});
            throw error;
        }
    }
    ,
    checkAuthRequest : async () => {
        set({isCheckingAuth: true, error:null});
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            set({user:response.data.user, isAuthenticated:true, isCheckingAuth:false});
            return response.data;
        } catch (error) {
            set({error: null, isCheckingAuth:false, isAuthenticated:false});
            throw error;
        }
    }
    ,
    LoginRequest : async ({ email, password }) => {
        set({isLoading:true, error:null});
        try {
            const response = await axios.post(`${API_URL}/signin`, { email, password });
            set({user:response.data.user, isAuthenticated:true, isLoading:false, error: null});
            console.log(response);
            return response.data;
        } catch (error) {
            set({error: error.response?.data?.message || "Error while logging in", isLoading:false});
            throw error;
        }
    }
    ,
    LogOutRequest : async () => {
        set({isLoading:true, error:null});
        try {
            await axios.post(`${API_URL}/logout`);
            set({user: null, isAuthenticated:false, isLoading:false, error: null}); 
        } catch (error) {
            set({error:"Error while logging out", isLoading:false});
            throw error;
        }
    }
    ,
    ForgetPasswordRequest : async ({ email }) => {
        set({isLoading:true, error:null});
        try {
            const response = await axios.post(`${API_URL}/forget-password`, { email });
            set({ isLoading:false}); 
        } catch (error) {
            set({error: error.response?.data?.message || "Error while try to email to reset password", isLoading:false});
            throw error;
        }
    }
    ,
    ResetPasswordRequest : async ({ token, password }) => {
        set({isLoading:true, error:null});
        try {
            const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
            set({isLoading:false}); 
        } catch (error) {
            set({error: error.response?.data?.message || "Error while try to reset password", isLoading:false});
            throw error;
        }
    }
}));