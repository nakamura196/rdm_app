"use client";

import { useAuth } from "@/hooks/useAuth"; // 新しく作成したカスタムフックをインポート

export default function Header() {
  const { session, handleSignIn, handleSignOut } = useAuth(); // useAuth フックを使用

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">GakuNin RDM App</a>
        </div>
        <div className="flex-none">
          {session ? (
            <ul className="menu menu-horizontal px-1">
              <li>
                <details>
                  <summary>{session.user.name}</summary>
                  <ul className="bg-base-100 rounded-t-none p-2">
                    <li>
                      <a onClick={handleSignOut}>Logout</a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          ) : (
            <a className="btn" onClick={handleSignIn}>
              <span>Sign in</span>
            </a>
          )}
        </div>
      </div>
    </>
  );
}
