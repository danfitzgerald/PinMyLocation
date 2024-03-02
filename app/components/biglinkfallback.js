import { createBigButtonClassName, createBigButtonStyle } from "./bigbutton"

/* 
  Fallback component that is used in place of component
  BigLink or BigButton
*/
export default function BigLinkFallback({
  width = "auto",
  bgcolor = "rgb(156 163 175)",
  textcolor = "white",
  px = "2rem",
  py = "1rem",
  my = "1rem",
  children,
  href
}) {
  const className = createBigButtonStyle({ width, bgcolor, textcolor, px, py, my });

  return <div
    style={className}
  >
    {children}
  </div>
}
