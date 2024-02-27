"use client"

export default function SignOutButton() {
  return <button className="rounded-full bg-blue-400 text-white px-4 py-1 text-center shadow-md" onClick={() => location = "/api/auth/logout"}>
    Sign out
  </button>
}