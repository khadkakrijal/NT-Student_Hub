import {
  BookOpen,
  Bus,
  CloudRain,
  GraduationCap,
  HeartPulse,
  Home,
  MapPin,
  ShoppingBag,
  ShieldAlert,
  Utensils,
  Trees,
  Landmark,
  Waves,
  ShoppingBasket,
  PawPrint,
  Camera,
  Tent,
  Sun,
} from "lucide-react";

export const guideOverviewCards = [
  {
    title: "Weather & Seasons",
    href: "/guide/weather",
    icon: CloudRain,
    description:
      "Understand Darwin’s dry season, wet season, humidity, storms, and cyclone risk.",
  },
  {
    title: "Education",
    href: "/guide/education",
    icon: GraduationCap,
    description:
      "Universities, colleges, education providers, and agencies useful for international students.",
  },
  {
    title: "Food & Culture",
    href: "/guide/food",
    icon: Utensils,
    description:
      "Nepali, Thai, Asian food, student-friendly restaurants, and multicultural places.",
  },
  {
    title: "Shopping",
    href: "/guide/shopping",
    icon: ShoppingBag,
    description:
      "Groceries, Woolworths, Asian stores, shopping centres, and everyday student essentials.",
  },
  {
    title: "Health",
    href: "/guide/health",
    icon: HeartPulse,
    description:
      "Chemists, clinics, hospitals, emergency contacts, and basic health preparation.",
  },
  {
    title: "Transport",
    href: "/guide/transport",
    icon: Bus,
    description:
      "Buses, suburbs, car dependency, walking, cycling, and travel tips around Darwin.",
  },
];

export const guideStats = [
  { label: "Main climate", value: "Tropical" },
  { label: "Dry season", value: "May–Oct" },
  { label: "Wet season", value: "Nov–Apr" },
  { label: "Main university", value: "CDU" },
];

export const darwinIntroSections = [
  {
    title: "Darwin as a student city",
    icon: MapPin,
    body: "Darwin is the capital city of the Northern Territory and has a smaller, warmer, more relaxed lifestyle compared with bigger Australian cities. For international students, this can be a positive experience because communities are closer, travel distances are shorter, and it can be easier to meet people. However, students should understand Darwin’s weather, transport, suburbs, work opportunities, and accommodation situation before arriving.",
  },
  {
    title: "Why students need this guide first",
    icon: BookOpen,
    body: "Before choosing accommodation, students should understand where their campus is, how far the property is from buses, whether shops are nearby, how hot or wet the area can be during the year, and whether the suburb suits their daily routine. A cheap room far from transport can become difficult without a car.",
  },
  {
    title: "Safety and cyclone awareness",
    icon: ShieldAlert,
    body: "Darwin is in a cyclone-prone region. During the wet season, students should follow official alerts, prepare basic emergency items, and avoid floodwater. Shared houses should discuss emergency plans before severe weather begins.",
  },
];

export const weatherSections = [
  {
    title: "Dry Season",
    subtitle: "May to October",
    points: [
      "Lower humidity and much less rain.",
      "Sunny days and more comfortable evenings.",
      "Best time for outdoor activities, markets, sport, and exploring Darwin.",
      "Popular time for tourism, so some areas can become busier.",
    ],
  },
  {
    title: "Wet Season",
    subtitle: "November to April",
    points: [
      "High humidity, heavy rain, thunderstorms, and monsoon conditions.",
      "Cyclone risk is higher during this period.",
      "Some roads can flood after heavy rain.",
      "Students should check weather warnings and prepare early.",
    ],
  },
  {
    title: "Student preparation",
    subtitle: "Before wet season",
    points: [
      "Keep a torch, power bank, water, simple food, and important documents ready.",
      "Know emergency contacts and official alert sources.",
      "Avoid walking or driving through floodwater.",
      "Talk with housemates about what to do during storms.",
    ],
  },
];

