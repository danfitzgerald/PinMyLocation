import prisma from '@/lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';

export async function POST(req) {
  try{
    const user = (await getSession())?.user;
    if (!user) { return Response.json({success: false}); }
    
    const { mapId } = await req.json();

    // TODO: Validate form data.

    const userObj = await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        maps: {
          deleteMany: [{id: mapId}]
        }
      },
      include: {
        maps: {
          where: {id: mapId}
        }
      }
    });

    if (userObj?.maps?.length == 0) {
      return Response.json({ success: true });
    }
  } catch (e) {
    console.error(e);
  }

  return Response.json({ success: false });
}
