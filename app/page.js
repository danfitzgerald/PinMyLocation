import { NavBar } from "./components/navbar";
import ContinueButton from "./continuebutton";

export default async function Home() {
  return(
    <main className="h-[100vh]">
      <NavBar />
      <div className="flex flex-col text-center items-center justify-center h-[calc(100%-60px)]">
        <div className="text-xl">
          PinMyLocation is an app allowing you to share your location with others.
        </div>
        <ContinueButton />
      </div>
    </main>
  );
  
}
