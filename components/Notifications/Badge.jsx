export default function Badge(){
    return (
        <div className=" absolute z-50 md:top-2 top-1 right-1 p-4 flex justify-center items-center flex-wrap">

            <span className="relative inline-block cursor-pointer  ml-8">
    <svg className="w-6 h-6 text-gray-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path
          d="M447.1 .0041h-384c-35.25 0-64 28.75-64 63.1v287.1c0 35.25 28.75 63.1 64 63.1h96v83.99c0 9.75 11.25 15.45 19.12 9.7l124.9-93.69h144c35.25 0 64-28.75 64-63.1V63.1C511.1 28.75 483.2 .0041 447.1 .0041zM320 112c17.75 0 31.1 14.25 31.1 32s-14.25 31.1-32 31.1S288 161.8 288 144S302.3 112 320 112zM192 112c17.75 0 31.1 14.25 31.1 32S209.8 175.1 192 175.1S160 161.8 160 144S174.3 112 192 112zM362.3 271.3c-26.5 31-65.14 48.74-106.3 48.74c-41.12 0-79.72-17.74-106.2-48.74c-8.5-10-7.5-25.12 2.625-33.75c9.998-8.5 25.25-7.375 33.87 2.75C203.5 260.4 228.9 272 256 272c27.12 0 52.49-11.62 69.74-31.75c8.623-10.12 23.75-11.38 33.74-2.75C369.6 246.1 370.8 261.3 362.3 271.3z"/>
    </svg>
    <span
        className="absolute top-0 right-0 inline-block w-2 h-2 transform translate-x-1/2 -translate-y-1/2 bg-green-400 rounded-full"></span>
  </span>
        </div>

    )
}
