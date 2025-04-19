import { create } from "zustand";

type UserType = "student" | "doctor" | "ta" | "admin" | null;

interface UserState {
    userType: UserType;
    isClient: boolean;
    setUserType: (type: UserType) => void;
}

export const useUserStore = create<UserState>((set) => {
    let initialType: UserType = null;

    if (typeof window !== "undefined") {
        const stored = localStorage.getItem("userType");
        if (stored === "student" || stored === "doctor" || stored === "ta" || stored === "admin") {
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

if (typeof window !== 'undefined') {
    useUserStore.setState({ isClient: true });
}
