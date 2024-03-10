import prisma from '@/lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const pinId = formData.get('pinId');
    const mapId = formData.get('mapId');

    // TODO: Validate form data.

    const session = await getSession();

    if (!session || !session.user) { return Response.json({ success: false }); }

    const user = session.user;

    const mapObj = await prisma.map.findUnique({
      where: {
        id: mapId,
        accessible: true,
      }
    });

    const userObj = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
      select: {
        id: true,
      }
    });
    
    const pinObj = await prisma.pin.findUnique({
      where: {
        id: pinId,
        visible: true,
      },
    });

    /* Check that map user and pin objects exist, check that pinObject map id matches supplied
      map id and map owner matches signed in user. If any of these check fail respond withe {success: false} */
    if (!mapObj || !userObj || !pinObj || 
      !pinObj?.mapId || !mapObj?.id || !userObj?.id || 
      pinObj.mapId !== mapObj.id || userObj.id !== mapObj.userId) { 
      
      return Response.json({ success: false }); 
    }

    await prisma.pin.delete({
      where: {
        id: pinId,
      }
    });

    return Response.json({ success: true }); 
  } catch (e) {
    console.error(e.message);
    return Response.json({ success: false });
  }
}
