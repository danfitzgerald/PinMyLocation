"use client"

import Image from "next/image";

function PinButton({pins, index, selected, onClick}) {
  const pin = pins[index];
  if (!selected) {
    return <button
      id={`pinbtn-${index}`}
      type="button"
      className="w-full flex flex-row items-center py-3 px-2 border-[1px] border-green-300 bg-green-200 hover:bg-green-300 duration-200"
      onClick={onClick}
    >
      <div className="mx-2"><Image src="/pushpin.png" width={16} height={32} alt="Pin" /></div>
      <div key={pin.id} className="">
        <div className="text-start font-bold">{pin.description}</div>
        <div className="">{pin.createdAt.toUTCString()}</div>
      </div>
    </button>
  } else {
    return <button
      id={`pinbtn-${index}`}
      type="button"
      className="w-full flex flex-row items-center py-3 px-2 border-[1px] border-green-300 bg-green-100"
      onClick={onClick}
    >
      <div className="mx-2"><Image src="/pushpin.png" width={16} height={32} alt="Pin" /></div>
      <div key={pin.id} className="">
        <div className="text-start font-bold">{pin.description}</div>
        <div className="">{pin.createdAt.toUTCString()}</div>
      </div>
    </button>
  }
}

export default function PinView({ pins, selectedPin, setSelectedPin }) {
  return <div className="h-[400px] overflow-y-auto bg-gray-200 border-[1px]">
    {
      pins.map((pin, index) => <PinButton
        key={index}
        pins={pins}
        index={index}
        selected = {index == selectedPin}
        onClick={() => setSelectedPin(index)}
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