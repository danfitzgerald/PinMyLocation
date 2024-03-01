"use client"

import { createBigButtonClassName } from "@/app/components/bigbutton";

// TODO: secure this route.

async function captureLocationAndSubmit(event) {
  event.preventDefault();
  try {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    document.pinform.lat.value = pos.coords.latitude;
    document.pinform.lng.value = pos.coords.longitude;
    document.pinform.accuracy.value = pos.coords.accuracy;

    const formData = new FormData(document.pinform);

    const response = await fetch("/api/add-pin", {
      method: "POST",
      // Set the FormData instance as the request body
      body: formData,
    });
    const resJson = await response.json();

    if (resJson && resJson.success) {
      location.reload();
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default function AddPinForm({ mapId }) {
  return <>
    <form 
      name="pinform" 
      method="POST" 
      action="/api/add-pin" 
      onSubmit={captureLocationAndSubmit}
      className="flex flex-col gap-y-2 bg-green-400 p-4 my-6"
      >
      <div className="text-xl font-bold">Create new Pin</div>
      <div>Description:</div>
      <input 
        type="text" 
        name="description"
        className="p-2"
        />
      <input type="number" name="lat" hidden/>
      <input type="number" name="lng" hidden readOnly/>

      <input type="number" name="accuracy" hidden/>
      <input type="text" name="mapId" value={mapId} hidden readOnly/>
      <input
        type="submit"
        value="Pin my location"
        className={createBigButtonClassName({})}
      />
    </form> 
  </>;
}