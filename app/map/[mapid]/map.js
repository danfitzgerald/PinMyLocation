"use client"
import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function Map({ coords }) {
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

    
    geocoder.geocode({ location: {lat: coord[0].lat, lng: coord[0].lng} }, (results, status) => {
      const { AdvancedMarkerElement } = advancedMarker;
      if (status === "OK") {
        const map = new google.maps.Map(mapRef.current, {
          center: results[0].geometry.location,
          zoom: 8,
          mapId: "e2b7c35e4de1b560",
        });

        const marker = new AdvancedMarkerElement({
          map: map,
          position: results[0].geometry.location,
        });

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const crd = pos.coords;
            const marker = new AdvancedMarkerElement({
              map: map,
              position: {lat: crd.latitude, lng: crd.longitude},
            });
          }
        );

      } else {
        console.error(`Geocode was not successful for the following reason: ${status}`);
      }
    });

  }, [coords, geocoder, advancedMarker]);
  
  return <div style={{ height: "400px" }} ref={mapRef} />;
}
