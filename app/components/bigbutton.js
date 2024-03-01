
export default function BigButton({
  width="auto",
  bgcolor="blue-500", 
  textcolor="white",
  px="8",
  py="4",
  type="submit",
  onClick = () => { },
  children,
}) {

  const className = createBigButtonClassName({width, bgcolor, textcolor, px, py});

  return <button 
      className={className}
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
  return `w-${width} rounded-sm bg-${bgcolor} text-${textcolor} px-${px} py-${py} my-4 text-center shadow-md`
}
