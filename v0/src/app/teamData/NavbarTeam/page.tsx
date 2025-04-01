"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NavbarTeam() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = async () => {
    setIsAuthenticated(false);
    setUserRole(null);
    sessionStorage.removeItem("userType");
    sessionStorage.removeItem("userRole"); // Clear the stored role
    router.push("/userData/LoginUser"); // Redirect to login

    try {
      const response = await fetch("../../api/auth/logout", {
        method: "GET",
      });
      const data = await response.json();
      if (!data.success) {
        console.error("Error logging out:", data.message);
      }
      toast.success("Logout Successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Check authentication status from sessionStorage
    const userType = sessionStorage.getItem("userType");
    const role = sessionStorage.getItem("userRole");
    // Only set as authenticated if the userType is "User" and a role is present
    if (userType === "User" && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  return (
    <nav className="bg-red-300 flex justify-between ">
      <div>
        <Link href="/">Home</Link>
      </div>
      <div>
        {!isAuthenticated ? (
          <>
            <Link href="/userData/RegisterUser">Register</Link>
            <Link href="/userData/LoginUser">Login</Link>
          </>
        ) : (
          <>
            <Link href="/teamData/ProfileTeam">Profile</Link>
            {userRole === "TeamMember" && (
              <Link href="/teamData/teamMemberData/ManageTasks">
                PerformTasks
              </Link>
            )}
            {userRole === "TeamLeader" && (
              <Link href="/teamData/teamLeaderData/ShowTeams">ManageTeam</Link>
            )}
            {userRole === "TeamMember_and_TeamLeader" && (
              <>
                <Link href="/teamData/teamMemberData/ManageTasks">
                  PerformTasks
                </Link>
                <Link href="/teamData/teamLeaderData/ShowTeams">
                  ManageTeam
                </Link>
              </>
            )}
            <a className="cursor-pointer ml-4" onClick={handleLogout}>
              Logout
            </a>
          </>
        )}
      </div>
    </nav>
  );
}
