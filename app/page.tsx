import Navbar from "./components/Navbar";
import SearchSection from "./components/SearchSection";
import ImageSlider from "./components/ImageSlider";
import RightCards from "./components/RightCards";
import Categories from "./components/Categories";
import FeaturedServices from "./components/FeaturedServices";
import InteractiveMap from "./components/InteractiveMap";
import Testimonials from "./components/Testimonials";
import RightButtons from "./components/RightButtons";
import ThemeCustomizer from "./components/ThemeCustomizer";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero & Dual Search Bar */}
      <SearchSection />

      {/* Banner & Spotlight Cards Grid */}
      <div className="max-w-7xl mx-auto mt-6 px-4 sm:px-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <ImageSlider />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <RightCards />
          </div>
        </div>
      </div>

      {/* 20 Gradient Category Cards */}
      <Categories />

      {/* Live Interactive Map Explorer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12">
        <InteractiveMap />
      </div>

      {/* Featured Collections Showcase */}
      <FeaturedServices />

      {/* Verified Customer & Merchant Testimonials */}
      <Testimonials />

      {/* Floating Action Dock */}
      <RightButtons />

      {/* Dynamic Theme Customizer Switcher */}
      <ThemeCustomizer />

      {/* Footer */}
      <Footer />
    </main>
  );
}