import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { FC, ReactNode, useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

interface JWTPayload {
  exp: number;
  [key: string]: any; // For other possible JWT claims
}

interface RefreshTokenResponse {
  access: string;
  [key: string]: any; // For other possible response data
}

// Step 13 Setting our route that is only accessible to users logged in
export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  // If valid, this is putting the token in localstorage
  async function refreshToken(): Promise<void> {
    // Getting refresh token out of localstorage
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    try {
      // Replacing the refresh token
      const res = await api.post<RefreshTokenResponse>("/api/token/refresh/", {
        refresh: refreshToken,
      });

      // If validated we put it back in localstorage
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error(error);
      setIsAuthorized(false);
    }
  }

  // Check if access token doesn't exist or is expired
  async function auth(): Promise<void> {
    // Checking for token
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      setIsAuthorized(false);
      return;
    }

    try {
      // Get token expiration
      const decoded = jwtDecode<JWTPayload>(token);
      const tokenExpiration = decoded.exp;
      const now = Date.now() / 1000;

      // If expired use refreshToken function
      if (tokenExpiration < now) {
        await refreshToken();
      } else {
        setIsAuthorized(true);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      setIsAuthorized(false);
    }
  }

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
};
