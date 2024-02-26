import { NavBar } from "./components/navbar";
import ContinueButton from "./continuebutton";

export default async function Home() {
  return(
    <main>
      <NavBar />
      <div className="text-center">
        <div className="text-xl">
          PinMyLocation is an app allowing you to share your location with others.
        </div>
        <ContinueButton />
      </div>
    </main>
  );
  
}
