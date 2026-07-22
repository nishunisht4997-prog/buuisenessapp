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
import ThreeCityGlobe from "./components/ThreeCityGlobe";
import ThreeIsometricCard from "./components/ThreeIsometricCard";
import HotDealsSection from "./components/HotDealsSection";
import { Sparkles, Building } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero & Dual Search Bar */}
      <SearchSection />

      {/* 🔹 3D Interactive City Radar & Banner Spotlight Grid */}
      <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <ImageSlider />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <ThreeCityGlobe />
          </div>
        </div>
      </div>

      {/* 20 Gradient Category Cards */}
      <Categories />

      {/* 🔹 🔥 Live Hot Deals & Flash Coupons Section */}
      <HotDealsSection />

      {/* 🔹 3D Isometric Venues Showcase Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
              <Sparkles size={13} /> 3D Interactive Spotlight
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>3D Isometric Venues & Top Stays</span>
              <Building size={22} className="text-amber-400" />
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
              Hover or touch to rotate 3D isometric building models in real time
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ThreeIsometricCard
            id="iso-1"
            name="Swosti Grand Convention & Resort"
            category="Banquet Halls & Luxury Stays"
            area="Patia, Bhubaneswar"
            rating={4.9}
            reviews={420}
            priceText="₹45,000 / day"
            phone="+919876543210"
            image="https://images.pexels.com/photos/17206170/pexels-photo-17206170/free-photo-of-interior-design-of-banquet-hall.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
          <ThreeIsometricCard
            id="iso-2"
            name="The Crown Suites & Executive Lounge"
            category="Hotels & Business Stays"
            area="Jaydev Vihar, Bhubaneswar"
            rating={4.8}
            reviews={290}
            priceText="₹1,850 / night"
            phone="+919876543211"
            image="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80"
          />
          <ThreeIsometricCard
            id="iso-3"
            name="Barbeque Nation & Fine Dining"
            category="Buffet & Premium Dining"
            area="Saheed Nagar, Bhubaneswar"
            rating={4.9}
            reviews={850}
            priceText="₹899 / person"
            phone="+919876543212"
            image="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80"
          />
        </div>
      </div>

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