export const educationProviders = [
  {
    name: "Charles Darwin University - Casuarina Campus",
    type: "University campus",
    area: "Casuarina / northern suburbs",
    notes:
      "CDU Casuarina is the major university campus in Darwin and is important for students living around Casuarina, Brinkin, Nakara, Tiwi, Rapid Creek, and Nightcliff. Many students prefer accommodation near this area because it is close to campus, Casuarina Square, buses, groceries, chemists, and Royal Darwin Hospital.",
  },
  {
    name: "Charles Darwin University - Darwin City Campus",
    type: "University city campus",
    area: "Darwin CBD",
    notes:
      "CDU also has a Darwin city campus presence, which is useful for students studying or working around the CBD. Students based in the city should compare rent, transport, work opportunities, and distance from their classes before choosing accommodation.",
  },
  {
    name: "CDU International College",
    type: "Pathway / international college",
    area: "CDU connected",
    notes:
      "CDU International College supports international student pathway options connected with CDU. Students should confirm course details, entry requirements, campus location, and fees directly before applying.",
  },
  {
    name: "Canterbury Institute of Management (CIM)",
    type: "Higher education provider",
    area: "Darwin campus",
    notes:
      "CIM has a Darwin campus and is relevant for international students looking for business, management, or related higher education pathways. Students should confirm current CRICOS registration, intake dates, and course fees.",
  },
  {
    name: "International College of Advanced Education",
    type: "Vocational / training provider",
    area: "Darwin",
    notes:
      "A Darwin-based training provider known for practical study pathways. Students should confirm current course availability and CRICOS details.",
  },
  {
    name: "Alana Kaye College",
    type: "Vocational provider",
    area: "Darwin",
    notes:
      "A training provider in Darwin. Students should check current course registration, fees, location, and student support before enrolling.",
  },
];
export const educationAgencies = [
  {
    name: "Oasis Education",
    category: "Education / migration support",
    notes:
      "Known in the Darwin student community. Students should confirm services, migration advice registration, and fees directly.",
  },
  {
    name: "Grace International Darwin",
    category: "Education agency",
    notes:
      "International education agency with Darwin presence. Confirm course/provider advice directly.",
  },
  {
    name: "AECC / IDP / other registered agencies",
    category: "Education counselling",
    notes:
      "Students should verify whether the counsellor is authorised for the institution and whether migration advice is from a registered migration agent.",
  },
];

export const foodPlaces = [
  {
    name: "Mo:Mo King",
    cuisine: "Nepalese / Asian",
    area: "Darwin city area",
    notes:
      "Popular Nepalese food option for momo, curry, and student-friendly meals.",
  },
  {
    name: "Nepa Kitchen",
    cuisine: "Nepalese",
    area: "Darwin",
    notes:
      "Authentic Nepalese cuisine option. Good for students looking for familiar South Asian food.",
  },
  {
    name: "Thai restaurants around Darwin CBD",
    cuisine: "Thai",
    area: "Darwin CBD / suburbs",
    notes:
      "Darwin has multiple Thai food options. Students should check current reviews and opening hours.",
  },
  {
    name: "Asian takeaway and noodle places",
    cuisine: "Asian",
    area: "Casuarina / Darwin / Palmerston",
    notes:
      "Useful for quick affordable meals near shopping centres and student areas.",
  },
];

export const shoppingPlaces = [
  {
    name: "Woolworths Casuarina",
    type: "Supermarket",
    area: "247 Trower Road, Casuarina",
    notes:
      "Useful for students living near CDU Casuarina, Nakara, Brinkin, Tiwi, and nearby suburbs.",
  },
  {
    name: "Coles / Woolworths / IGA stores",
    type: "Groceries",
    area: "Darwin, Casuarina, Palmerston and surrounding suburbs",
    notes: "Students should compare distance, bus access, and weekly specials.",
  },
  {
    name: "Casuarina Square",
    type: "Shopping centre",
    area: "Casuarina",
    notes:
      "Major shopping centre near CDU area with groceries, food, pharmacy, clothing, and services.",
  },
  {
    name: "Asian grocery stores",
    type: "Specialty groceries",
    area: "Darwin and northern suburbs",
    notes:
      "Useful for rice, spices, noodles, sauces, frozen items, and South Asian/Asian cooking ingredients.",
  },
];

export const healthPlaces = [
  {
    name: "Chemist Warehouse Casuarina",
    type: "Pharmacy",
    area: "Shop 3-4, 4 Rowling Street, Casuarina",
    notes:
      "Useful for medicine, basic health products, vitamins, and pharmacy services.",
  },
  {
    name: "Royal Darwin Hospital",
    type: "Hospital",
    area: "Tiwi / northern suburbs",
    notes: "Major hospital for emergencies and serious medical care.",
  },
  {
    name: "Local GP clinics",
    type: "Doctor / general practice",
    area: "Darwin, Casuarina, Palmerston",
    notes:
      "Students should check OSHC coverage, appointment fees, and bulk billing availability.",
  },
];

export const transportTips = [
  {
    title: "Public buses",
    points: [
      "Darwin has buses, but frequency and routes may not suit every suburb.",
      "Before renting a room, check the bus route to CDU, work, shops, and the city.",
      "Living near a bus stop can make student life much easier.",
    ],
  },
  {
    title: "Car dependency",
    points: [
      "Some suburbs are easier with a car, especially for late work shifts.",
      "Students buying cars should budget for registration, insurance, fuel, servicing, and repairs.",
      "During wet season, avoid flooded roads and check warnings.",
    ],
  },
  {
    title: "Cycling and walking",
    points: [
      "Cycling can be useful in some areas but heat and rain can be challenging.",
      "Walking long distances in midday heat is not recommended.",
      "Carry water and sun protection.",
    ],
  },
];

export const suburbGuide = [
  {
    name: "Casuarina",
    bestFor: "CDU students, shopping, buses, everyday services",
  },
  {
    name: "Nakara / Brinkin / Tiwi",
    bestFor: "Close to CDU and Royal Darwin Hospital area",
  },
  {
    name: "Darwin CBD",
    bestFor: "City lifestyle, restaurants, nightlife, hospitality jobs",
  },
  {
    name: "Coconut Grove / Nightcliff / Rapid Creek",
    bestFor: "Shared housing, markets, coastal lifestyle",
  },
  {
    name: "Palmerston",
    bestFor: "Families, cheaper housing options, but longer commute",
  },
];

