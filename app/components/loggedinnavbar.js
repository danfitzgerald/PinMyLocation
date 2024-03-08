"use client"

import Link from "next/link"
import SignOutButton from "./signoutbutton"
import Image from "next/image"
import { useState } from "react"

const navItems = [
  { name: "My Maps", path: "/my-maps" },
  { name: "My Profile", path: "/my-profile" },
]

export default function LoggedInNavBar() {
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  function toggleNavDrawer() {
    setNavDrawerOpen(!navDrawerOpen);
  }

  return (<nav className="bg-[var(--navbar-background)] text-[#FFF67E] font-bold shadow-md py-2 px-5 md:px-10">
    <div className="flex items-center justify-between">
      <div className="w-1/4">
        <Link href="/" className="flex flex-row items-center gap-x-2">
          <div className="shrink-0">
            <Image
              src="/pushpin.png"
              alt="PinMyLocation PushPin Logo"
              height={32}
              width={16}
              />
          </div>
          <h1 className="text-[22pt] inline-block">
            PinMyLocation
          </h1>
        </Link>
      </div>
      <div className="hidden lg:flex flex-row justify-center align-middle gap-x-5">
        {navItems.map((navItem, index) => <div key={index}>
            <Link className="hover:underline hover:text-green-200 duration-300" href={navItem.path}>
              {navItem.name}
            </Link>
        </div>)}
      </div>

      <div className="text-right w-1/4">
        <div className="hidden lg:inline-block">
          <SignOutButton />
        </div>

        {/* Mobile nav hamburger menu. */}
        <div className="flex justify-end lg:hidden">
          <button onClick={toggleNavDrawer} type="button" className="-m-2.5 rounded-md p-2.5 ">
            <span className="sr-only">Open navigation menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        
      </div>
    </div>
    {/* Mobile nav drawer. */}
    <div className={(navDrawerOpen ? "transition-height duration-500 ease-in-out h-[180px] overflow-hidden lg:hidden" : "transition-height duration-500 ease-in-out h-0 overflow-hidden")}>
      <NavDrawer navItems={navItems} />
    </div>
  </nav>)
}

function NavDrawer({ navItems }) {
  return <nav className="w-full">
    <ul className="flex flex-col items-center space-between gap-y-5 my-7">
      {
        navItems.map((e, i) => <li key={e.path}>
          <Link href={e.path} className="hover:underline hover:text-green-200 duration-300">{e.name}</Link>
        </li>)
      }
      <SignOutButton />
    </ul>
  </nav>
}
