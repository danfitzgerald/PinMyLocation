"use client"
import BigButton, { BIG_BUTTON_CLASS_NAME } from "@/app/components/bigbutton"
import { useRouter } from "next/navigation";

const DELETE_MAP_API_PATH = "/api/delete-map"

async function deleteMapClicked(mapId, router) {
  const confirmResult = confirm(
      "Are you sure you want to delete this map?\nPress Cancel if do not wish to proceed."
    );
  if (confirmResult) {
    const res = await fetch(DELETE_MAP_API_PATH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ mapId }),
      cache: "no-cache",
    });

    const resJson = await res.json();

    if (resJson?.success) {
      alert("Map deleted, you will now be redirected to your maps.")
      router.replace("/my-maps");
    } else {
      console.log(resJson);
      alert("Unable to delete map.");
    }
  }
}

export default function DeleteMapForm({mapId}) {
  const router = useRouter();
  return <div className="flex flex-col mt-20">
      <BigButton className={`${BIG_BUTTON_CLASS_NAME} bg-red-600 hover:bg-red-800`} onClick={() => deleteMapClicked(mapId, router)}>Delete Map</BigButton>
    </div>
}