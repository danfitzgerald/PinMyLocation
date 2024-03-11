import { NavBar } from "./components/navbar";
import "./layout.css";
import ContinueButton from "./continuebutton";

export default async function Home() {
  return(
    <main className="home-background">
      <NavBar />
      <div className="backdrop-blur-sm h-[calc(100vh-60px)] flex flex-col text-center items-center justify-end overflow-hidden">
        <div className="flex flex-col text-center items-center justify-center p-7 bg-green-500 w-full">
          <div className="text-xl text-white">
            PinMyLocation is an app allowing you to share your location with others.
          </div>
          <ContinueButton />
          <div className="text-xl text-white pt-5">
            Scroll to learn more!
          </div>
          <svg className="mx-auto" height="40px" width="40px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 185.344 185.344">
            <path fill="white" d="M92.672,144.373c-2.752,0-5.493-1.044-7.593-3.138L3.145,59.301c-4.194-4.199-4.194-10.992,0-15.18
              c4.194-4.199,10.987-4.199,15.18,0l74.347,74.341l74.347-74.341c4.194-4.199,10.987-4.199,15.18,0
              c4.194,4.194,4.194,10.981,0,15.18l-81.939,81.934C98.166,143.329,95.419,144.373,92.672,144.373z"/>
          </svg>
        </div>
      </div>

      <div>

      </div>
    </main>
  );
  
}
