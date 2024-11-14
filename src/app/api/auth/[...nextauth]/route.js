import NextAuth from "next-auth";

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
