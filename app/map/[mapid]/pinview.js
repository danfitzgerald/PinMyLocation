
export default function PinView({ pins }) {
  return <div className="max-h-[400px] overflow-y-auto">
    {
      pins.map((pin) => <div key={pin.id} className="py-3 px-2 border-[1px] border-green-300 bg-green-200">
        <div className="font-bold">{pin.description}</div>
        <div className="">{pin.createdAt.toUTCString()}</div>
      </div>)
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