'use client';

import { SignUp } from '@clerk/nextjs';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <SignUp
          appearance={{
            elements: {
              rootBox: 'mx-auto',
              card: 'bg-white shadow-xl rounded-2xl',
            },
          }}
          routing="path"
          path="/register"
          redirectUrl="/dashboard"
          signInUrl="/login"
        />
      </div>
    </div>
  );
}
