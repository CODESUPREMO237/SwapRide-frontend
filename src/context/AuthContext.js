'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth as useClerkAuth, useUser } from '@clerk/nextjs';
import api, { setAuthTokenGetter } from '@/lib/api';
import toast from 'react-hot-toast';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const { isLoaded, isSignedIn, user: clerkUser } = useUser();
  const { getToken, signOut: clerkSignOut } = useClerkAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set up API token getter on mount
  useEffect(() => {
    setAuthTokenGetter(getToken);
  }, [getToken]);

  // Sync Clerk user to local state
  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn && clerkUser) {
        setUser({
          id: clerkUser.id,
          email: clerkUser.primaryEmailAddress?.emailAddress,
          firstName: clerkUser.firstName,
          lastName: clerkUser.lastName,
          fullName: clerkUser.fullName,
          imageUrl: clerkUser.imageUrl,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    }
  }, [isLoaded, isSignedIn, clerkUser]);

  /**
   * Logout user
   */
  const logout = async () => {
    try {
      await clerkSignOut();
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  /**
   * Get auth token for API calls
   */
  const getAuthToken = async () => {
    try {
      return await getToken();
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: isSignedIn,
    logout,
    getAuthToken,
    // Clerk user for direct access
    clerkUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
