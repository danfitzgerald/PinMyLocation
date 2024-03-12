'use client'

import { usePathname } from 'next/navigation'
import BigLink from "./biglink"

export default function SignUpButton() {
  const pathname = usePathname();
  return <BigLink
    px="0.5rem"
    py="0.5rem"
    my="0"
    href={`/api/auth/login?returnTo=${pathname}`}
    prefetch={false}
  >
    Sign up
  </BigLink>
}
