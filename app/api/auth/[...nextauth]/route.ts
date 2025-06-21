import { authApi } from '@/lib/api';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
                role: { label: 'Role', type: 'text' },
                name: { label: 'Name', type: 'text' },
            },
            async authorize(credentials) {
                try {
                    console.log(credentials);

                    const response = await authApi.login(credentials!); 
                    const  token  = response;
                    
                    console.log(response);

                    return {
                        id: '1',
                        ...credentials,
                        token: token,
                    };
                } catch (error) {
                    console.log(error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = (user as any);

                return token;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = token.user as any;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
    },
});

export { handler as GET, handler as POST }; 