"use client"

import BigButton from "./bigbutton"

export default function SignOutButton() {
  return <BigButton px="2" py="2" onClick={() => location = "/api/auth/logout"}>
    Sign out
  </BigButton>
}