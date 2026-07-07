const sections = [
  {
    title: "Wedding Requisites",
    items: [
      {
        name: "Banquet Halls",
        img: "https://images.pexels.com/photos/17206170/pexels-photo-17206170/free-photo-of-interior-design-of-banquet-hall.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Bridal Requisite",
        img: "https://img.weddingbazaar.com/photos/pictures/000/809/719/new_medium/salad.jpg?1554987455",
      },
      {
        name: "Caterers",
        img: "https://img.freepik.com/free-photo/waiter-carries-plate-with-tasty-snacks_8353-1263.jpg?semt=ais_hybrid&w=740&q=80",
      },
    ],
  },
  {
    title: "Beauty & Spa",
    items: [
      {
        name: "Beauty Parlours",
        img: "https://images.unsplash.com/photo-1600334129128-685c5582fd35",
      },
      {
        name: "Spa & Massages",
        img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874",
      },
      {
        name: "Salons",
        img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e",
      },
    ],
  },
  {
    title: "Repairs & Services",
    items: [
      {
        name: "AC Repair",
        img: "https://techsquadteam.com/assets/profile/blogimages/f00ab4df455700aeb2ff86da0cb79fe2.png",
      },
      {
        name: "Car Service",
        img: "https://png.pngtree.com/thumb_back/fh260/background/20240403/pngtree-auto-mechanic-working-in-garage-repair-service-image_15647939.jpg",
      },
      {
        name: "Bike Service",
        img: "https://static.vecteezy.com/system/resources/thumbnails/011/844/022/small/mechanic-using-a-hex-key-or-allen-wrench-to-remove-motorcycle-rear-hydraulic-brake-pump-working-in-garage-maintenance-and-repair-motorcycle-concept-selective-focus-photo.jpg",
      },
    ],
  },
  {
    title: "Daily Needs",
    items: [
      {
        name: "Movies",
        img: "https://png.pngtree.com/thumb_back/fh260/background/20230701/pngtree-vibrant-cinema-experience-with-3d-glasses-popcorn-and-clapperboard-background-image_3704547.jpg",
      },
      {
        name: "Grocery",
        img: "https://www.thetakeout.com/img/gallery/the-6-to-1-rule-to-save-money-and-time-at-the-grocery-store/intro-1760555600.jpg",
      },
      {
        name: "Electricians",
        img: "https://skilled.peopleready.com/wp-content/uploads/sites/2/2023/09/Electricians_v3_1000x460.png",
      },
    ],
  },
];

export default function FeaturedServices() {
  return (
    <div className="max-w-7xl mx-auto mt-10 grid grid-cols-2 gap-8">
      {sections.map((section, index) => (
        <div key={index} className="border rounded-xl p-5 bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-4">{section.title}</h2>

          <div className="grid grid-cols-3 gap-4">
            {section.items.map((item, i) => (
              <div key={i} className="text-center cursor-pointer">
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-[120px] object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <p className="mt-2 text-sm font-medium">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
