import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import SignOutButton from '../signoutbutton';
import MapsView from './mapsview';
import { NavBar } from '@/app/components/navbar';
import Link from 'next/link';

export default withPageAuthRequired(async function Profile({ searchParams }) {
  const { user } = await getSession();

  const query = searchParams?.query || "";
  const currentPage = searchParams?.page || 1;

  return <div>
    <NavBar />
    <div className="flex flex-col gap-y-2 mt-6 lg:mx-10">
      <div className='columns-2 mb-6'>
        <div className="text-xl font-bold">
          {user.name}'s maps:
        </div>
        <div className="text-end">
          <SignOutButton />
        </div>
      </div>
      
      <Link className="rounded-full bg-blue-400 text-white px-4 py-1 text-center shadow-md" href="/my-maps/create-map">
        Create New Map
      </Link>
      <div className='w-full'>
        <MapsView currentPage={1} itemsPerPage={10} email={user.email}/>
      </div>
      
    </div></div>;
}, { returnTo: '/my-maps' })
// You need to provide a `returnTo` since Server Components aren't aware of the page's URL