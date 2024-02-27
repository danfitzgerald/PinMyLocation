import prisma from "@/lib/prisma"

export default async function MapsView({ currentPage, itemsPerPage, email }) {

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  const maps = await prisma.map.findMany({
    skip: itemsPerPage * (currentPage - 1),
    take: itemsPerPage,
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return <div>
    {
      maps.map((map) => <a key={map.id} href={"/map/" + map.id}>
        <div className="rounded-md bg-green-400 border-2 p-5">
          <div className="text-xl">{map.name}</div>
          <div className="">{map.description}</div>
          <div className="">{map.createdAt.toString()}</div>
          <div className="">{map.public ? "Visible to anyone with a link" : "Only visible by you"}</div>
        </div>
      </a>)
    }
  </div>
}
