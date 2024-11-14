"use client";

import { signIn, signOut, useSession } from "next-auth/react";

/*
export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <button onClick={() => signIn("oauth")}>Sign in</button>
      ) : (
        <>
          <p>Welcome, {session?.user?.name}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </div>
  );
}
  */

// import { useSession } from "next-auth/react";

export default function MyData() {
  const { data: session } = useSession();

  const fetchData = async () => {
    if (session) {
      const res = await fetch("https://api.osf.io/v2/users/me/", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      const data = await res.json();
      console.log(data); // ユーザーデータを確認
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Get My OSF Data</button>

      {!session ? (
        <button onClick={() => signIn("oauth")}>Sign in</button>
      ) : (
        <>
          <p>Welcome, {session?.user?.name}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </div>
  );
}
