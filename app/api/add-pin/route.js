import prisma from '@/lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';

export async function POST(req) {
  const failUrl     = new URL('/', req.url);

  const formData    = await req.formData();
  const description = formData.get('description');
  const lat         = formData.get('lat');
  const lng         = formData.get('lng');
  const accuracy    = formData.get('accuracy');
  const mapId       = formData.get('mapId');

  const session     = await getSession();

  if (!session || !session.user) { return Response.json({ success: false }); }

  const user = session.user;

  // TODO: Implement expiry.

  const mapObj = await prisma.map.findUnique({
    where: {
      id: mapId,
      accessible: true,
    }, 
    select: {
      userId: true,
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

  if(!mapObj || !userObj || userObj.id !== mapObj.userId ) { return Response.json({ success: false }); }

  await prisma.pin.create({
    data: {
      description,
      lat,
      lng,
      accuracy: Math.ceil(accuracy),
      mapId,
    }
  });

  return Response.json({ success: true });
}
