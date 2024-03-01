import Link from "next/link"
import { createBigButtonClassName, createBigButtonStyle } from "./bigbutton"

export default function BigLink({
  width="auto",
  bgcolor="rgb(59 130 246)", 
  textcolor="white",
  px="2rem",
  py="1rem",
  my="1rem",
  children, 
  href
}) {
  const className = createBigButtonStyle({ width, bgcolor, textcolor, px, py, my });

  return <Link 
      style={className}
      href={href}
    >
      {children}
    </Link>
}
