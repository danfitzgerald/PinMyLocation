import { NavBar } from "./components/navbar";
import "./layout.css";
import ContinueButton from "./continuebutton";

export default async function Home() {
  return(
    <main className="h-[100vh]">
      <NavBar />
      <div className="backdrop-blur-md h-[calc(100%-60px)] ">
        <div className="flex flex-col text-center h-full items-center justify-center mx-5 overflow-hidden">
          <div className="text-xl">
            PinMyLocation is an app allowing you to share your location with others.
          </div>
          <ContinueButton />
        </div>
      </div>
    </main>
  );
  
}
