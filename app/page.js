import { NavBar } from "./components/navbar";
import "./layout.css";
import ContinueButton from "./continuebutton";
import ScreenshotCard from "./components/screenshotcard";
import Footer from "./components/footer";
import BigLink from "./components/biglink";
import Image from "next/image";

export default async function Home() {
  let index = 0;

  return(
    <main className="">
      <NavBar />
      <div className="home-background  h-[calc(100vh-60px)]">
        <div className="backdrop-blur-sm h-full w-full flex flex-col text-center items-center justify-between overflow-hidden">
          <div></div>
          <Image src="/angled-pushpin.png" width={150} height={0} alt="PinMyLocation push pin logo" />
          <div></div>
          <div className="flex flex-col text-center items-center justify-center p-7 bg-green-500 w-full">
            <div className="text-xl text-white">
              PinMyLocation is a website allowing you to share your location with others.
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
      </div>

      <ScreenshotCard index={++index} projectTitle='Maps' width={492/2} height={1054/2} imagePath='/_images/screenshots/1.png'>
        Maps are allow you to share your journey with others. Whether it be while you are out on a hike,
        driving cross-country, or you wish to keep your clients up to date with your location. Whatever
        it may be PinMyLocation allows you to keep everyone in the loop. Do not wish to share your
        location to anyone with a link? No problem, you can optionally make your map visible to only you.
        You can always change your visibility settings later.<br/><br/>
        
        Device Mockup created from <a className="hover:underline text-blue-500" href="https://deviceframes.com/templates/google-pixel-6">Google Pixel 6 mockups</a>
      </ScreenshotCard>

      <ScreenshotCard index={++index} projectTitle='Pins' width={492/2} height={1054/2} imagePath='/_images/screenshots/2.png'>
        Any time you wish to add your current location to a map simply create a pin. It&apos;s simple, open the
        map you wish to pin, scroll to the bottom of the page where you will find the &quot;Create a new pin&quot; form,
        give your new pin a name, and press the blue &quot;Pin my location&quot; button. If your device prompts you to
        share your location with PinMyLocation, you must allow it to create a pin at your current location.
        It is recommended to add a pin from a mobile device, in most cases a mobile device will give a more
        accurate geolocation than a desktop or laptop.
        <br/><br/>
        Device Mockup created from <a className="hover:underline text-blue-500" href="https://deviceframes.com/templates/google-pixel-6">Google Pixel 6 mockups</a>
      </ScreenshotCard>

      <ScreenshotCard index={++index} projectTitle='Display Name' width={492 / 2} height={1054 / 2} imagePath='/_images/screenshots/3.png'>
        By default PinMyLocation will use the name associated with the account provider you signed
        in with (Google,...), if you signed up using the email and password registration option by
        default PinMyLocation will use your email address as your display name. You can change your
        display name at anytime from the &quot;My Profile&quot; menu.
        <br /><br />
        Device Mockup created from <a className="hover:underline text-blue-500" href="https://deviceframes.com/templates/google-pixel-6">Google Pixel 6 mockups</a>
      </ScreenshotCard>

      <div className="py-20 text-center bg-gray-300">
        <BigLink href="/map/7d0e487f-7ec3-4263-8e72-c3063bbddead">Click here to view the sample map!</BigLink>
      </div>

      <Footer />

    </main>
  );
  
}
