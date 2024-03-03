import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import LoggedInNavBar from "@/app/components/loggedinnavbar";
import { BIG_BUTTON_CLASS_NAME, createBigButtonStyle } from "@/app/components/bigbutton";

export default withPageAuthRequired(async function Profile({ searchParams }) {
  return <div>
    <LoggedInNavBar />
    <div className="flex flex-col text-center items-center h-[calc(100%-60px)] mx-4 mt-6">
      <div className="w-full lg:w-1/2">
        <form
          name="createmapform"
          method="POST"
          className="flex flex-col gap-y-2 text-start"
        >
          <h1 className="text-xl font-bold">Update Profile</h1>
          <div>
            Display Name: <br />
            <input name="displayName" type="text" className="p-2 w-full" placeholder="Display Name" />
          </div>
          <input type="submit" className={BIG_BUTTON_CLASS_NAME} style={createBigButtonStyle({})} value="Update Profile" />
        </form>
      </div>
    </div>
  </div>
}, { returnTo: "/my-profile" });
