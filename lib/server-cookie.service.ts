'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const ACCESS_TOKEN_KEY = 'token';

export async function setTokensF(token: string): Promise<void> {
    try {
        const cookieStore = await cookies();

        // تعيين التوكن مع خيارات إضافية للأمان
        await cookieStore.set(ACCESS_TOKEN_KEY, token, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/'
        });

      
    } catch (error) {
        console.error('خطأ في حفظ الكوكيز في الخادم:', error);
    }
}

export async function gettoken(): Promise<string | undefined> {
    try {
        const cookieStore = await cookies();
        return cookieStore.get(ACCESS_TOKEN_KEY)?.value;
    } catch (error) {
        console.error('خطأ في قراءة الكوكيز من الخادم:', error);
        return undefined;
    }
}


export async function removeTokens(): Promise<void> {
    try {
        const cookieStore = await cookies();
        cookieStore.delete(ACCESS_TOKEN_KEY);
    } catch (error) {
        console.error('خطأ في حذف الكوكيز من الخادم:', error);
    }
}
export async function redirectToLogin() {
    redirect('/login');
}