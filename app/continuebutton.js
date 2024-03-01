// 'use client'
// import { useUser } from '@auth0/nextjs-auth0/client';
import { getSession } from '@auth0/nextjs-auth0';
import BigLink from '@/app/components/biglink';

export default async function ContinueButton() {
  const session = await getSession();
  const user = session ? session.user : undefined;
  // const { user, error, isLoading } = useUser();

  // if (isLoading) return <BigButton width="80" height="15" bgcolor="gray-400">Loading...</BigButton>;
  // if (error) return <BigButton width="80" height="15" bgcolor="gray-400">{`Unable to determine if you are logged in: ${error.message}`}</BigButton>;

  return <BigLink 
    width="80" 
    height="15" 
    href={user ? "/my-maps" : "/api/auth/login"}
  >
    {user ? "Continue as " + user.name + "" : "Sign in"}
  </BigLink>
}