export const thingsToDoPlaces = [
  {
    name: "Rapid Creek Markets",
    category: "Weekend Market",
    icon: ShoppingBasket,
    area: "Rapid Creek / Northern Suburbs",
    bestFor:
      "Fresh produce, Asian vegetables, breakfast, local food, student groceries",
    notes:
      "A great weekend spot for students. Open every Saturday and Sunday. Good for fresh vegetables, tropical fruit, Asian ingredients, cheap meals, and local community vibes.",
  },
  {
    name: "Nightcliff Jetty & Foreshore",
    category: "Sunset / Walk",
    icon: Waves,
    area: "Nightcliff",
    bestFor: "Sunset walks, ocean views, exercise, casual hangouts",
    notes:
      "One of the best relaxed places for students. Good for evening walks, photos, cycling, and meeting friends. Avoid swimming unless signs clearly say it is safe.",
  },
  {
    name: "East Point Reserve",
    category: "Park / Nature",
    icon: Trees,
    area: "Fannie Bay / East Point",
    bestFor: "Picnic, walking, sunset, nature, history",
    notes:
      "A peaceful coastal reserve with walking areas, ocean views, wildlife, and military history. Good for students who want a quiet place away from the city.",
  },
  {
    name: "Mangrove Boardwalk",
    category: "Nature Walk",
    icon: Trees,
    area: "East Point / Darwin",
    bestFor: "Mangroves, nature learning, photography",
    notes:
      "A useful place to understand Darwin’s coastal ecosystem. Students can see mangroves and learn how Darwin’s environment is different from southern Australian cities.",
  },
  {
    name: "Mindil Beach Sunset Market",
    category: "Market / Food / Sunset",
    icon: Sun,
    area: "Mindil Beach",
    bestFor: "Sunset, food stalls, culture, student hangouts",
    notes:
      "One of Darwin’s most famous seasonal experiences. Great for food, sunset photos, and multicultural atmosphere. Check season and opening days before going.",
  },
  {
    name: "Litchfield National Park",
    category: "Day Trip / Camping",
    icon: Tent,
    area: "Outside Darwin",
    bestFor: "Waterfalls, nature, weekend trips, camping",
    notes:
      "A popular weekend trip from Darwin. Students usually need a car or tour. Always check road and swimming conditions, especially during the wet season.",
  },
  {
    name: "Berry Springs Nature Park",
    category: "Nature / Swimming",
    icon: Waves,
    area: "Berry Springs",
    bestFor: "Day trip, picnic, nature",
    notes:
      "Popular for day trips, but access and swimming conditions can change. Always check official safety signs before entering water.",
  },
  {
    name: "Crocosaurus Cove",
    category: "Crocodile Attraction",
    icon: PawPrint,
    area: "Darwin CBD",
    bestFor: "Crocodile learning, reptiles, visitors",
    notes:
      "Located in Darwin city and focused on saltwater crocodiles and Australian reptiles. Useful for students wanting to understand NT wildlife safely.",
  },
  {
    name: "Crocodylus Park",
    category: "Wildlife Park",
    icon: PawPrint,
    area: "Berrimah",
    bestFor: "Crocodiles, animals, weekend visit",
    notes:
      "A wildlife park with crocodiles and other animals. Good for students who want a safe crocodile experience without going near wild waterways.",
  },
  {
    name: "Territory Wildlife Park",
    category: "Wildlife / Nature",
    icon: PawPrint,
    area: "Berry Springs",
    bestFor: "Wildlife, nature learning, day trip",
    notes:
      "Around 45 minutes south of Darwin near Berry Springs. Good for understanding Top End wildlife in a safe managed environment.",
  },
  {
    name: "Darwin Waterfront",
    category: "City / Relaxation",
    icon: Landmark,
    area: "Darwin CBD",
    bestFor: "Food, walking, swimming lagoon, events",
    notes:
      "A popular city area for students and visitors. Good for safe swimming areas, restaurants, walking, and relaxing close to the CBD.",
  },
  {
    name: "Stokes Hill Wharf",
    category: "Food / Ocean View",
    icon: Camera,
    area: "Darwin CBD",
    bestFor: "Dinner, ocean views, casual evening",
    notes:
      "Good for casual meals and harbour views. A nice place for students to take visitors or relax after study/work.",
  },
];

export const crocodileSafetyTips = [
  "Never swim in rivers, creeks, mangroves, or unknown waterholes unless signs clearly say it is safe.",
  "Always follow crocodile warning signs.",
  "Do not stand close to water edges in crocodile areas.",
  "Be extra careful around mangroves, boat ramps, beaches, rivers, and floodwaters.",
  "For camping or day trips, check official park alerts before leaving Darwin.",
];
