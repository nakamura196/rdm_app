// import { OAuthConfig } from "next-auth/providers";

export const authOptions = {
    providers: [
        {
            id: "osf",
            name: "OSF",
            type: "oauth",
            clientId: process.env.OSF_CLIENT_ID,
            clientSecret: process.env.OSF_CLIENT_SECRET,
            authorization: {
                url: "https://accounts.osf.io/oauth2/authorize",
                params: { scope: "osf.full_read osf.full_write" },
            },
            token: "https://accounts.osf.io/oauth2/token",
            userinfo: "https://api.osf.io/v2/users/me/",
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.full_name,
                    email: profile.email,
                };
            },
        },
    ],
    callbacks: {
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        },
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
    },
};