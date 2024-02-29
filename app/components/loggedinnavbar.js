import Link from "next/link"

const navItems = [
  { name: "My Maps", path: "/my-maps" },
]

export default function LoggedInNavBar() {
  return (<nav className="flex items-center justify-between bg-[var(--navbar-background)] text-[#FFF67E] font-bold shadow-md py-2 px-10">
    <div className="w-1/4">
      <Link href="/">
        <h1 className="text-[22pt] inline-block">
          PinMyLocation
        </h1>
      </Link>
    </div>
    <div className="flex flex-row justify-center align-middle gap-x-5">
      {navItems.map((navItem, index) => <div>
          <Link className="duration-300" href={navItem.path}>
            {navItem.name}
          </Link>
      </div>)}
    </div>

    <div className="text-right w-1/4">
      <div>
        <Link href="/api/auth/logout">Sign out</Link>
      </div>
    </div>
  </nav>)
}