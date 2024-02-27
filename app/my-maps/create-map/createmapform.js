"use client"

export default function CreateMapForm() {
  // oncept of PinMap (PK:id, time_created, name <string>, description <string>?
  // , FK:owner_session_id, publically_accessible <bool>, accessible <bool>, expiry <date>?)
  return <form action="/api/create-map" method="POST" className="flex flex-col gap-y-2 text-start">
    <div>
    Map Name: <br/>
    <input name="mapName" type="text"/>
    </div>
    <div>
    Description: <br/>
    <input name="description" type="text"/>
    </div>
    <div>
    <input name="isPublic" type="checkbox" />Make map visible to anyone with a link.
    </div>
    
    
    <div className='flex flex-row justify-between'>
      <button type="button" className="rounded-full bg-yellow-400 text-white px-4 py-1 text-center shadow-md" onClick={() => { history.back() }}>
        Go Back
      </button>
      <input type="submit" className="rounded-full bg-blue-400 text-white px-4 py-1 text-center shadow-md" value="Create New Map" />
    </div>
  </form>
}