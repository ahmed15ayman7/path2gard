import { create } from "zustand";

type UserType = "Student" | "Doctor" | "TeachingAssistant" | "Admin" | null;

interface UserState {
    userType: UserType;
    isClient: boolean;
    setUserType: (type: UserType) => void;
}

interface UserEmailState {
    userEmail: { email: string, name: string, role: string } | null;
    isClient: boolean;
    setUserEmail: (email: { email: string, name: string, role: string }) => void;
}

interface TrackEnrolledState {
    trackEnrolled: boolean;
    setTrackEnrolled: (trackEnrolled: boolean) => void;
}

interface ProjectEnrolledState {
    projectEnrolled: boolean;
    setProjectEnrolled: (projectEnrolled: boolean) => void;
}

export const useUserStore = create<UserState>((set) => {
    let initialType: UserType = null;

    if (typeof window !== "undefined") {
        const stored = localStorage.getItem("userType");
        if (stored === "Student" || stored === "Doctor" || stored === "TeachingAssistant" || stored === "Admin") {
            initialType = stored;
        }
    }

    return {
        userType: initialType,
        isClient: false,
        setUserType: (type) => {
            if (typeof window !== "undefined") {
                localStorage.setItem("userType", type ?? "" as string);
            }
            set({ userType: type });
        },
    };
});

export const useUserEmail = create<UserEmailState>((set) => {
    let initialEmail: { email: string, name: string, role: string } | null = null;

    if (typeof window !== "undefined") {
        const stored = localStorage.getItem("userEmail");
        if (stored) {
            initialEmail = JSON.parse(stored);
        }
    }

    return {
        userEmail: initialEmail,
        isClient: false,
        setUserEmail: (email) => {
            if (typeof window !== "undefined") {
                localStorage.setItem("userEmail", JSON.stringify(email));
            }
            set({ userEmail: email });
        },
    };
});
export const useTrackEnrolled = create<TrackEnrolledState>((set) => {
    let initialTrackEnrolled: boolean = false;
    if (typeof window !== "undefined") {
        const stored = localStorage.getItem("trackEnrolled");
        if (stored) {
            initialTrackEnrolled = JSON.parse(stored);
        }
    }
    return {
        trackEnrolled: initialTrackEnrolled,
        setTrackEnrolled: (trackEnrolled) => {
            if (typeof window !== "undefined") {
                localStorage.setItem("trackEnrolled", JSON.stringify(trackEnrolled));
            }
            set({ trackEnrolled });
        },
    };
});
export const useProjectEnrolled = create<ProjectEnrolledState>((set) => {
    let initialProjectEnrolled: boolean = false;
    if (typeof window !== "undefined") {
        const stored = localStorage.getItem("projectEnrolled");
        if (stored) {
            initialProjectEnrolled = JSON.parse(stored);
        }
    }
    return {
        projectEnrolled: initialProjectEnrolled,
        setProjectEnrolled: (projectEnrolled) => {
            if (typeof window !== "undefined") {
                localStorage.setItem("projectEnrolled", JSON.stringify(projectEnrolled));
            }   
            set({ projectEnrolled });
        },
    };
});
if (typeof window !== 'undefined') {
    useUserStore.setState({ isClient: true });
}
