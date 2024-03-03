import Image from "next/image";
import Link from "next/link";

export function NavBar({}) {
  return(
    <nav className="bg-[var(--navbar-background)] text-[#FFF67E] text-center font-bold shadow-md">
      <Link href="/" className="flex flex-row justify-center items-center gap-x-2">
        <div>
          <Image
            className="inline-block"
            src="/pushpin.png"
            alt="PinMyLocation PushPin Logo"
            height={32}
            width={16}
          />
        </div>
        <h1 className="flex-shrink text-[22pt] p-2">
          PinMyLocation
        </h1>
      </Link>
    </nav>
  );
}
