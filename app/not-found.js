import Link from 'next/link'
import { NavBar } from './components/navbar'

export default function NotFound() {
  return (
    <div>
      <NavBar />
      <div className="flex flex-col h-[calc(100vh-60px)] items-center justify-center">
        <h2 className="text-xl font-bold">Not Found</h2>
        <p>Could not find requested resource</p>
        <Link className="text-blue-600 hover:underline" href="/">Return Home</Link>
      </div>
    </div>
  )
}