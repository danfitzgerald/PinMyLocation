import Link from "next/link"
import { createBigButtonClassName } from "./bigbutton"

export default function BigLink({
  width,
  children, 
  bgcolor="blue-500", 
  textcolor="white",
  px="8",
  py="4",
  href
}) {
  const className = createBigButtonClassName({ width, bgcolor, textcolor, px, py });

  return <Link 
      className={className}
      href={href}
    >
      {children}
    </Link>
}
