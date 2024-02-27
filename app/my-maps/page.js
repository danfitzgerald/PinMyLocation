// app/profile/page.js
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import SignOutButton from '../signoutbutton';
import MapsView from './mapsview';

export default withPageAuthRequired(async function Profile({ searchParams }) {
  const { user } = await getSession();

  const query = searchParams?.query || "";
  const currentPage = searchParams?.page || 1;

  return <div className="flex flex-col items-center gap-y-2">
    Hello {user.name}!
    <a className="rounded-full bg-blue-400 text-white px-4 py-1 text-center shadow-md" href="/my-maps/create-map">
      Create New Map
    </a>
    <MapsView currentPage={1} itemsPerPage={10} email={user.email}/>
    <SignOutButton/>
  </div>;
}, { returnTo: '/my-maps' })
// You need to provide a `returnTo` since Server Components aren't aware of the page's URL