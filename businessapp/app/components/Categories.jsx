"use client";

import { useRouter } from "next/navigation";

export default function Categories() {
  const router = useRouter();


const categories = [
  { name: "Restaurants", icon: "🍽️", slug: "restaurants" },
  { name: "Hotels", icon: "🏨", slug: "hotels" },
  { name: "Beauty Spa", icon: "💆‍♀️", slug: "beauty-spa" },
  { name: "Home Decor", icon: "🛋️", slug: "home-decor" },
  { name: "Wedding Planning", icon: "💍", slug: "wedding-planning" },
  { name: "Education", icon: "🎓", slug: "education" },
  { name: "Rent & Hire", icon: "🔑", slug: "rent-hire" },
  { name: "Hospitals", icon: "🏥", slug: "hospitals" },
  { name: "Contractors", icon: "👷", slug: "contractors" },
  { name: "Pet Shops", icon: "🐾", slug: "pet-shops" },
  { name: "PG / Hostels", icon: "🏠", slug: "pg-hostels" },
  { name: "Estate Agent", icon: "🏢", slug: "estate-agent" },
  { name: "Dentists", icon: "🦷", slug: "dentists" },
  { name: "Gym", icon: "🏋️", slug: "gym" },
  { name: "Loans", icon: "💰", slug: "loans" },
  { name: "Event Organisers", icon: "🎉", slug: "event-organisers" },
  { name: "Driving Schools", icon: "🚗", slug: "driving-schools" },
  { name: "Packers & Movers", icon: "📦", slug: "packers-movers" },
  { name: "Courier Service", icon: "🚚", slug: "courier-service" },
  { name: "Popular Categories", icon: "⭐", slug: "popular-categories" },
];

 return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {categories.map((cat) => (
        <div
          key={cat.slug}
          onClick={() => router.push(`/category/${cat.slug}`)}
          className="cursor-pointer flex flex-col items-center">
          {/* ICON / IMAGE */}
          <div className="w-20 h-20 flex items-center justify-center rounded-xl border bg-white">
            <span className="text-3xl">{cat.icon}</span>
          </div>

          {/* LABEL */}
          <p className="mt-2 text-sm font-medium text-gray-800">
            {cat.name}
          </p>
        </div>
      ))}
    </div>
  );
}
