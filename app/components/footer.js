import Link from "next/link";

export default function Footer({}) {
  return <div className="bg-black text-center text-white p-10">
    This project was created by Daniel Fitzgerald @ <Link className="text-blue-500 hover:underline" href="https://www.dfitzgerald.net">dfitzgerald.net</Link>.
  </div>
}