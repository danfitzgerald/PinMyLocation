
export const BIG_BUTTON_CLASS_NAME = "bg-blue-500 hover:bg-blue-600 duration-300 cursor-pointer";
export const ALT_BIG_BUTTON_CLASS_NAME = "bg-yellow-500 hover:bg-yellow-600 duration-300 cursor-pointer";

export default function BigButton({
  width = "auto",
  textcolor = "white",
  px = "2rem",
  py = "1rem",
  my = "1rem",
  className = BIG_BUTTON_CLASS_NAME,
  type = "button",
  onClick = () => { },
  children,
}) {

  const bigStyle = createBigButtonStyle({width, textcolor, px, py, my});

  return <button 
      className={className}
      style={bigStyle}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>

}

export function AltBigButton({
  width = "auto",
  textcolor = "white",
  px = "2rem",
  py = "1rem",
  my = "1rem",
  type = "button",
  onClick = () => { },
  children,
}) {
  return <BigButton
      className={ALT_BIG_BUTTON_CLASS_NAME}
      width={width}
      textcolor={textcolor}
      px={px}
      py={py}
      my={my}
      type={type}
      onClick={onClick}
    >
      {children}
    </BigButton>
}

/* Unfortunately tailwind cannot dynamically generate class files so we must
   generate style elements to dynamically style buttons */
export function createBigButtonStyle({
  width = "auto",
  textcolor = "white",
  px = "2rem",
  py = "1rem",
  my = "1rem",
}) {
  return {
    width: width,
    color: textcolor,
    paddingLeft: px,
    paddingRight: px,
    paddingTop: py,
    paddingBottom: py,
    marginTop: my,
    marginBottom: my,
    textAlign: "center",
    borderRadius: "0.125rem",
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
  }
}
