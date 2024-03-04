import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import MapsView from './mapsview';
import BigLink from '@/app/components/biglink';
import LoggedInNavBar from '@/app//components/loggedinnavbar';

export const revalidate = 10;

export default withPageAuthRequired(async function Profile({ searchParams }) {
  const { user } = await getSession();

  const { name: displayName } = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  })

  // TODO: implement search params.
  const query = searchParams?.query || "";
  const currentPage = searchParams?.page || 1;
  const itemsPerPage = 10;

  return <div>
    <LoggedInNavBar />
    <div className="flex flex-col gap-y-2 mt-6 lg:mx-10">
      <div className="text-xl font-bold mb-6">
        {displayName}&apos;s maps:
      </div>
      
      <BigLink href="/my-maps/create-map">
        Create New Map
      </BigLink>
      <div className='w-full'>
        <MapsView currentPage={currentPage} itemsPerPage={itemsPerPage} email={user.email}/>
      </div>
      
    </div>
  </div>;
}, { returnTo: '/my-maps' })
