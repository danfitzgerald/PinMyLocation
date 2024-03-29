import { getSession } from '@auth0/nextjs-auth0';
import { Suspense } from 'react';
import BigLink from '@/app/components/biglink';
import BigLinkFallback from '@/app/components/biglinkfallback';
import prisma from '@/lib/prisma';

async function AwaitButton() {
  const session = await getSession();
  const user = session ? session.user : undefined;

  let { name } = user ? await prisma.user.findUnique({
    where: {
      email: user.email,
    },
    select: {
      name: true,
    }
  }) : { name: undefined };

  name = name ? name : user?.email;

  return <BigLink
    width="20rem"
    href={user ? "/my-maps" : "/api/auth/login"}
  >
    {user ? "Continue as " + name + "" : "Sign in/Create Account"}
  </BigLink>
}

function FallbackButton() {
  return <BigLinkFallback width="20rem">
      Loading...
  </BigLinkFallback>;
}

export default async function ContinueButton() {
  return <Suspense fallback={<FallbackButton/>}>
    <AwaitButton/>
  </Suspense>
}
