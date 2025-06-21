import axios from 'axios';
import authService from './auth.service';
import { useSession } from 'next-auth/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://elgazery.runasp.net';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor للطلبات
api.interceptors.request.use(
    async (config) => {
        const token = await authService.gettokenFromCookie();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.log(error)
        return Promise.reject(error);
    }
);



// Auth APIs
export const authApi = {
    login: async (credentials: { email: string; password: string ;role:string}) => {
        try {

            const response = await api.post('/api/Account/login', credentials);
            console.log(response.data);
            const { token } = response.data;
            await authService.setTokens(token);

            return token;
        } catch (error) {
            console.log(error)
            return null
        }
    },


    logout: async () => {
        try {
            await api.post('/api/Account/logout');
        } finally {
            authService.logout();
        }
    },




};
export const userApi = {
    getuserdata: async (role:string) => {
        const url = `/api/${role}/Profile`;
        const response = await api.get(url);
        return response.data;
    }
}
export const surveyApi = {
    postSurvey: async (data:any) => {
        const url = `/api/Recommendation/Survey`;
        const response = await api.post(url,{
            "fieldOfInterest": data["1"],
            "pythonComfortLevel": data["2"],
            "databaseExperience": data["3"],
            "developmentPreference": data["4"],
            "dataAnalysisEnjoyment": data["5"],
            "cybersecurityPassion": data["6"],
            "problemSolvingSkills": data["7"],
            "projectExperience": data["8"],
            "dataToolsEnjoyment": data["9"],
            "graduationProjectType": data["10"]
          });
        return response.data;
    }
}
export const trackApi = {
    getTrack: async () => {
        const url = `/api/Track/Track`;
        const response = await api.get(url);
        return response.data;
    },
    updateTrack: async (lessonId:string,isComplet:boolean) => {
        const url = `/api/Track/UpdateLessonStatus`;
        const response = await api.put(url,{
            "lessonId": lessonId,
            "isCompleted": isComplet
        });
        return response.data;
    },
    getTrackRate: async () => {
        const url = `/api/Track/TrackRate`;
        const response = await api.get(url);
        return response.data;
    }
}

export default api;