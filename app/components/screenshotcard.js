import Image from "next/image";

export default function ScreenshotCard({ index, imagePath, width, height, projectTitle, children = "" }) {
  return <div id={"screenshot-" + index} className={getBackgroundColor(index) + " px-6 py-24 lg:px-24 flex-row"}>
    <div className="flex flex-col lg:flex-row gap-x-6 gap-y-4 justify-center items-center">
      {
        (index % 2 != 0) ? <Image src={imagePath} alt="Screenshot" width={width} height={height} /> : <Image src={imagePath} alt="Screenshot" width={width} height={height} className="lg:hidden" />
      }

      <div className="lg:w-1/2 text-justify self-center">
        <div className="text-center text-black text-xl font-bold lg:text-start">
          {projectTitle}
        </div>
        <div className="text-gray-600">
          {children}
        </div>
      </div>

      {
        (index % 2 == 0) ? <Image src={imagePath} alt="Screenshot" width={width} height={height} className="hidden lg:block" /> : <></>
      }
    </div>
  </div>
}

function getBackgroundColor(index) {
  return (index % 2 == 0) ? ("bg-gray-300") : ("bg-white");
}
