import { create } from "zustand";

type UserType = "Student" | "Doctor" | "Assistant" | "Admin" | null;

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

if (typeof window !== 'undefined') {
    useUserStore.setState({ isClient: true });
}
