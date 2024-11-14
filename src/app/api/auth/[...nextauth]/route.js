import NextAuth from "next-auth";
// import Providers from "next-auth/providers";
// import { OAuth2Provider } from "next-auth/providers";
// import OAuthProvider from "next-auth/providers/oauth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            id: "osf",
            name: "OSF",
            authorize: async (credentials) => {
                const res = await fetch("https://accounts.osf.io/oauth2/token", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        client_id: process.env.OSF_CLIENT_ID,
                        client_secret: process.env.OSF_CLIENT_SECRET,
                        grant_type: "authorization_code",
                        code: credentials.code,
                        redirect_uri: process.env.NEXTAUTH_URL,
                    }),
                });
                const user = await res.json();

                if (user.access_token) {
                    return {
                        id: user.id,
                        name: user.full_name,
                        email: user.email,
                        accessToken: user.access_token,
                    };
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        },
        async jwt({ token, user }) { // account, 
            if (user) {
                token.accessToken = user.accessToken;
            }
            return token;
        },
    },
});

export { handler as GET, handler as POST };

/*
const handler = NextAuth({
    providers: [
        OAuth2Provider({
            id: "osf",
            name: "OSF",
            authorization: {
                url: "https://accounts.osf.io/oauth2/authorize",
                params: { scope: "osf.full_read osf.full_write" },
            },
            token: "https://accounts.osf.io/oauth2/token",
            clientId: process.env.OSF_CLIENT_ID,
            clientSecret: process.env.OSF_CLIENT_SECRET,
            profile: (profile) => ({
                id: profile.id,
                name: profile.full_name,
                email: profile.email,
            }),
        }),
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
});

export { handler as GET, handler as POST };
*/

/*
const handler = NextAuth({
    providers: [
        OAuthProvider({
            id: "osf",
            name: "OSF",
            authorization: {
                url: "https://accounts.osf.io/oauth2/authorize",
                params: { scope: "osf.full_read osf.full_write" },
            },
            token: "https://accounts.osf.io/oauth2/token",
            clientId: process.env.OSF_CLIENT_ID,
            clientSecret: process.env.OSF_CLIENT_SECRET,
            profile: (profile) => ({
                id: profile.id,
                name: profile.full_name,
                email: profile.email,
            }),
        }),
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
});

export { handler as GET, handler as POST };
*/

/*
export default NextAuth({
  providers: [
      Providers.OAuth2({
          id: "osf",
          name: "OSF",
          authorization: {
              url: "https://accounts.osf.io/oauth2/authorize",
              params: { scope: "osf.full_read osf.full_write" },
          },
          token: "https://accounts.osf.io/oauth2/token",
          clientId: process.env.OSF_CLIENT_ID,
          clientSecret: process.env.OSF_CLIENT_SECRET,
          profile: (profile) => ({
              id: profile.id,
              name: profile.full_name,
              email: profile.email,
          }),
      }),
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
});
*/

/*
const authOptions = {
    providers: [
        {
            id: "gakunin",
            name: "GakuNin RDM",
            type: "oauth",
            clientId: process.env.GAKUNIN_CLIENT_ID,
            clientSecret: process.env.GAKUNIN_CLIENT_SECRET,
            authorization: {
                url: "https://accounts.rdm.nii.ac.jp/oauth/authorize",
                params: { scope: "openid email profile" },
            },
            token: {
                url: "https://accounts.rdm.nii.ac.jp/oauth/token",
            },
            userinfo: {
                url: "https://api.rdm.nii.ac.jp/v2/users/me/",
            },
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                };
            },
        },
        {
            id: "orcid",
            name: "ORCID",
            type: "oauth",
            clientId: process.env.ORCID_CLIENT_ID,
            clientSecret: process.env.ORCID_CLIENT_SECRET,
            authorization: {
                url: "https://orcid.org/oauth/authorize",
                params: { scope: "/authenticate" },
            },
            token: {
                url: "https://orcid.org/oauth/token",
            }
        },
    ],
    useState: true,
    callbacks: {
        async redirect({ baseUrl }) {
            return baseUrl;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

// エクスポートするのは`NextAuth`で生成したハンドラのみ
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
*/
