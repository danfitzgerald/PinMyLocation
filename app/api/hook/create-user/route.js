import prisma from "@/lib/prisma"

export async function POST(req) {
  const { email, name, picture, secret } = await req.json();

  if (secret !== process.env.AUTH0_HOOK_SECRET) {
    
    return Response.json({
        success: false,
        message: `You must provide the secret 🤫` 
      }, {
        status: 403
      });
  }

  if (email) {
    if (!await prisma.user.findUnique({
      where: {
        email
      }
    }) ) {
      await prisma.user.create({
        data: {
          email,
          name,
          image: picture
        }
      });
    }
    
    return Response.json({ success: true })
  }

  return Response.json({ success: false });
}