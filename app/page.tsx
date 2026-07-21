import Navbar from "./components/Navbar";
import SearchSection from "./components/SearchSection";
import ImageSlider from "./components/ImageSlider";
import RightCards from "./components/RightCards";
import Categories from "./components/Categories";
import FeaturedServices from "./components/FeaturedServices";
import RightButtons from "./components/RightButtons";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <SearchSection />

        {/* Hero Banners Grid */}
        <div className="max-w-7xl mx-auto mt-6 sm:mt-8 px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT: IMAGE SLIDER */}
            <div className="lg:col-span-8">
              <ImageSlider />
            </div>

            {/* RIGHT: CARDS */}
            <div className="lg:col-span-4">
              <RightCards />
            </div>
          </div>
        </div>

        <Categories />
        <FeaturedServices />
      </main>

      <RightButtons />
      <Footer />
    </div>
  );
}