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
                    // const response = await axios.post("http://elgazery.runasp.net/api/Account/login", {
                    //     email: credentials?.email || '',
                    //     password: credentials?.password || '',
                    //     role: credentials?.role || '',
                    // });
                    // const { token } = response.data;
                    


                    return {
                        id: '1',
                        ...credentials,
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