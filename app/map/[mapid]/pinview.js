
export default function PinView({ pins }) {
  return <div>
    {
      pins.map((pin) => <div key={pin.id} className="py-3 px-2 border-2 rounded-md">
        <div className="fond-bold">{pin.description}</div>
        <div className="">{pin.createdAt.toString()}</div>
      </div>)
    }
  </div>;
}