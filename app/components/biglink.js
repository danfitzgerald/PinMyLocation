import Link from "next/link"
import { BIG_BUTTON_CLASS_NAME, createBigButtonStyle } from "./bigbutton"

export default function BigLink({
  width="auto",
  textcolor="white",
  px="2rem",
  py="1rem",
  my="1rem",
  prefetch=true,
  children, 
  href
}) {
  const bigStlye = createBigButtonStyle({ width, textcolor, px, py, my });

  return <Link 
      className={BIG_BUTTON_CLASS_NAME}
    style={bigStlye}
      href={href}
      prefetch={prefetch}
    >
      {children}
    </Link>
}
