"use client"

import { updateMap } from "@/app/actions";
import { AltBigButton, BIG_BUTTON_CLASS_NAME, createBigButtonStyle } from "@/app/components/bigbutton";
import { useState } from "react"
import { useFormState } from 'react-dom'

function EditButton({setEditMode}) {
  function onClick() {
    setEditMode(true);
  }

  return <button className="inline ml-4 rounded-full hover:bg-gray-400" onClick={onClick}>
    <svg fill="green" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" /></svg>
  </button>
}

function DescriptionForm({
  setEditMode,
  mapName,
  mapDescription,
  mapPublic,
  mapId
}) {
  const [state, formAction] = useFormState(updateMap, undefined);

  function cancelEdit() {
    setEditMode(false);
  }

  if (state?.success) {
    location.reload();
  }

  if (state?.message) {
    alert(state.message);
  }

  return <form
    className="flex flex-col"
    action={formAction}
  >
    <input 
      id="form-title"
      type="text" 
      name="mapName"
      className="font-bold text-xl p-2 mb-2" 
      defaultValue={mapName} 
      placeholder="Map title"
      />

    <input 
      id="form-description"
      type="text" 
      name="mapDescription"
      className="p-2" 
      defaultValue={mapDescription} 
      placeholder="Description"
      />

    <div>
      <input 
        id="form-ispublic" 
        type="checkbox" 
        name="mapPublic"
        defaultChecked={mapPublic}
        /> 
        {/* TODO: get default value for this one */}
      <label htmlFor="form-ispublic"> Make map visible to anyone with a link.</label>
    </div>
    <input
      type="textbox"
      name="mapId"
      value={mapId}
      className="hidden"
      />

    <div className="flex flex-row justify-between">
      <AltBigButton type="button" onClick={cancelEdit}>Cancel</AltBigButton>

      <input
        type="submit"
        value="Update"
        className={BIG_BUTTON_CLASS_NAME}
        style={createBigButtonStyle({})}
      />
    </div>
  </form>
}

export default function Description({ 
  mapName,
  mapDescription,
  mapCreator, 
  mapCreation, 
  mapPublic,
  mapId, 
  canEdit 
}) {

  const [ editMode, setEditMode ] = useState(false);

  if (editMode) {
    return <>
      <DescriptionForm
        setEditMode={setEditMode}
        mapName={mapName}
        mapDescription={mapDescription}
        mapPublic={mapPublic}
        mapId={mapId}
        />
      <div className="text-sm">Created: {mapCreation.toUTCString()}</div>
    </>
  }

  return <>
    <div className="">
      <div className="inline text-xl font-bold">{mapName}</div>
      { canEdit ? <EditButton setEditMode={setEditMode} /> : <></> }
    </div>
    <div className="">{mapDescription}</div>
    <div className="text-sm">Created by: {mapCreator}</div>
    <div className="text-sm">{mapCreation.toUTCString()}</div>
  </>
}