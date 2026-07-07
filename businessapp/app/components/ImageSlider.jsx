"use client";
import { useEffect, useState } from "react";

const images = [
  "/banner/img1.png",
  "/banner/img2.png",
  "/banner/img3.png",
  "/banner/img4.png",
];

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);

 useEffect(() => {
   let isScrolling = false;

   const onScroll = () => {
     isScrolling = true;
     clearTimeout(window.scrollTimer);

     window.scrollTimer = setTimeout(() => {
       isScrolling = false;
     }, 200);
   };

   window.addEventListener("scroll", onScroll);

   const interval = setInterval(() => {
     if (!isScrolling) {
       setCurrent((prev) => (prev + 1) % images.length);
     }
   }, 3000);

   return () => {
     clearInterval(interval);
     window.removeEventListener("scroll", onScroll);
   };
 }, []);


  return (
    <div className="relative h-[320px] w-full overflow-hidden rounded-xl will-change">
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img} 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
/>

        ))}
      </div>
    </div>
  );
}
