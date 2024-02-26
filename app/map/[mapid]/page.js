import Map from "./map.js"

export default function Page({ params, searchParams }) {
  
  return (<div>
    MapID: {params.mapid}
    <br />
    
    lat: {searchParams ? searchParams.lat : ""}<br />
    lon: {searchParams ? searchParams.lon : ""}
    
    <Map lat={Number(searchParams.lat)} lng={Number(searchParams.lon)} />
    
    </div>);
    
  }
  