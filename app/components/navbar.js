import Link from "next/link";

export function NavBar({}) {
  return(
    <nav className="bg-[var(--navbar-background)] text-[#FFF67E] font-bold shadow-md">
      <Link href="/">
        <h1 className="text-[22pt] text-center p-2">
          PinMyLocation
        </h1>
      </Link>
    </nav>
  );
}
