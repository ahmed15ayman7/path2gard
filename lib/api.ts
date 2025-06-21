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
    
        const url = `/api/${role=="Admin"?"ProjectAdmin":role}/Profile`;
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
export const projectApi = {
    getProjects: async () => {
        const url = `/api/Project/ProjectBank`;
        const response = await api.get(url);
        return response.data;
    },
    getProjectsById: async (projectId:string) => {
        const url = `/api/Project/ProjectBank/${projectId}`;
        const response = await api.get(url);
        return response.data;
    },
    getProjectData: async () => {
        const url = `/api/Student/Project`;
        const response = await api.get(url);
        return response.data;
    },
    customizeProject: async (project:{
        "projectName": string,
        "description": string,
        "fields": [
          {
            "fieldName": string
          }
        ],
        "numberOfTeam": number
      }) => {
        const url = `/api/Project/CustomizeProject`;
        const response = await api.post(url,project);
        return response.data;
    }
}
export const Internship = {
    getInternship: async () => {
        const url = `/api/Internship/Internship`;
        const response = await api.get(url);
        return response.data;
    },
    getUploadCertificates: async () => {
        const url = `/api/Internship/UploadCertificates`;
        const response = await api.get(url);
        return response.data;
    },
    uploadCertificates: async (certificate:File) => {
        const url = `/api/Internship/UploadCertificates`;
        const formData = new FormData();
        formData.append('file', certificate);
        const response = await api.post(url,formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },
    getWorkFiles: async () => {
        const url = `/api/Internship/WorkFiles`;
        const response = await api.get(url);
        return response.data;
    },
    uploadWorkFiles: async (workFile:File) => {
        const url = `/api/Internship/WorkFiles`;
        const formData = new FormData();
        formData.append('file', workFile);
        const response = await api.post(url,formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }
}
export const downListApi = {
    getProjectField: async () => {
        const url = `/api/DownList/ProjectField`;
        const response = await api.get(url);
        return response.data;
    },
    getSupervisor: async () => {
        const url = `/api/DownList/Supervisor`;
        const response = await api.get(url);
        return response.data;
    },
    getCoSupervisor: async () => {
        const url = `/api/DownList/CoSupervisor`;
        const response = await api.get(url);
        return response.data;
    }

}
export const projectAdminApi = {
    getProjects: async () => {
        const url = `/api/ProjectAdmin/Projects`;
        const response = await api.get(url);
        return response.data;
    }
}
export const taApi = {
    getProjects: async () => {
        const url = `/api/TeachingAssistant/Projects`;
        const response = await api.get(url);
        return response.data;
    },
    getProject: async (projectId:string) => {
        const url = `/api/TeachingAssistant/ProjectById/${projectId}`;
        const response = await api.get(url);
        return response.data;
    }
}
export const doctorApi = {
    getProjects: async () => {
        const url = `/api/Doctor/Projects`;
        const response = await api.get(url);
        return response.data;
    },
    getProjectById: async (projectId:string) => {
        const url = `/api/Doctor/ProjectById/${projectId}`;
        const response = await api.get(url);
        return response.data;
    },
    getProfile: async () => {
        const url = `/api/Doctor/Profile`;
        const response = await api.get(url);
        return response.data;
    },
    getProjectFields: async () => {
        const url = `/api/Doctor/ProjectFields`;
        const response = await api.get(url);
        return response.data;
    }
}

export default api;