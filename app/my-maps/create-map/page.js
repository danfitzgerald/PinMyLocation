import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import CreateMapForm from './createmapform';
import { NavBar } from '@/app/components/navbar';

// TODO: Fix caching issue when browsing back to my map using nav menu after creating a map from 
// Create new map button.

export default withPageAuthRequired(async function Profile() {
  const { user } = await getSession();
  return <main className="h-[100vh]">
    <NavBar />
    <div className="flex flex-col text-center items-center h-[calc(100%-60px)] mx-4 mt-6">
      <div className="w-full lg:w-1/2">
        <CreateMapForm />
      </div>
    </div>
  </main>;
}, { returnTo: '/my-maps' })
