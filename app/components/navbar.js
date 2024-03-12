import Image from "next/image";
import Link from "next/link";
import SignUpButton from "./signupbutton";

export function NavBar({}) {
  return(
    <nav className="bg-[var(--navbar-background)] text-[#FFF67E] font-bold shadow-md py-2 px-5 md:px-10">
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
          
        </div>

        <div className="text-right w-1/4">
          <div className="lg:inline-block">
            <SignUpButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
