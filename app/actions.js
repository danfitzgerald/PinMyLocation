"use server"

import prisma from "@/lib/prisma";
import { getSession } from "@auth0/nextjs-auth0";

// Update profile server action.
export async function updateProfile(prevState, formData) {

  // TODO: May need to revalidate some routes after updating profile.
  // '/my-maps' route and maybe '/map/[mapid]' routes.

  const session = await getSession();
  let user = undefined;
  if (session) { user = session.user; }

  if (!user || !user.email) { 
    return { message: "User not logged in.", success: false } 
  }

  const rawFormData = {
    displayName: formData.get('displayName'),
  }

  // TODO: Validate form data here.

  const userObj = await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      name: rawFormData.displayName,
    }
  });

  if (userObj.name == rawFormData.displayName) {
    return { message: "Profile successfully updated!", success: true };
  } else {
    return { message: "Unable to update profile.", success: false };
  }
}

export async function updateMap(prevState, formData) {
  const session = await getSession();
  let user = undefined;
  if (session) { user = session.user; }

  if (!user || !user.email) {
    return { message: "User not logged in.", success: false }
  }

  const rawFormData = {
    mapId: formData.get('mapId'),
    mapName: formData.get('mapName'),
    mapDescription: formData.get('mapDescription'),
    mapPublic: formData.get('mapPublic'),
  };

  try {
    const userObj = await prisma.user.findUnique({
      where: {
        email: user.email,
      }
    });

    const map = await prisma.map.update({
      where: {
        id: rawFormData.mapId,
        userId: userObj.id
      },
      data: {
        name: rawFormData.mapName,
        description: rawFormData.mapDescription,
        public: rawFormData.mapPublic ? true : false,
      }
    });
    if (!map) { return { message: "Unable to find matching map.", success: false } }

    return { success: true };
  } catch (e) {
    return { message: "Unable to update map.", success: false }
  }

  
}
