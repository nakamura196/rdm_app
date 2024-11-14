"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function MyData() {
  const { data: session } = useSession() as {
    data: {
      user: {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
      };
      accessToken: string;
    } | null;
  };

  const fetchData = async () => {
    if (session) {
      if (session.user) {
        const res = await fetch(
          `https://pub.orcid.org/v3.0/${session.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
              Accept: "application/json",
            },
          }
        );

        const data = await res.json();
        console.log(data); // ユーザーデータを確認
      }
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Get My ORCID Data</button>

      {!session ? (
        <button onClick={() => signIn("orcid")}>Sign in</button>
      ) : (
        <>
          <p>Welcome, {session?.user?.name}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </div>
  );
}
