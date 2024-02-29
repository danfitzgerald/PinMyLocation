'use client'
import { useUser } from '@auth0/nextjs-auth0/client';

function continueClick(user) {
  if (user) {
    location = "/my-maps";
  } else {
    location = "/api/auth/login";
  }
}

export default function ContinueButton() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{"Unable to determine if you are logged in: " + error.message}</div>;

  return <button className="w-80 h-15 rounded-sm bg-blue-500 text-white px-8 py-4 my-4 text-center shadow-md" onClick={() => continueClick(user)}>
    {user ? "Continue as " + user.name + "" : "Sign in"}
  </button>
}
