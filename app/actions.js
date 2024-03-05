"use server"

import prisma from "@/lib/prisma";
import { getSession } from "@auth0/nextjs-auth0";

// Update profile server action.
export default async function updateProfile(prevState, formData) {

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