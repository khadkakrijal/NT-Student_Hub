import {
  AlertTriangle,
  Briefcase,
  Bus,
  CloudRain,
  Compass,
  GraduationCap,
  MapPin,
  Phone,
  Utensils,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export const livingBasePath = "/living-in-darwin";

export type LivingSection = {
  heading: string;
  summary?: string;
  points: string[];
  studentTips?: string[];
  commonMistakes?: string[];
  examples?: string[];
};

export type LivingPage = {
  slug: string;
  title: string;
  icon: LucideIcon;
  description: string;
  sections: LivingSection[];
};

export const livingPages: LivingPage[] = [
  {
    slug: "about-darwin",
    title: "About Darwin",
    icon: MapPin,
    description:
      "Understand Darwin’s lifestyle, suburbs, backpacker culture, student life, work competition, and what makes the Top End different.",
    sections: [
      {
        heading: "Darwin is different from bigger Australian cities",
        summary:
          "Darwin is smaller, warmer, more relaxed, and more seasonal than major cities like Sydney, Melbourne or Brisbane. This makes daily student life feel different, especially around transport, work, weather and accommodation choices.",
        points: [
          "Darwin has a slower lifestyle, smaller city centre, strong outdoor culture and close community networks.",
          "Students should think carefully about campus distance, transport, shops, part-time work and weather before choosing a suburb.",
          "The city has strong multicultural communities, including South Asian, Nepali, Thai, Filipino, Indonesian, Vietnamese and other Asian communities.",
        ],
        studentTips: [
          "Do not choose a room only because it is cheap; check transport and nearby shops first.",
          "Ask other students about suburbs before paying bond.",
          "Explore the city during your first few weeks so you understand distances better.",
        ],
        commonMistakes: [
          "Assuming Darwin public transport is like Sydney or Melbourne.",
          "Choosing accommodation far from campus or work without checking bus frequency.",
          "Underestimating heat, humidity and wet season travel difficulty.",
        ],
        examples: [
          "A cheaper room in a far suburb may become expensive if you need taxis or rideshares often.",
          "A student without a car may find life easier near Casuarina, Darwin CBD, Nightcliff, Coconut Grove or other areas with better transport access.",
        ],
      },
      {
        heading: "Backpackers and seasonal movement",
        summary:
          "Darwin attracts backpackers, working holiday makers and seasonal workers, especially during the Dry season. This can increase both job opportunities and competition.",
        points: [
          "Backpackers often look for hospitality, tourism, farm, cleaning and casual jobs.",
          "Dry season can bring more events, tourism activity and hospitality shifts.",
          "More people looking for work can also mean stronger competition for students.",
        ],
        studentTips: [
          "Prepare your resume before arriving or early after arrival.",
          "Apply consistently instead of waiting for one perfect job.",
          "Visit businesses in person where appropriate, especially hospitality and retail.",
        ],
        commonMistakes: [
          "Waiting until money is low before applying for jobs.",
          "Only applying online and never following up.",
          "Ignoring availability; employers often want clear shift availability.",
        ],
      },
      {
        heading: "Why students should learn Darwin first",
        summary:
          "Understanding Darwin before choosing accommodation can prevent stress with transport, jobs, groceries and safety.",
        points: [
          "A cheap room may not be useful if buses are limited or shops are far away.",
          "Wet season rain, heat, humidity and storms can affect daily travel.",
          "Students should compare accommodation with campus, work, groceries, pharmacy and transport access.",
        ],
        studentTips: [
          "Use Google Maps to check bus routes before messaging a host.",
          "Ask if bills, internet and furniture are included.",
          "Check whether the location is practical during wet season.",
        ],
      },
    ],
  },
  {
    slug: "weather",
    title: "Weather & Seasons",
    icon: CloudRain,
    description:
      "Learn about Darwin’s Dry season, Wet season, storms, humidity, cyclone preparation, and how weather affects student life.",
    sections: [
      {
        heading: "Dry Season: May to October",
        summary:
          "The Dry season is usually the easiest time for new students to settle in Darwin. The weather is more comfortable, outdoor activities are easier, and tourism-related work can become busier.",
        points: [
          "The weather is usually less humid with very little rain.",
          "Tourism, hospitality, restaurants, hotels and events can become busier.",
          "It is easier to explore places like Nightcliff, East Point, Mindil Beach, markets and Litchfield.",
        ],
        studentTips: [
          "Use Dry season to explore suburbs before signing a long lease.",
          "Apply early for hospitality, hotel and event work.",
          "Still carry water and sun protection because Darwin can remain hot.",
        ],
        commonMistakes: [
          "Thinking Dry season means cold weather.",
          "Leaving job applications too late during busy months.",
        ],
      },
      {
        heading: "Wet Season: November to April",
        summary:
          "Wet season brings higher humidity, heavy rain, storms, monsoon conditions and cyclone risk. It can affect transport, outdoor plans and sometimes work availability.",
        points: [
          "Humidity is higher and storms can be intense.",
          "Some outdoor activities, roads, parks and swimming areas may close or change access.",
          "Some tourism jobs may slow down, but retail, cleaning, care work, hospitality and local services can still have work.",
        ],
        studentTips: [
          "Keep a power bank, torch, water, important documents and simple food ready.",
          "Check official alerts before travelling during storms.",
          "Avoid floodwater and never drive through flooded roads.",
        ],
        commonMistakes: [
          "Choosing accommodation far from transport without considering heavy rain.",
          "Not preparing for cyclone season until the last moment.",
        ],
      },
      {
        heading: "Student preparation",
        summary:
          "Weather preparation is part of normal life in Darwin. Students living in shared houses should talk with housemates about emergency planning.",
        points: [
          "Keep emergency supplies in your room or shared house.",
          "Save important contacts and know your address clearly.",
          "Follow official weather warnings during severe weather.",
        ],
        studentTips: [
          "Keep passport, visa, CoE, OSHC and lease copies saved digitally.",
          "Ask your host or housemates about cyclone preparation.",
        ],
      },
    ],
  },
  {
    slug: "jobs",
    title: "Jobs & Employment",
    icon: Briefcase,
    description:
      "Understand student work opportunities, seasonal competition, backpackers, and realistic expectations for finding casual work.",
    sections: [
      {
        heading: "Common student jobs",
        summary:
          "International students in Darwin often start with casual or part-time work in hospitality, retail, cleaning, events and support services.",
        points: [
          "Hospitality jobs include kitchen hand, waiter, barista, food and beverage attendant and hotel work.",
          "Retail jobs include supermarkets, shopping centres, customer service, stock work and warehouse support.",
          "Other options include cleaning, delivery, aged care, disability support, admin, events and tutoring.",
        ],
        studentTips: [
          "Create a simple one-page resume.",
          "Prepare your availability clearly.",
          "Apply to multiple industries, not only one type of job.",
        ],
        commonMistakes: [
          "Using the same resume for every job.",
          "Not answering phone calls from unknown numbers after applying.",
          "Saying you are available anytime but later rejecting shifts.",
        ],
      },
      {
        heading: "Dry season opportunities",
        summary:
          "Dry season can create more work in tourism, hotels, restaurants, bars and events, but it can also bring more competition.",
        points: [
          "Tourism and hospitality are usually busier.",
          "Backpackers also arrive during this season looking for work.",
          "Students should apply early and follow up professionally.",
        ],
        studentTips: [
          "Visit venues in person during quieter hours.",
          "Keep your resume ready before peak season.",
          "Be polite and professional when following up.",
        ],
      },
      {
        heading: "Wet season challenges",
        summary:
          "Wet season may reduce some tourism work, and rain can make transport harder for students without cars.",
        points: [
          "Some tourism-related work may slow down.",
          "Rain and storms can affect transport and shift reliability.",
          "Students should apply across retail, cleaning, care work, hospitality and local services.",
        ],
        studentTips: [
          "Look for jobs closer to your accommodation or bus route.",
          "Have a backup transport plan for early morning or late-night shifts.",
        ],
      },
    ],
  },
  {
    slug: "cost-of-living",
    title: "Cost of Living",
    icon: Wallet,
    description:
      "Plan rent, bond, groceries, transport, phone, OSHC, car costs, and emergency savings before moving into accommodation.",
    sections: [
      {
        heading: "Accommodation costs",
        summary:
          "Rent is usually the biggest weekly cost for students, but students also need to check bond, bills, furniture and internet.",
        points: [
          "Always check weekly rent, bond amount, bills included or not included, internet, electricity and water.",
          "Ask whether the room is furnished and whether kitchen items, washing machine and fridge access are included.",
          "Do not pay bond or rent without confirming the room, address and host properly.",
        ],
        studentTips: [
          "Ask for clear photos and inspection before paying.",
          "Confirm whether bills are included in writing.",
          "Keep screenshots of payment discussions.",
        ],
        commonMistakes: [
          "Paying bond before confirming the address.",
          "Forgetting to ask about electricity and internet costs.",
        ],
      },
      {
        heading: "Daily living costs",
        summary:
          "Students should plan for groceries, phone, transport, medicines, work clothes and emergency expenses.",
        points: [
          "Groceries can be managed better by using supermarkets, Asian groceries, markets and weekly specials.",
          "Students should budget for phone plan, transport, work clothes, medicines, study materials and emergencies.",
          "If buying a car, include registration, insurance, fuel, servicing, tyres and repairs.",
        ],
        studentTips: [
          "Cook at home often to reduce expenses.",
          "Compare supermarkets, markets and Asian grocery stores.",
          "Keep emergency savings before wet season if possible.",
        ],
      },
      {
        heading: "Budget advice",
        summary:
          "A good student budget should consider both rent and the hidden cost of location.",
        points: [
          "Keep emergency savings if possible, especially before wet season.",
          "Compare suburbs carefully because cheaper rent can become expensive if transport is difficult.",
          "Share cooking, groceries and transport with trusted housemates where appropriate.",
        ],
        examples: [
          "A $20 cheaper room may not save money if you spend more on transport every week.",
          "Living near campus, work or bus routes can reduce stress and costs.",
        ],
      },
    ],
  },
  {
    slug: "food",
    title: "Food & Culture",
    icon: Utensils,
    description:
      "Find student-friendly food, Nepali and Asian options, markets, affordable meals, and multicultural food culture.",
    sections: [
      {
        heading: "Nepali and South Asian food",
        summary:
          "Darwin has growing South Asian and Nepali food options, but cooking at home is still usually cheaper for students.",
        points: [
          "Students can find momo, curry, rice meals and community food events.",
          "Community events may happen around Dashain, Tihar and other cultural celebrations.",
          "Cooking at home with shared groceries is usually cheaper than eating out every day.",
        ],
        studentTips: [
          "Buy rice, lentils, spices and basic groceries in bulk when possible.",
          "Cook with housemates to reduce cost.",
          "Follow local community pages for cultural events.",
        ],
      },
      {
        heading: "Thai, Asian and market food",
        summary:
          "Darwin has strong Asian food culture, including Thai, Vietnamese, Indonesian, Filipino, Chinese and other cuisines.",
        points: [
          "Rapid Creek Markets are useful for Asian vegetables, fruit, breakfast and affordable weekend food.",
          "Parap and Mindil markets are also popular for food and student hangouts.",
          "Some markets are seasonal, so students should check opening times.",
        ],
        studentTips: [
          "Use markets for fresh herbs, vegetables and affordable meals.",
          "Check market days before travelling.",
        ],
      },
      {
        heading: "Student food tips",
        summary:
          "Food costs can increase quickly if students depend on takeaway every day.",
        points: [
          "Learn basic cooking early because takeaway becomes expensive.",
          "Use markets for fruit, vegetables, herbs and Asian ingredients.",
          "Check opening hours before travelling because some food places are seasonal or close earlier than big-city venues.",
        ],
        commonMistakes: [
          "Eating takeaway every day during the first month.",
          "Not checking whether accommodation has proper kitchen access.",
        ],
      },
    ],
  },
  {
    slug: "transport",
    title: "Transport",
    icon: Bus,
    description:
      "Understand buses, car dependency, cycling, walking, suburbs, wet season travel, and why transport matters before renting.",
    sections: [
      {
        heading: "Public buses",
        summary:
          "Darwin has public buses, but routes and frequency may not suit every student’s study, work and shopping schedule.",
        points: [
          "Before choosing a room, check bus access to CDU, work, groceries and the city.",
          "Living near a bus route can make student life much easier.",
          "Some jobs with early starts or late finishes may be difficult without a car.",
        ],
        studentTips: [
          "Check bus routes before paying bond.",
          "Search travel time at the exact time you would travel for class or work.",
          "Ask current students about transport in the suburb.",
        ],
        commonMistakes: [
          "Only checking distance by car on Google Maps.",
          "Choosing a room that looks close but has poor bus access.",
        ],
      },
      {
        heading: "Cars and driving",
        summary:
          "Many students eventually consider buying a car, but car ownership has extra costs.",
        points: [
          "Car ownership includes registration, insurance, fuel, servicing and repair costs.",
          "A car can help with late-night shifts, shopping and weekend trips.",
          "During wet season, never drive through floodwater and check road conditions before longer trips.",
        ],
        studentTips: [
          "Budget for insurance and repairs before buying a car.",
          "Check registration and roadworthy condition carefully.",
        ],
      },
      {
        heading: "Walking and cycling",
        summary:
          "Walking and cycling can help in some areas, but heat, humidity, rain and distance matter.",
        points: [
          "Cycling can help around some suburbs but weather can be challenging.",
          "Walking long distances in midday heat is not ideal.",
          "Carry water, use sun protection and plan trips around weather.",
        ],
      },
    ],
  },
  {
    slug: "safety",
    title: "Safety, Cyclones & Crocodiles",
    icon: AlertTriangle,
    description:
      "Important safety information for storms, crocodiles, water, beaches, camping, accommodation scams, and emergency planning.",
    sections: [
      {
        heading: "Crocodile safety",
        summary:
          "Crocodile safety is very important in the Top End. Students should never treat natural waterways like normal swimming spots unless they are clearly marked safe.",
        points: [
          "Never swim in rivers, creeks, mangroves, floodwater or unknown waterholes unless signs clearly say it is safe.",
          "Follow crocodile warning signs and stay away from water edges in risk areas.",
          "Be careful around mangroves, boat ramps, beaches, rivers and remote camping areas.",
        ],
        studentTips: [
          "Ask locals before visiting natural swimming areas.",
          "Do not stand close to water edges for photos in risky areas.",
          "Follow official signs even if other people ignore them.",
        ],
        commonMistakes: [
          "Thinking a beach or river is safe because it looks calm.",
          "Ignoring warning signs for photos or videos.",
        ],
      },
      {
        heading: "Cyclone and storm safety",
        summary:
          "Wet season is also cyclone season in northern Australia, so students should know basic emergency preparation.",
        points: [
          "Prepare basic emergency items and follow official warnings.",
          "Keep important documents saved safely.",
          "If living with housemates, discuss what everyone should do during severe weather.",
        ],
        studentTips: [
          "Keep a small emergency kit in your room.",
          "Save emergency contacts and your address in your phone.",
        ],
      },
      {
        heading: "Accommodation safety",
        summary:
          "Accommodation scams can happen when students are desperate to find a room quickly.",
        points: [
          "Inspect the room before paying where possible.",
          "Avoid sending money before confirming the host and address.",
          "Report suspicious listings and keep screenshots of messages and payment requests.",
        ],
        commonMistakes: [
          "Paying quickly because the host says many people are interested.",
          "Not checking whether photos match the actual address.",
        ],
      },
    ],
  },
  {
    slug: "education",
    title: "Education",
    icon: GraduationCap,
    description:
      "Learn about CDU Casuarina, CDU Darwin City campus, CIM, colleges, education agencies, CRICOS checks, and student support.",
    sections: [
      {
        heading: "Charles Darwin University",
        summary:
          "CDU is one of the main education providers for international students in Darwin, but students should confirm their exact campus before choosing accommodation.",
        points: [
          "CDU Casuarina is a major study location for Higher Education, TAFE and research.",
          "CDU also has a Darwin City Education and Community Precinct at Cavenagh Street.",
          "Students should check which campus they attend before choosing accommodation.",
        ],
        studentTips: [
          "Check the campus on your timetable and offer documents.",
          "Compare travel time to your exact campus, not only CDU generally.",
        ],
      },
      {
        heading: "Colleges and providers",
        summary:
          "Darwin has universities and private providers. Students should confirm provider details carefully before enrolling.",
        points: [
          "CIM has a Darwin campus and is relevant for international students looking at management or higher education pathways.",
          "Other colleges and training providers may offer vocational or pathway programs.",
          "Always check CRICOS registration, fees, campus location, intake dates and visa requirements before enrolling.",
        ],
        studentTips: [
          "Check CRICOS details before paying fees.",
          "Confirm campus location and class delivery mode.",
        ],
      },
      {
        heading: "Education agencies",
        summary:
          "Education agencies can help with applications, but students should still verify important information themselves.",
        points: [
          "Education agencies can help with applications, provider options and general study planning.",
          "For migration advice, students should confirm whether the person is a registered migration agent.",
          "Never rely only on social media comments for course or visa decisions.",
        ],
      },
    ],
  },
  {
    slug: "important-contacts",
    title: "Important Contacts",
    icon: Phone,
    description:
      "Save emergency, health, police, university, accommodation, and safety contacts before you need them.",
    sections: [
      {
        heading: "Emergency contacts",
        summary:
          "Students should save emergency numbers before they need them, especially if they are new to Australia.",
        points: [
          "Emergency: 000 for police, fire or ambulance.",
          "Police Assistance Line: 131 444 for non-urgent police help.",
          "Keep your address, nearest landmark and emergency contact details saved on your phone.",
        ],
        studentTips: [
          "Save your full address in your phone notes.",
          "Know how to explain your location clearly in an emergency.",
        ],
      },
      {
        heading: "Health and support",
        summary:
          "Knowing where to go for health support can reduce stress when you are sick or injured.",
        points: [
          "Know where the nearest GP clinic, pharmacy and hospital are before you get sick.",
          "International students should understand OSHC coverage and appointment costs.",
          "Royal Darwin Hospital is the major hospital in Darwin.",
        ],
        studentTips: [
          "Keep your OSHC card or app ready.",
          "Know the closest pharmacy to your accommodation.",
        ],
      },
      {
        heading: "Student support",
        summary:
          "Your education provider can often help with academic, wellbeing and general student support.",
        points: [
          "Save your institution’s student support contact.",
          "Keep copies of passport, visa, CoE, OSHC, lease and emergency contacts.",
          "For accommodation problems, keep written records and ask for help early.",
        ],
      },
    ],
  },
  {
    slug: "things-to-do",
    title: "Things to Do in Darwin",
    icon: Compass,
    description:
      "Discover Darwin beaches, markets, parks, camping spots, wildlife attractions, sunset locations, and weekend activities for students.",
    sections: [
      {
        heading: "Weekend markets and student hangouts",
        summary:
          "Darwin markets are a big part of local lifestyle and are useful for food, socialising and exploring the community.",
        points: [
          "Rapid Creek Markets are popular for tropical fruit, Asian vegetables, affordable breakfast and local community atmosphere.",
          "Mindil Beach Sunset Market is famous for multicultural food, sunset views, music and seasonal events.",
          "Parap Village Markets are popular for local food, fresh produce and weekend mornings.",
        ],
        studentTips: [
          "Check market days before travelling.",
          "Carry water and sun protection.",
          "Go with friends when exploring new places for the first time.",
        ],
      },
      {
        heading: "Sunset and ocean places",
        summary:
          "Darwin has beautiful coastal areas, but students should understand that not every ocean or water area is safe for swimming.",
        points: [
          "Nightcliff Jetty and foreshore are popular for sunset walks, cycling and relaxing.",
          "Darwin Waterfront provides restaurants, lagoon swimming areas, walking paths and city relaxation.",
          "East Point Reserve is peaceful for picnics, nature and ocean views.",
        ],
      },
      {
        heading: "Camping and national parks",
        summary:
          "Weekend trips are popular, but students should check weather, road access and safety warnings before travelling.",
        points: [
          "Litchfield National Park is popular for waterfalls, camping and nature trips.",
          "Berry Springs Nature Park is popular for day trips and outdoor areas.",
          "Always check weather, road access and official safety warnings before travelling during Wet season.",
        ],
        commonMistakes: [
          "Travelling during bad weather without checking road conditions.",
          "Swimming in places without checking safety signs.",
        ],
      },
      {
        heading: "Wildlife and crocodile attractions",
        summary:
          "Wildlife attractions are a safe way to learn about Top End animals, especially crocodiles.",
        points: [
          "Crocosaurus Cove in Darwin CBD helps students safely learn about saltwater crocodiles and Top End reptiles.",
          "Crocodylus Park and Territory Wildlife Park are popular wildlife attractions around Darwin.",
          "Never confuse tourist crocodile attractions with safe swimming in natural waterways.",
        ],
      },
    ],
  },
];

export function getLivingPage(slug: string) {
  return livingPages.find((page) => page.slug === slug);
}