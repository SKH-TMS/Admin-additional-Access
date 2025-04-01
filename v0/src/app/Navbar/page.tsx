"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticatedPM, setIsAuthenticatedPM] = useState(false);
  const [isAuthenticatedTML, setIsAuthenticatedTML] = useState(false);

  useEffect(() => {
    // Check if there's a token in cookies
    const token = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("token="));
    setIsAuthenticated(!!token); // Set authentication state based on token presence
    const userType = sessionStorage.getItem("userType");
    setIsAuthenticatedPM(userType === "ProjectManager");
    const userRole = sessionStorage.getItem("userRole");
    setIsAuthenticatedTML(!!userRole);
  }, []);

  return (
    <nav className="flex justify-between">
      <div>
        <Link href="/">Home</Link>
      </div>
      <div>
        {!isAuthenticatedPM ? (
          <>
            {!isAuthenticatedTML ? (
              <>
                <Link href="/userData/ProfileUser">User</Link>
              </>
            ) : (
              <>
                <Link href="/teamData/ProfileTeam">User</Link>
              </>
            )}
          </>
        ) : (
          <>
            <Link href="/projectManagerData/ProfileProjectManager">User</Link>
          </>
        )}
        <Link href="/adminData/ProfileAdmin">Admin</Link>
      </div>
    </nav>
  );
}
