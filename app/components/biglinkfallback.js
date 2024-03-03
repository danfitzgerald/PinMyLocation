import { createBigButtonStyle } from "./bigbutton"

/* 
  Fallback component that is used in place of component
  BigLink or BigButton
*/
export default function BigLinkFallback({
  width = "auto",
  textcolor = "white",
  px = "2rem",
  py = "1rem",
  my = "1rem",
  children,
  href
}) {
  const bigStlye = createBigButtonStyle({ width, textcolor, px, py, my });

  return <div
    className="bg-gray-400"
    style={bigStlye}
  >
    {children}
  </div>
}
