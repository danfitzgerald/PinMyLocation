
export default function BigButton({
  width = "auto",
  bgcolor = "rgb(59 130 246)",
  textcolor = "white",
  px = "2rem",
  py = "1rem",
  my = "1rem",
  type = "button",
  onClick = () => { },
  children,
}) {

  const className = createBigButtonStyle({width, bgcolor, textcolor, px, py, my});

  return <button 
      style={className}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>

}

export function createBigButtonClassName({
  width="auto",
  bgcolor="blue-500",
  textcolor="white",
  px="8",
  py="4",
}) {
  return "w-auto rounded-sm bg-blue-500 text-white px-8 py-4 my-4 text-center shadow-md"
}

/* Unfortunately tailwind cannot dynamically generate class files so we must
   generate style elements to dynamically style buttons */
export function createBigButtonStyle({
  width = "auto",
  children,
  bgcolor = "rgb(59 130 246)",
  textcolor = "white",
  px = "2rem",
  py = "1rem",
  my = "1rem",
  href
}) {
  return {
    width: width,
    backgroundColor: bgcolor,
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
