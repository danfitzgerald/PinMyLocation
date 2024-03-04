"use client"

import { useRouter } from "next/navigation";
import { AltBigButton, BIG_BUTTON_CLASS_NAME, createBigButtonStyle } from "@/app/components/bigbutton";

const CREATE_MAP_API = "/api/create-map";

async function createNewMapSubmit(event, router) {
  event.preventDefault();

  const formData = new FormData(document.createmapform);
  let resJson;
  for (let i = 0; i < 50; i++) {
    const response = await fetch(CREATE_MAP_API, {
      method: "POST",
      body: formData,
      cache: "no-cache",
    });
    resJson = await response.json();
    console.log("complete: " + resJson.complete);
  }

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
      <label htmlFor="mapname_id">Map Name:</label>
      <input id="mapname_id" name="mapName" type="text" className="p-2 w-full" placeholder="Map Name" />
      </div>
    <div>
      <label htmlFor="description_id">Description:</label>
      <input id="description_id" name="description" type="text" className="p-2 w-full" placeholder="Description" />
    </div>
    <div>
      <input id="ispublic_id" name="isPublic" type="checkbox" />
      <label htmlFor="ispublic_id"> Make map visible to anyone with a link.</label>
    </div>
    
    <div className='flex flex-row justify-between mt-6'>
      <AltBigButton type="button" onClick={ () => history.back() }>
        Go Back
      </AltBigButton>
      <input type="submit" style={createBigButtonStyle({})} className={BIG_BUTTON_CLASS_NAME} value="Create New Map" />
    </div>
  </form>
}
