/**
 * Helper function to make authenticated API calls with Clerk
 * Use this in your components when you need to call your backend API
 */

import { auth } from '@clerk/nextjs/server';

/**
 * Get Clerk auth token for server-side API calls
 * Use this in Server Components or Server Actions
 */
export async function getServerAuthToken() {
  try {
    const { getToken } = auth();
    return await getToken();
  } catch (error) {
    console.error('Error getting server auth token:', error);
    return null;
  }
}

/**
 * Make authenticated fetch request from server
 * Use this in Server Components or Server Actions
 */
export async function authenticatedFetch(url, options = {}) {
  const token = await getServerAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return fetch(url, {
    ...options,
    headers,
  });
}

/**
 * Example usage in a Server Component or Server Action:
 * 
 * import { authenticatedFetch } from '@/lib/clerk-api';
 * 
 * export default async function MyServerComponent() {
 *   const response = await authenticatedFetch('http://localhost:5000/api/v1/vehicles');
 *   const data = await response.json();
 *   return <div>{JSON.stringify(data)}</div>;
 * }
 */
