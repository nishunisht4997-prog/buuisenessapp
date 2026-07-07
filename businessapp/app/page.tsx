import Navbar from "./components/Navbar"
import SearchSection from "./components/SearchSection";
import ImageSlider from "./components/ImageSlider"
import RightCards from "./components/RightCards";
// import Header from "./components/Header"

import Categories from "./components/Categories";
import FeaturedServices from "./components/FeaturedServices"
import RightButtons from "./components/RightButtons";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <SearchSection />
      <div className="max-w-7xl mx-auto mt-6 px-6">
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT: IMAGE SLIDER */}
          <div className="col-span-8">
            <ImageSlider />
          </div>

          {/* RIGHT: CARDS */}
          <div className="col-span-4">
            <RightCards />
          </div>
        </div>
      </div>

      {/* <Header /> */}

      <Categories />
      <FeaturedServices />
      <RightButtons />
      <Footer />
    </>
  );
}