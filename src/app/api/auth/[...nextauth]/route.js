import NextAuth from "next-auth";

export const authOptions = {
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
    ],
    useState: false, // 追加：stateチェックを無効化
    callbacks: {
        async redirect({ baseUrl }) {
            // ログイン後にホームページにリダイレクト
            return baseUrl;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
