import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import LoggedInNavBar from "@/app/components/loggedinnavbar";
import ProfileForm from "./profileform";
import prisma from "@/lib/prisma";

export default withPageAuthRequired(async function Profile({}) {
  const { user } = await getSession();
  
  const { name } = await prisma.user.findUnique({
    where: {
      email: user.email
    }
  });

  return <div>
    <LoggedInNavBar />
    <div className="flex flex-col text-center items-center h-[calc(100%-60px)] mx-4 mt-6">
      <div className="w-full lg:w-1/2">
        <ProfileForm displayName={name} />
      </div>
    </div>
  </div>
}, { returnTo: "/my-profile" });
