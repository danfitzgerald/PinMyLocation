import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import SignOutButton from '@/app/components/signoutbutton';
import MapsView from './mapsview';
import { NavBar } from '@/app/components/navbar';
import BigLink from '@/app/components/biglink';

export default withPageAuthRequired(async function Profile({ searchParams }) {
  const { user } = await getSession();

  const query = searchParams?.query || "";
  const currentPage = searchParams?.page || 1;
  const itemsPerPage = 10;

  return <div>
    <NavBar />
    <div className="flex flex-col gap-y-2 mt-6 lg:mx-10">
      <div className='columns-2 mb-6'>
        <div className="text-xl font-bold">
          {user.name}&apos;s maps:
        </div>
        <div className="text-end">
          <SignOutButton />
        </div>
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
