"use client"

import Map from "./map"
import PinView from "./pinview"
import { useState } from "react";

export default function MapPinsView({pins}) {
  const [selectedPin, setSelectedPin] = useState(0);
  return <><Map pins={pins} selectedPin={selectedPin} setSelectedPin={setSelectedPin} />
    <PinView pins={pins} selectedPin={selectedPin} setSelectedPin={setSelectedPin} /></>
}