import { create } from "zustand";

type UserType = "Student" | "Doctor" | "Assistant" | "Admin" | null;

interface UserState {
    userType: UserType;
    isClient: boolean;
    setUserType: (type: UserType) => void;
}

interface UserEmailState {
    userEmail: string | null;
    isClient: boolean;
    setUserEmail: (email: string) => void;
}

export const useUserStore = create<UserState>((set) => {
    let initialType: UserType = null;

    if (typeof window !== "undefined") {
        const stored = localStorage.getItem("userType");
        if (stored === "Student" || stored === "Doctor" || stored === "Assistant" || stored === "Admin") {
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
    let initialEmail: string | null = null;

    if (typeof window !== "undefined") {
        const stored = localStorage.getItem("userEmail");
        if (stored) {
            initialEmail = stored;
        }
    }

    return {
        userEmail: initialEmail,
        isClient: false,
        setUserEmail: (email) => {
            if (typeof window !== "undefined") {
                localStorage.setItem("userEmail", email ?? "" as string);
            }
            set({ userEmail: email });
        },
    };
});

if (typeof window !== 'undefined') {
    useUserStore.setState({ isClient: true });
}
