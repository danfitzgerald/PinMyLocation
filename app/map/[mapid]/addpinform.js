"use client"

import { BIG_BUTTON_CLASS_NAME, createBigButtonStyle } from "@/app/components/bigbutton";

async function captureLocationAndSubmit(event) {
  event.preventDefault();
  try {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }).catch((reason) => {
      document.getElementById("message").innerHTML = `Unable to get location: ${reason.message}.`
      console.error(reason);
    });

    console.log(pos);

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
      <label htmlFor="description-id">Name:</label>
      <input 
        id="description-id"
        type="text" 
        name="description"
        className="p-2"
        placeholder="Name"
        />
      <input type="number" name="lat" hidden/>
      <input type="number" name="lng" hidden readOnly/>

      <input type="number" name="accuracy" hidden/>
      <input type="text" name="mapId" value={mapId} hidden readOnly/>
      This will create a new pin at your current location. If your device asks permission to
      share your location you must allow it to pin your location to the map.
      <input
        type="submit"
        value="Pin my location"
        className={BIG_BUTTON_CLASS_NAME}
        style={createBigButtonStyle({})}
      />
      <p id="message"></p>
    </form> 
  </>;
}