import prisma from '@/lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';

export async function POST(req) {
  const session = await getSession();
  if (!session || !session.user) { return Response.redirect(new URL('/', req.url)); }

  const user = session.user;

  const formData = await req.formData();
  const mapName = formData.get('mapName');
  const description = formData.get('description');
  const isPublic = formData.get('isPublic') == "on";

  // TODO: Validate form data.

  const userObj = await prisma.user.findUnique({
    where: {
      email: user.email
    }
  });

  const mapObj = await prisma.map.create({
    data: {
      name: mapName,
      description: description,
      public: isPublic,
      userId: userObj.id
    }
  });

  return Response.json({ complete: true, mapId: mapObj.id });
}
