import BigLink from "./biglink"

export default function SignOutButton() {
  return <BigLink px="0.5rem" py="0.5rem" my="0" href="/api/auth/logout">
    Sign out
  </BigLink>
}
