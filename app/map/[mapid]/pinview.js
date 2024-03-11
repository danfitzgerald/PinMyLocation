"use client"

import Image from "next/image";

async function removePin(mapId, pinId) {
  if (!confirm("Are you sure you wish to remove this pin?")) {return false}
  try {
    const formData = new FormData();

    formData.append("mapId", mapId);
    formData.append("pinId", pinId);

    const response = await fetch("/api/remove-pin", {
      method: "POST",
      // Set the FormData instance as the request body
      body: formData,
    });
    const resJson = await response.json();

    if (resJson && resJson.success) {
      location.reload();
    } else {
      alert("Unable to remove pin.");
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

function PinButton({ pins, index, selected, onClick, canModify, mapId }) {
  const pin = pins[index];
  return <div className="relative w-full">
    <button
      id={`pinbtn-${index}`}
      type="button"
      className={"relative w-full flex flex-row items-center py-3 px-2 border-[1px] border-green-300" +
                (selected ? " bg-green-100" : " bg-green-200 hover:bg-green-300 duration-200")}
      onClick={onClick}
    >
      <div className="mx-2"><Image src="/pushpin.png" width={16} height={32} alt="Pin" /></div>
      <div className="">
        <div className="text-start font-bold">{pin.description}</div>
        <div className="text-start">{pin.createdAt.toUTCString()}</div>
      </div>
    </button>

    {/* The following delete button is visible only if the canModify prop is true. */}
    { canModify ? <div className="absolute h-full flex items-center top-0 end-0">
      <button className="mx-2 w-8 h-8 hover:bg-gray-300 rounded-full" onClick={() => removePin(mapId, pin.id)}>
        {/* https://iconmonstr.com/trash-can-lined-svg/ */}
        <svg clipRule="evenodd" fillRule="evenodd" fill="red" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero" /></svg>
      </button>
    </div> : <></>}
  </div>
}

export default function PinView({ mapId, pins, selectedPin, setSelectedPin, canModify=false }) {
  return <div className="h-[400px] overflow-y-auto bg-gray-200 border-[1px]">
    {
      pins.map((pin, index) => <PinButton
        key={index}
        pins={pins}
        index={index}
        selected = {index == selectedPin}
        canModify={canModify}
        onClick={() => setSelectedPin(index)}
        mapId={mapId}
        />
      )
    }
    {
      pins.length == 0 ?
        <div className="py-3 px-2 border-[1px] border-green-300 bg-green-200">
          <div className="font-bold">This map has no pins.</div>
          <div className="">When pins are added they will be displayed here.</div>
        </div>
        : <></>
    }
  </div>;
}