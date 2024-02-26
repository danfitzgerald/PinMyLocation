'use client'
import { useUser } from '@auth0/nextjs-auth0/client';

function continueClick(user) {
  if (user) {
    location = "/api/auth/logout";
  } else {
    location = "/api/auth/login";
  }
}

export default function ContinueButton() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{"Unable to determine if you are logged in: " + error.message}</div>;

  return <button className="rounded-full bg-blue-400 text-white px-4 py-1 text-center shadow-md" onClick={() => continueClick(user)}>
    {user ? "Continue as " + user.name + "" : "Sign in"}
  </button>
}
