import Link from "next/link"
import { createBigButtonClassName, createBigButtonStyle } from "./bigbutton"

export default function BigLink({
  width="auto",
  bgcolor="rgb(59 130 246)", 
  textcolor="white",
  px="2rem",
  py="1rem",
  my="1rem",
  prefetch=true,
  children, 
  href
}) {
  const className = createBigButtonStyle({ width, bgcolor, textcolor, px, py, my });

  return <Link 
      className="bg-blue-500 hover:bg-blue-600 duration-300"
      style={className}
      href={href}
      prefetch={prefetch}
    >
      {children}
    </Link>
}
