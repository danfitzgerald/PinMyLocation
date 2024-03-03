import Link from "next/link"
import SignOutButton from "./signoutbutton"
import Image from "next/image"

const navItems = [
  { name: "My Maps", path: "/my-maps" },
  { name: "My Profile", path: "/my-profile" },
]

export default function LoggedInNavBar() {
  return (<nav className="flex items-center justify-between bg-[var(--navbar-background)] text-[#FFF67E] font-bold shadow-md py-2 px-10">
    <div className="w-1/4">
      <Link href="/" className="flex flex-row items-center gap-x-2">
        <div>
          <Image
            src="/pushpin.png"
            height={32}
            width={16}
            />
        </div>
        <h1 className="text-[22pt] inline-block">
          PinMyLocation
        </h1>
      </Link>
    </div>
    <div className="flex flex-row justify-center align-middle gap-x-5">
      {navItems.map((navItem, index) => <div key={index}>
          <Link className="hover:underline hover:text-green-200 duration-300" href={navItem.path}>
            {navItem.name}
          </Link>
      </div>)}
    </div>

    <div className="text-right w-1/4">
      <div>
        <SignOutButton />
      </div>
    </div>
  </nav>)
}
