"use client"

import { useRouter } from "next/navigation";
import BigButton, { createBigButtonClassName } from "@/app/components/bigbutton";

const CREATE_MAP_API = "/api/create-map";

async function createNewMapSubmit(event, router) {
  event.preventDefault();

  const formData = new FormData(document.createmapform);

  const response = await fetch(CREATE_MAP_API, {
    method: "POST",
    body: formData,
  });

  const resJson = await response.json();

  if (resJson && resJson.complete && resJson.mapId) {
    router.replace("/map/" + resJson.mapId);
  }
}

export default function CreateMapForm() {
  const router = useRouter();

  return <form 
    name="createmapform"
    action={CREATE_MAP_API}
    method="POST" 
    className="flex flex-col gap-y-2 text-start"
    onSubmit={(event) => createNewMapSubmit(event, router)}
    >
    <h1 className="text-xl font-bold">Create Map</h1>
    <div>
      Map Name: <br/>
      <input name="mapName" type="text" className="p-2 w-full" />
      </div>
    <div>
      Description: <br/>
      <input name="description" type="text" className="p-2 w-full" />
    </div>
    <div>
      <input name="isPublic" type="checkbox" /> Make map visible to anyone with a link.
    </div>
    
    <div className='flex flex-row justify-between mt-6'>
      <BigButton type="button" bgcolor="#facc15" onClick={ () => history.back() }>
        Go Back
      </BigButton>
      <input type="submit" className={createBigButtonClassName({})} value="Create New Map" />
    </div>
  </form>
}
