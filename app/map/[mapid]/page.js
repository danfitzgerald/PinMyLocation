import AddPinForm from "./addpinform.js";
import Map from "./map.js"
import PinView from "./pinview.js"
import prisma from "@/lib/prisma.js";
import { getSession } from '@auth0/nextjs-auth0';

export default async function Page({ params }) {

  // TODO: Verify exists and authenticated user has access.

  const mapId = params.mapid;
  const map = await prisma.map.findUnique({
    where: {
      id: mapId,
      accessible: true,
    },
  });

  if(!map) {
    return <div className="text-center">No map found!</div>;
  }

  let isMapCreater = false;

  const session = await getSession();
  let user = undefined;
  if (session && session.user) {
    user = session.user; 
    const userObj = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
      select: {
        id: true,
      }
    });
    isMapCreater = (userObj.id == map.userId)
  }

  

  const pinObjs = await prisma.pin.findMany({
    where: {
      mapId,
      visible: true,
    },
    select: {
      id: true,
      createdAt: true,
      description: true,
      lat: true,
      lng: true,
      accuracy: true,
    }, 
    orderBy: {
      createdAt: 'desc',
    },
  });

  let pins = [];

  for(let i = 0; i < pinObjs.length; i++) {
    let obj = pinObjs[i]
    pins.push({
      id: obj.id,
      createdAt: obj.createdAt,
      description: obj.description,
      lat: Number(obj.lat),
      lng: Number(obj.lng),
      accuracy: Number(obj.accuracy),
    });
  }
  
  return (<div className="mx-10 my-10">
    <div className="text-xl font-bold">{map.name}</div>
    <div className="">{map.description}</div>
    <br />
    <div className="flex flex-col lg:flex-row justify-center gap-x-5">
      <Map pins={pins} />
      <PinView pins={pins} />
    </div>

    {
      isMapCreater ? <div>
        <AddPinForm mapId={mapId}/>
      </div> : <></>
    }
    
    </div>);
    
  }
  