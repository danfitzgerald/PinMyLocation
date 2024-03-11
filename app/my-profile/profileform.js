'use client'
import { BIG_BUTTON_CLASS_NAME, createBigButtonStyle } from "@/app/components/bigbutton";
import { useFormState } from 'react-dom'
import { updateProfile } from "@/app/actions";

export default function ProfileForm({ displayName }) {
  const initialState = undefined;
  const [state, formAction] = useFormState(updateProfile, initialState);
  
  return <form
    action={formAction}
    className="flex flex-col gap-y-2 text-start"
    >
    {state ? 
      <div className={(state.success ? "bg-green-500" : "bg-red-500") + " font-bold p-2"}>
        <p className="text-white">{state?.message}</p>
      </div> 
      : <></>}
    <h1 className="text-xl font-bold">Update Profile</h1>
    <div>
      Display Name: <br />
      <input name="displayName" type="text" className="p-2 w-full" placeholder="Display Name" defaultValue={displayName} />
    </div>
    <input type="submit" className={BIG_BUTTON_CLASS_NAME} style={createBigButtonStyle({})} value="Update Profile" />
  </form>;
}