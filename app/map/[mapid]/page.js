import AddPinForm from "./addpinform.js";
import Map from "./map.js"
import PinView from "./pinview.js"
import prisma from "@/lib/prisma.js";
import { getSession } from '@auth0/nextjs-auth0';
import LoggedInNavBar from "@/app/components/loggedinnavbar.js";
import { NavBar } from "@/app/components/navbar.js";
import MapPinsView from "./mappinsview.js";

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

  if (!map.public && !isMapCreater) {
    return <div className="text-center">No map found!</div>;
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
  
  return (<>
    { user ? <LoggedInNavBar /> : <NavBar/> }
  
    <div className="mx-10 my-10">
      <div className="text-xl font-bold">{map.name}</div>
      <div className="">{map.description}</div>
      <br />
      <div className="lg:columns-2 lg:max-h-[400px] justify-center lg:gap-x-0">
        {/*<Map pins={pins} />
        <PinView pins={pins} />*/}
        <MapPinsView pins={pins} />
      </div>

      {
        isMapCreater ? <div className="">
          <AddPinForm mapId={mapId}/>
        </div> : <></>
      }
      
    </div>
  </>);
    
  }
  