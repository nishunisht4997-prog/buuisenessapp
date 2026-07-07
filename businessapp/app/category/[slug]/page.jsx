"use client";

import { useParams } from "next/navigation";

export default function CategoryPage() {
  const { slug } = useParams();

  if (slug === "restaurants") return <RestaurantsCategory />;
  if (slug === "hotels") return <HotelsCategory />;
  if (slug === "beauty-spa") return <BeautyCategory />;

  return (
    <div className="p-10 text-center text-gray-500">Category coming soon</div>
  );
}

/* =========================
   🍽️ RESTAURANTS
========================= */

function RestaurantsCategory() {
  return (
    <div>
      {/* 🔹 BANNER */}
      <div className="relative">
        <img src="/Restuarant.jpg" className="w-full h-80 object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <h1 className="absolute bottom-10 left-10 text-white text-4xl font-bold">
          Restaurant Collections
        </h1>
      </div>

      {/* 🔹 COLLECTIONS */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Collection
          title="Indian Flavours"
          items={["Gujarati Thali", "South Indian", "Pure Veg", "North Indian"]}
        />
        <Collection
          title="Global Cuisines"
          items={["Italian", "Middle East", "Greek", "Chinese"]}
        />
        <Collection
          title="Nightlife"
          items={["Pubs", "Gastropubs", "Night Clubs", "Restaurants & Bars"]}
        />
        <Collection
          title="Quick Bites"
          items={["Bakeries", "Coffee Shops", "Fast Food", "Pizza Outlets"]}
        />
        <Collection title="Sweet Tooth" items={["Cake Shops", "Desserts"]} />
        <Collection
          title="Foodie"
          items={["Pizza Mania", "Tandoori Chicken", "Street Food"]}
        />
      </div>

      {/* 🔹 VIEW ALL */}
      <div className="flex justify-center pb-16">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700">
          View All Categories
        </button>
      </div>
    </div>
  );
}

/* =========================
   🏨 HOTELS
========================= */

function HotelsCategory() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <h1 className="text-2xl font-bold mb-4">
        Best Deals – Top Hotels Near Rental Colony
      </h1>

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-3 mb-6">
        {[
          "08-01-2026",
          "09-01-2026",
          "Sort by",
          "Star Rating",
          "Budget",
          "Hotel View",
          "User Ratings",
          "All Filters",
        ].map((f) => (
          <button
            key={f}
            className="px-4 py-2 border rounded-lg bg-white text-sm hover:bg-gray-50"
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <HotelCard
            name="S Convention"
            price="₹1,561"
            rating="4.6"
            reviews="34 Ratings"
            location="Ghangapatana Kantabad, Bhubaneswar"
          />
          <HotelCard
            name="Hotel S J Pride"
            price="₹1,960"
            rating="4.6"
            reviews="1,656 Ratings"
            location="BDA Colony Patrapada, Bhubaneswar"
          />
        </div>

        <div className="bg-white border rounded-xl p-6 h-fit">
          <h3 className="font-semibold text-lg mb-3">
            Get the List of Top Hotels
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            We’ll send you contact details in seconds for free.
          </p>
          <div className="space-y-3">
            <input
              className="w-full border px-3 py-2 rounded"
              placeholder="Name"
            />
            <input
              className="w-full border px-3 py-2 rounded"
              placeholder="Mobile Number"
            />
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
              Get Best Deal &gt;&gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================
   💄 BEAUTY
========================= */

function BeautyCategory() {
  return (
    <div>
      <div className="relative">
        <img
          src="/beautyspa.png"
          className="w-full h-[320px] object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <h1 className="absolute bottom-10 left-10 text-white text-4xl font-bold">
          Beauty & Spa Collections
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Collection
          title="Popular Beauty Services"
          items={["Hair Cut", "Facial", "Manicure", "Pedicure"]}
        />
        <Collection
          title="Top Salons & Spas"
          items={["Unisex Salons", "Luxury Spas", "Ayurvedic Spa", "Thai Spa"]}
        />
        <Collection
          title="Specialized Beauty"
          items={[
            "Bridal Makeup",
            "Party Makeup",
            "Hair Styling",
            "Hair Straightening",
          ]}
        />
        <Collection
          title="Cosmetic Procedures"
          items={[
            "Derma Treatments",
            "Anti-aging",
            "Hair Treatment",
            "Beauty Clinics",
          ]}
        />
        <Collection
          title="At-Home Beauty Services"
          items={[
            "Makeup Artists",
            "Salon Services",
            "Mehendi Artists",
            "Nail Artists",
          ]}
        />
        <Collection
          title="Tattoo Services"
          items={[
            "Tattoo Parlours",
            "Temporary Tattoo",
            "Permanent Tattoo",
            "Tattoo Removal",
          ]}
        />
      </div>

      <div className="flex justify-center pb-16">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700">
          View All Beauty Categories
        </button>
      </div>
    </div>
  );
}

/* =========================
   🔹 REUSABLE COMPONENTS
========================= */

function Collection({ title, items }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <ul className="space-y-2 text-gray-700">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
        <li className="text-blue-600 cursor-pointer font-medium">More</li>
      </ul>
    </div>
  );
}

function HotelCard({ name, price, rating, reviews, location }) {
  return (
    <div className="bg-white border rounded-xl p-4 flex gap-4">
      <div className="w-40 h-28 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
        Image
      </div>
      <div className="flex-1">
        <h2 className="text-lg font-bold">{name}</h2>
        <div className="flex items-center gap-2 text-sm mt-1">
          <span className="bg-green-600 text-white px-2 py-0.5 rounded">
            {rating} ★
          </span>
          <span className="text-gray-500">{reviews}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{location}</p>
        <p className="text-green-600 font-semibold mt-1">
          {price} <span className="text-sm text-gray-500">per night</span>
        </p>
        <div className="flex gap-3 mt-3">
          <button className="bg-green-600 text-white px-4 py-1.5 rounded">
            Call
          </button>
          <button className="bg-green-500 text-white px-4 py-1.5 rounded">
            WhatsApp
          </button>
          <button className="bg-blue-600 text-white px-4 py-1.5 rounded">
            Get Best Deal
          </button>
        </div>
      </div>
    </div>
  );
}
