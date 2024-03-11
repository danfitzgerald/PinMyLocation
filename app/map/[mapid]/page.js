import AddPinForm from "./addpinform.js";
import prisma from "@/lib/prisma.js";
import { getSession } from '@auth0/nextjs-auth0';
import LoggedInNavBar from "@/app/components/loggedinnavbar.js";
import { NavBar } from "@/app/components/navbar.js";
import MapPinsView from "./mappinsview.js";
import Description from "./description.js";
import DeleteMapForm from "./deletemapform.js";

export const revalidate = 10;

function MapNotFound() {
  return <div>
    <NavBar />
    <div className="text-center text-xl font-bold mt-10">No map at this location or the map at this location is not public.</div>
  </div>
}

export default async function Page({ params }) {

  const mapId = params.mapid;
  const map = await prisma.map.findUnique({
    where: {
      id: mapId,
      accessible: true,
    },
  });

  if(!map) {
    return <MapNotFound />;
  }

  const creator = await prisma.user.findUnique({
    where: {
      id: map.userId,
    },
    select: {
      email: true,
      name: true
    }
  });

  const session = await getSession();
  let user = session?.user;

  // Find if the authenticated user creted the map.
  // Considered creater of email matches authenticated users email.
  let isMapCreator = false;
  if (user) {
    isMapCreator = (creator.email == user.email)
  }

  if (!map.public && !isMapCreator) {
    return <MapNotFound />;
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
  
    <div className="mx-5 my-5">
      <Description 
        mapName={map.name} 
        mapDescription={map.description} 
        mapCreator={creator.name}
        mapCreation={map.createdAt}
        mapId={mapId}
        mapPublic={map.public}
        canEdit={isMapCreator} />
      <div className="lg:columns-2 lg:max-h-[400px] justify-center lg:gap-x-0 mt-5">
        <MapPinsView pins={pins} mapId={mapId} canModify={isMapCreator} />
      </div>

      {
        isMapCreator ? <div className="">
          <AddPinForm mapId={mapId}/>
          <DeleteMapForm mapId={mapId} />
        </div> : <></>
      }
      
    </div>
  </>);
    
  }
  