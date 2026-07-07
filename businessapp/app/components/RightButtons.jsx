
    "use client"

export default function RightButtons() {
  return (
    <div className="fixed left-[93vw] top-1/2 -translate-y-1/2 z-50 flex flex-col gap-16 ">
      <a
        className="
        
          bg-amber-500 text-white
          rotate-270
          px-3 py-3
          text-sm font-semibold
          rounded-tl-lg
          rounded-tr-lg
          shadow-lg
          hover:opacity-90
          transition
        "
      >
        Advertise
      </a>
      <a
        className="
       
          bg-purple-800 text-white
          rotate-270
          px-3 py-3
          text-sm font-semibold
          rounded-tl-lg
          rounded-tr-lg
          shadow-lg
          hover:opacity-90
          transition
          w-25
        "
      >
        Free Listing
      </a>

    </div>
  );
}
  
