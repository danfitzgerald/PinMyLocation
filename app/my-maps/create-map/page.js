import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import CreateMapForm from './createmapform';

export default withPageAuthRequired(async function Profile() {
  const { user } = await getSession();
  return <div className="text-center items-center flex flex-col justify-center">
    Hello {user.name}!
    <br/>
    Create a new map
    <CreateMapForm />
  </div>;
}, { returnTo: '/my-maps' })
