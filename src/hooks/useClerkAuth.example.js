// This file shows how to use Clerk in your app components
// Import these hooks from @clerk/nextjs instead of AuthContext

import { useUser, useAuth, useClerk } from '@clerk/nextjs';

// Example usage in a component:
export function ExampleComponent() {
  // Get current user data
  const { user, isLoaded, isSignedIn } = useUser();
  
  // Get auth state and session token
  const { getToken, signOut } = useAuth();
  
  // Get Clerk instance for advanced operations
  const clerk = useClerk();
  
  // Check if user is signed in
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  
  if (!isSignedIn) {
    return <div>Please sign in</div>;
  }
  
  // Access user data
  return (
    <div>
      <h1>Hello {user.firstName}!</h1>
      <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
      <img src={user.imageUrl} alt="Profile" />
      
      <button onClick={() => signOut()}>
        Sign Out
      </button>
    </div>
  );
}

// For API calls that need authentication:
async function makeAuthenticatedRequest() {
  const { getToken } = useAuth();
  const token = await getToken();
  
  const response = await fetch('/api/something', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  return response.json();
}
