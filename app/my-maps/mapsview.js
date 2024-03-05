import prisma from "@/lib/prisma"
import Link from "next/link";
import { redirect } from "next/navigation";

function MapButton({ map }) {
  return <a href={"/map/" + map.id}>
    <div className="relative py-3 px-2 border-[1px] border-gray-300 hover:bg-gray-300 duration-300 bg-gray-200 h-[100px]">
      <div className="text-xl">{map.name == "" ? "(Untitled Map)" : map.name}</div>
      <div className="">{map.createdAt.toUTCString()}</div>
      <div className="">{map.public ? "Visible to anyone with a link" : "Only visible by you"}</div>
      <div className="mx-5 text-xl text-bold h-full top-0 flex items-center absolute right-0"><div>&gt;</div></div>
    </div>
  </a>
}

function MapButtonFalse() {
  return <div className="py-3 px-2 border-[1px] border-gray-200 bg-gray-300 h-[100px]">
    </div>
}

export default async function MapsView({ currentPage, itemsPerPage, email }) {

  function pageValueOutOfBounds() {
    redirect("/");
  }

  if (isNaN(currentPage) || currentPage <= 0) { pageValueOutOfBounds() }

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  const [maps, count] = await prisma.$transaction([
    prisma.map.findMany({
      skip: itemsPerPage * (currentPage - 1),
      take: itemsPerPage,
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.map.count({ where: {userId: user.id} })
  ]);

  const pageCount = Math.ceil(count / itemsPerPage);
  if (currentPage > pageCount && currentPage > 1) {
    pageValueOutOfBounds();
  }
  
  // Find numbers to display as buttons on page and store them in pageNumbers array.
  let pageNumbers = [];
  const pageNumbersDisplayed = 5;
  let offsetPageNumber = 0;
  
  // if the current page number is less than half of the number of page numbers
  // displayed.
  if (currentPage < Math.floor(pageNumbersDisplayed / 2)) {
    offsetPageNumber = 1;
  
  // If the current page number is more than the page count minus half the number of 
  // page numbers displayed
  } else if(currentPage > pageCount - Math.floor(pageNumbersDisplayed / 2)) {
    offsetPageNumber = Math.max(1, pageCount - pageNumbersDisplayed+1)
  } else {
    offsetPageNumber = Math.max(1, currentPage - Math.floor(pageNumbersDisplayed / 2));
  }
  for(let i = 0; i < pageNumbersDisplayed; i++) {
    const pageNumber = i + offsetPageNumber + 0
    if (pageNumber > pageCount) { break; }
    pageNumbers.push(pageNumber);
  }

  return <div>
    {
      /* Display list of Maps. */
      maps.map((map) => <MapButton key={"mapid-" + map.id} map={map} />)
    }
    {
      /* Fill space where maps would be. */
      [...Array(itemsPerPage - maps.length)].map((e, i) => <MapButtonFalse key={"false-map-" + i} />)
    }
      <div className="flex flex-row gap-x-4 justify-between my-4">
        { /* Display back arrow pagination navigation */ }
        {
          currentPage > 1 ? 
            <Link href={`?page=${Number(currentPage) - 1}`} scroll={false}>
              <div className="flex h-10 w-10 justify-center items-center bg-gray-200 hover:bg-gray-300 duration-300 border-gray-500 rounded-md border-[1px]">
                <div>&lt;</div>
              </div>
            </Link>
          : <div className="flex h-10 w-10 justify-center items-center bg-gray-200 border-gray-500 rounded-md border-[1px]"></div>
        }

        { /* Display number pagination navigation */ }
        <div className="flex flex-row gap-x-2">
          {
            pageNumbers.map((e, i) => 
              <Link key={"page-nav-" + e} href={"?page=" + e} scroll={false}>
                <div className="flex h-10 w-10 justify-center items-center bg-gray-200 hover:bg-gray-300 duration-300 border-gray-500 rounded-md border-[1px]">
                  <div>{e}</div>
                </div>
              </Link> 
            )
          }
        </div>
        { /* Display forward arrow pagination navigation */}
        {
          currentPage < pageCount ? 
          <Link href={`?page=${1 + Number(currentPage)}`} scroll={false}>
            <div className="flex h-10 w-10 justify-center items-center bg-gray-200 hover:bg-gray-300 duration-300 border-gray-500 rounded-md border-[1px]">
              <div>&gt;</div>
            </div>
          </Link>
          : <div className="flex h-10 w-10 justify-center items-center bg-gray-200 border-gray-500 rounded-md border-[1px]"></div>
        }
      </div>
  </div>
}
