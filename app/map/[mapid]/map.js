"use client"
import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function Map({ pins }) {
  const mapRef = useRef(null);
  const [geocoder, setGeocoder] = useState(null);
  const [advancedMarker, setAdvancedMarker] = useState(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      libraries: ["marker"],
      version: "weekly",
    });

    loader.importLibrary("maps").then(async () => {
      // Initialize the geocoder after the API is loaded
      setGeocoder(new google.maps.Geocoder());
      const AdvancedMarkerElement = await google.maps.importLibrary("marker")
      setAdvancedMarker(AdvancedMarkerElement);
    });

  }, []);

  useEffect(() => {
    // Ensure geocoder and address are available
    if (!geocoder || !advancedMarker) return;

    let map;

    let coords = [];
    pins.forEach(pin => {
      coords.push({ lat: pin.lat, lng: pin.lng });
    });

    if(coords.length > 0) {
      map = new google.maps.Map(mapRef.current, {
        center: coords[0],
        zoom: 8,
        mapId: "e2b7c35e4de1b560",
      });
    } else {
      map = new google.maps.Map(mapRef.current, {
        center: {lat: 47.5, lng: -53},
        zoom: 8,
        mapId: "e2b7c35e4de1b560",
      });
    }
    const { AdvancedMarkerElement } = advancedMarker;
    
    console.log(coords[0]);

    coords.forEach(coord => {
      new AdvancedMarkerElement({
        map: map,
        position: coord,
      });
    });

    /*navigator.geolocation.getCurrentPosition(
      (pos) => {
        const crd = pos.coords;
        const marker = new AdvancedMarkerElement({
          map: map,
          position: {lat: crd.latitude, lng: crd.longitude},
        });
      }
    );*/


  }, [pins, geocoder, advancedMarker]);
  
  return <div className="" style={{ height: "400px" }} ref={mapRef} />;
}
