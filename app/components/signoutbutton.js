"use client"

import BigButton from "./bigbutton"

export default function SignOutButton() {
  return <BigButton px="0.5rem" py="0.5rem" my="0" onClick={() => location = "/api/auth/logout"}>
    Sign out
  </BigButton>
}