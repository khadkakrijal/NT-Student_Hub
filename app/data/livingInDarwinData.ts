import {
  AlertTriangle,
  Briefcase,
  Bus,
  CloudRain,
  Compass,
  GraduationCap,
  HeartPulse,
  Landmark,
  MapPin,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Stethoscope,
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
      "A practical introduction to Darwin for new international students, including lifestyle, suburbs, weather, work, transport and student life.",
    sections: [
      {
        heading: "What Darwin is like",
        summary:
          "Darwin is smaller, warmer and more relaxed than major cities like Sydney, Melbourne and Brisbane. It has a strong outdoor lifestyle and a close community feel.",
        points: [
          "Darwin is the capital city of the Northern Territory.",
          "It is multicultural, tropical, relaxed and community-focused.",
          "Students often notice that distances, transport and weather affect daily life more than in bigger cities.",
          "The city has many international communities, including Nepali, Indian, Filipino, Thai, Indonesian, Vietnamese and other multicultural groups.",
          "Darwin has two main seasons: Dry season and Wet season.",
        ],
        studentTips: [
          "Before choosing accommodation, check distance to campus, work, shops and bus routes.",
          "Explore Casuarina, Nightcliff, Coconut Grove, Rapid Creek, Darwin CBD and Palmerston before deciding where to live.",
          "Join student and community groups to settle faster.",
        ],
        commonMistakes: [
          "Choosing the cheapest room without checking transport.",
          "Assuming Darwin buses run like bigger cities.",
          "Underestimating heat, humidity and wet season rain.",
        ],
      },
      {
        heading: "Popular student suburbs",
        points: [
          "Casuarina is popular because of CDU, Casuarina Square, buses and student housing.",
          "Nightcliff is popular for the foreshore, markets, cafes and lifestyle.",
          "Coconut Grove and Rapid Creek are convenient for students who want access to Casuarina and Nightcliff.",
          "Darwin CBD is good for city jobs, restaurants and events, but rent may be higher.",
          "Palmerston can be cheaper but transport time to CDU or CBD can be longer.",
        ],
        studentTips: [
          "Use Google Maps public transport mode before paying bond.",
          "Ask current students about suburb safety, buses and grocery access.",
          "If you do not have a car, choose a suburb with better bus access.",
        ],
      },
      {
        heading: "Student lifestyle",
        points: [
          "Many students work in hospitality, retail, support work, cleaning, admin and events.",
          "Darwin has many outdoor places such as Nightcliff Foreshore, East Point, Waterfront and markets.",
          "Community football, cultural events and student meetups are common.",
          "Dry season is usually the best time for outdoor activities.",
          "Wet season can affect transport, work shifts and weekend plans.",
        ],
      },
    ],
  },

  {
    slug: "bus-routes",
    title: "Bus Routes & Public Transport",
    icon: Bus,
    description:
      "Understand Darwin bus routes, Casuarina Interchange, CDU access, Palmerston travel and transport planning before choosing accommodation.",
    sections: [
      {
        heading: "Why bus routes matter",
        summary:
          "Public transport can strongly affect student life in Darwin. A room may look close on the map but still be difficult without a direct bus.",
        points: [
          "Casuarina Interchange is one of the main transport points for students.",
          "CDU Casuarina students should check routes to Casuarina and the campus area.",
          "Palmerston to CDU or Darwin CBD can take longer, depending on route and time.",
          "Nightcliff, Rapid Creek and Coconut Grove can be convenient if buses match your study or work times.",
          "Late-night or early-morning work shifts may be difficult without a car.",
        ],
        studentTips: [
          "Check bus routes before paying bond.",
          "Search travel time at the exact time you need to go to class or work.",
          "Keep a backup plan for late shifts, wet season rain or missed buses.",
        ],
        commonMistakes: [
          "Only checking car distance instead of public transport distance.",
          "Choosing accommodation far from a bus stop.",
          "Not checking weekend and evening bus frequency.",
        ],
      },
      {
        heading: "Useful transport tools",
        points: [
          "Use Google Maps to check bus routes and walking distance.",
          "Check official Darwinbus or NT Government transport information for timetable updates.",
          "Look for nearby bus stops before inspecting a room.",
          "Save your most used route in your phone.",
          "Allow extra time during rain and storms.",
        ],
      },
      {
        heading: "Transport questions to ask before renting",
        points: [
          "How far is the nearest bus stop?",
          "How long does it take to reach CDU, work and groceries?",
          "Are buses available early morning or late evening?",
          "Is the street safe and well-lit if walking home at night?",
          "Can housemates help with occasional lifts if needed?",
        ],
      },
    ],
  },

  {
    slug: "health-insurance",
    title: "Health Insurance (OSHC)",
    icon: ShieldCheck,
    description:
      "A student-friendly guide to Overseas Student Health Cover, common OSHC providers, GP visits, claims, hospital cover and out-of-pocket costs.",
    sections: [
      {
        heading: "What is OSHC?",
        summary:
          "OSHC means Overseas Student Health Cover. Most international students must maintain valid OSHC while holding a student visa.",
        points: [
          "OSHC helps cover some medical costs while studying in Australia.",
          "Most student visa holders must keep OSHC active for the full visa period.",
          "Your OSHC provider may be Bupa, NIB, Medibank, Allianz Care or another approved provider.",
          "OSHC does not mean every medical service is free.",
          "Always check your policy details before booking treatment.",
        ],
        studentTips: [
          "Download your OSHC provider app.",
          "Keep your OSHC membership number saved.",
          "Ask clinics if they can process OSHC directly.",
        ],
        commonMistakes: [
          "Thinking OSHC covers everything.",
          "Not checking whether a clinic accepts your OSHC provider.",
          "Forgetting to renew OSHC if visa or course dates change.",
        ],
      },
      {
        heading: "What OSHC may cover",
        points: [
          "Some GP doctor visits.",
          "Emergency hospital treatment.",
          "Some prescription medicines.",
          "Some medical tests and pathology.",
          "Hospital admission depending on policy conditions.",
        ],
      },
      {
        heading: "What may not be fully covered",
        points: [
          "Dental treatment is usually not included in basic OSHC.",
          "Glasses and contact lenses may not be covered.",
          "Physiotherapy may not be included.",
          "Specialist appointments may require referrals and extra payment.",
          "Some medicines may only be partly covered.",
        ],
        studentTips: [
          "Ask the clinic about fees before the appointment.",
          "Keep receipts if you need to claim later.",
          "Check your OSHC app or website before visiting a provider.",
        ],
      },
      {
        heading: "Popular OSHC providers",
        points: [
          "Bupa OSHC.",
          "NIB OSHC.",
          "Medibank OSHC.",
          "Allianz Care Australia.",
          "ahm OSHC.",
        ],
      },
    ],
  },

  {
    slug: "medical-clinics",
    title: "Medical Clinics & GP Services",
    icon: Stethoscope,
    description:
      "Learn how to visit a doctor in Darwin, what to bring, how GP fees work, and what to check before booking an appointment.",
    sections: [
      {
        heading: "What is a GP?",
        summary:
          "A GP is a general practitioner. For most non-emergency health problems, students should usually start with a GP appointment.",
        points: [
          "GPs help with common sickness, medical certificates, referrals, vaccinations and basic health advice.",
          "You may need a GP referral before seeing a specialist.",
          "Some clinics may charge upfront, even if you have OSHC.",
          "Some clinics may offer direct billing with selected OSHC providers.",
          "For emergencies, call 000 or go to hospital emergency services.",
        ],
        studentTips: [
          "Bring your OSHC card or app.",
          "Bring passport, student ID or other photo ID.",
          "Ask about consultation fees before booking.",
        ],
      },
      {
        heading: "Clinics students may check",
        points: [
          "CDU Medical Centre if available for your campus or student access.",
          "Casuarina medical centres and GP clinics.",
          "Nightcliff GP clinics.",
          "Palmerston GP clinics.",
          "Darwin CBD medical clinics.",
          "Royal Darwin Hospital for emergency or major hospital care.",
        ],
        commonMistakes: [
          "Going to hospital emergency for minor issues that a GP can handle.",
          "Not checking clinic fees before booking.",
          "Forgetting to bring OSHC details.",
        ],
      },
      {
        heading: "When to see a GP",
        points: [
          "Cold, flu, fever or infection symptoms.",
          "Medical certificates for work or study.",
          "Mental health support and referrals.",
          "Injuries that are not life-threatening.",
          "Vaccinations or prescription renewals.",
          "Referrals for specialists or tests.",
        ],
      },
    ],
  },

  {
    slug: "health",
    title: "Student Health & Wellbeing",
    icon: HeartPulse,
    description:
      "Simple health, wellbeing and mental health advice for students adjusting to Darwin’s climate, study pressure and new lifestyle.",
    sections: [
      {
        heading: "Physical health in Darwin",
        points: [
          "Drink enough water because Darwin can be hot and humid.",
          "Use sunscreen, sunglasses and a hat when outdoors.",
          "Avoid walking long distances in extreme heat if possible.",
          "Keep basic medicines such as pain relief, cold medicine and first-aid items.",
          "Sleep properly, especially during exam and work-heavy weeks.",
        ],
        studentTips: [
          "Carry a water bottle daily.",
          "Use mosquito protection during Wet season.",
          "Keep your room clean and ventilated to avoid mould problems.",
        ],
      },
      {
        heading: "Mental health and homesickness",
        points: [
          "It is normal to feel lonely, stressed or homesick after moving to a new country.",
          "Stay connected with friends and family, but also build local friendships.",
          "Use university counselling or student support services early.",
          "Balance work, study, football, social life and rest.",
          "Ask for help before stress becomes overwhelming.",
        ],
        studentTips: [
          "Join community events or sports teams.",
          "Talk to trusted friends when you feel stressed.",
          "Do not isolate yourself for long periods.",
        ],
      },
      {
        heading: "Healthy student habits",
        points: [
          "Cook at home more often to save money and eat healthier.",
          "Exercise regularly, even simple walking or football helps.",
          "Keep a weekly routine for study, work, cleaning and shopping.",
          "Avoid taking too many shifts during assessment periods.",
          "Book medical appointments early when symptoms continue.",
        ],
      },
    ],
  },

  {
    slug: "banking-and-tfn",
    title: "Banking & Tax File Number",
    icon: Landmark,
    description:
      "A practical guide to opening a bank account, applying for a Tax File Number, getting paid legally and preparing for work in Australia.",
    sections: [
      {
        heading: "Opening a bank account",
        points: [
          "Popular banks include Commonwealth Bank, ANZ, NAB and Westpac.",
          "You usually need your passport, visa details, Australian address and phone number.",
          "Some banks allow students to start the process online before visiting a branch.",
          "Choose a bank with nearby branches or ATMs if you prefer in-person support.",
          "Set up online banking and keep your login details secure.",
        ],
        studentTips: [
          "Open your account soon after arriving.",
          "Use a strong password and do not share banking codes.",
          "Be careful with scam calls asking for bank details.",
        ],
      },
      {
        heading: "Tax File Number (TFN)",
        points: [
          "A TFN is needed when you start working in Australia.",
          "You can apply through the Australian Taxation Office website.",
          "Applying for a TFN is free.",
          "Give your TFN only to your employer, bank or official government services when needed.",
          "Do not share your TFN casually with friends, agents or unknown people.",
        ],
        commonMistakes: [
          "Paying someone to apply for a TFN even though it is free.",
          "Sharing TFN screenshots in group chats.",
          "Starting work without understanding payslips and tax.",
        ],
      },
      {
        heading: "Getting paid correctly",
        points: [
          "Most employers pay wages into your bank account.",
          "Check payslips for hourly rate, tax, hours and superannuation.",
          "Keep records of shifts and payments.",
          "Ask questions if your pay does not match your hours.",
          "Avoid cash jobs that seem unsafe, unfair or illegal.",
        ],
      },
    ],
  },

  {
    slug: "cost-of-living",
    title: "Cost of Living",
    icon: Wallet,
    description:
      "Plan rent, bond, groceries, transport, phone, OSHC, car costs and emergency savings before moving into accommodation.",
    sections: [
      {
        heading: "Accommodation costs",
        points: [
          "Rent is usually the biggest weekly cost for students.",
          "Private rooms may cost more than shared rooms.",
          "Bond is often required before moving in.",
          "Ask whether electricity, water, internet and furniture are included.",
          "A cheaper room can become expensive if transport is difficult.",
        ],
        studentTips: [
          "Confirm bills in writing before paying.",
          "Inspect the room or ask for a video inspection.",
          "Keep screenshots of rent, bond and agreement messages.",
        ],
      },
      {
        heading: "Weekly living expenses",
        points: [
          "Groceries, phone plan, transport, medicines, work clothes and study supplies should be included in your budget.",
          "Cooking at home usually saves money compared to takeaway.",
          "Markets and weekly supermarket specials can reduce grocery costs.",
          "If you own a car, budget for fuel, registration, insurance, servicing and repairs.",
          "Keep emergency savings if possible.",
        ],
      },
      {
        heading: "Budget mistakes",
        points: [
          "Only calculating rent and forgetting bond.",
          "Not budgeting for OSHC, phone, transport and food.",
          "Buying a car without planning repair costs.",
          "Taking too many work shifts and affecting study performance.",
          "Spending too much during the first month after arrival.",
        ],
      },
    ],
  },

  {
    slug: "education",
    title: "Education & Universities",
    icon: GraduationCap,
    description:
      "Understand CDU campuses, private colleges, CRICOS checks, education agents, student support and choosing accommodation based on campus location.",
    sections: [
      {
        heading: "Charles Darwin University",
        points: [
          "CDU Casuarina is one of Darwin’s major education locations.",
          "CDU also has city campus facilities.",
          "Students should check their exact campus before choosing accommodation.",
          "Travel time can be different depending on whether classes are at Casuarina or city campus.",
          "Use student support services for academic, wellbeing and enrolment help.",
        ],
        studentTips: [
          "Check your timetable before finalising accommodation.",
          "Save your student support contact details.",
          "Attend orientation if available.",
        ],
      },
      {
        heading: "Private colleges and providers",
        points: [
          "Darwin has different education and training providers.",
          "Students should check CRICOS registration before enrolling.",
          "Confirm campus address, delivery mode, fees, intake dates and refund rules.",
          "Keep copies of offer letter, CoE, payment receipts and visa documents.",
          "Ask questions before signing or paying.",
        ],
      },
      {
        heading: "Education agents",
        points: [
          "Education agents can help with applications and provider information.",
          "For migration advice, check whether the person is a registered migration agent.",
          "Do not rely only on social media comments for course or visa decisions.",
          "Compare official provider information with what an agent tells you.",
          "Keep written records of advice and payments.",
        ],
      },
    ],
  },

  {
    slug: "jobs",
    title: "Jobs & Employment",
    icon: Briefcase,
    description:
      "Understand student work opportunities, seasonal competition, backpackers and realistic expectations for finding casual or part-time work.",
    sections: [
      {
        heading: "Common student jobs",
        points: [
          "Hospitality: kitchen hand, waiter, barista, food and beverage attendant.",
          "Retail: supermarkets, stock work, customer service and shopping centre jobs.",
          "Support work: aged care, disability support and community services.",
          "Cleaning: offices, hotels, schools and commercial cleaning.",
          "Events: event staff, setup, ticketing and customer service.",
          "Admin: reception, data entry and student-facing support roles.",
        ],
        studentTips: [
          "Make a simple one-page resume.",
          "Prepare clear weekly availability.",
          "Apply to multiple industries instead of only one job type.",
        ],
        commonMistakes: [
          "Using the same resume for every job.",
          "Not answering phone calls after applying.",
          "Saying you are available anytime but later refusing shifts.",
        ],
      },
      {
        heading: "Dry season and Wet season work",
        points: [
          "Dry season may create more work in tourism, hotels, restaurants and events.",
          "Backpackers and working holiday makers also compete for seasonal jobs.",
          "Wet season may slow some tourism work but local services still operate.",
          "Retail, cleaning, support work and hospitality can continue year-round.",
          "Transport reliability matters when accepting early or late shifts.",
        ],
      },
      {
        heading: "Work rights and safety",
        points: [
          "Check your visa work conditions carefully.",
          "Keep payslips and records of your shifts.",
          "Understand minimum wage and workplace rights.",
          "Do not pay money to get a job.",
          "Be careful with job scams asking for personal documents or upfront payments.",
        ],
      },
    ],
  },

  {
    slug: "food",
    title: "Food & Culture",
    icon: Utensils,
    description:
      "Find student-friendly food, Nepali and Asian groceries, markets, affordable meals and Darwin’s multicultural food culture.",
    sections: [
      {
        heading: "Student food habits",
        points: [
          "Cooking at home is usually cheaper than eating takeaway every day.",
          "Buy rice, lentils, spices and frozen items in bulk when possible.",
          "Share groceries and cooking with trusted housemates.",
          "Plan meals around study and work shifts.",
          "Keep simple emergency food during Wet season storms.",
        ],
      },
      {
        heading: "Markets and groceries",
        points: [
          "Rapid Creek Markets are useful for fruit, vegetables and Asian ingredients.",
          "Parap Markets and Mindil Beach Markets are popular for food and socialising.",
          "Coles, Woolworths and IGA are common supermarket options.",
          "Asian grocery stores can be useful for rice, spices, noodles, sauces and vegetables.",
          "Check opening days and times before travelling to markets.",
        ],
      },
      {
        heading: "Multicultural food culture",
        points: [
          "Darwin has Thai, Vietnamese, Filipino, Indonesian, Indian, Nepali and other multicultural food options.",
          "Community events often include cultural food stalls and shared meals.",
          "Food markets are good places to meet friends and explore Darwin culture.",
          "Eating out is enjoyable but should be balanced with budgeting.",
        ],
      },
    ],
  },

  {
    slug: "shopping",
    title: "Shopping & Daily Essentials",
    icon: ShoppingBag,
    description:
      "Where students can buy groceries, clothing, furniture, electronics, study items and second-hand essentials in Darwin.",
    sections: [
      {
        heading: "Everyday shopping",
        points: [
          "Casuarina Square is one of the main shopping centres used by students.",
          "Darwin CBD has shops, food places and services.",
          "Palmerston has shopping options for students living further south.",
          "Supermarkets include Coles, Woolworths and IGA.",
          "Kmart, Big W and similar stores are useful for basic student essentials.",
        ],
      },
      {
        heading: "Setting up your room",
        points: [
          "Students may need bedding, fan, study lamp, desk items, hangers, storage boxes and kitchen items.",
          "Ask what furniture is included before moving in.",
          "Facebook Marketplace and Gumtree can be useful for second-hand furniture.",
          "Check item condition and transport before buying second-hand goods.",
          "Do not pay deposits for items without verifying the seller.",
        ],
      },
      {
        heading: "Saving money",
        points: [
          "Compare prices before buying large items.",
          "Buy second-hand when safe and practical.",
          "Share some household items with housemates.",
          "Use student discounts where available.",
          "Avoid buying unnecessary items during the first week.",
        ],
      },
    ],
  },

  {
    slug: "transport",
    title: "Transport",
    icon: Bus,
    description:
      "Understand buses, cars, walking, cycling, wet season travel and why transport matters before choosing accommodation.",
    sections: [
      {
        heading: "Public transport basics",
        points: [
          "Darwin has public buses, but frequency depends on route, suburb and time.",
          "Students without cars should prioritise accommodation near useful bus routes.",
          "Always compare travel time to campus, work and groceries.",
          "Weekend and evening services may be different from weekday services.",
          "Rain and storms can delay travel during Wet season.",
        ],
      },
      {
        heading: "Cars and driving",
        points: [
          "A car can help with late shifts, shopping and weekend trips.",
          "Car costs include registration, insurance, fuel, servicing and repairs.",
          "Check registration and condition before buying a used car.",
          "Never drive through floodwater.",
          "Plan parking costs if working or studying in the city.",
        ],
      },
      {
        heading: "Walking and cycling",
        points: [
          "Walking can be practical in some suburbs but difficult in heat or heavy rain.",
          "Cycling may help around some areas but students should check safety and distance.",
          "Carry water if walking or cycling during the day.",
          "Use lights and reflective clothing if cycling at night.",
          "Avoid isolated routes late at night.",
        ],
      },
    ],
  },

  {
    slug: "safety",
    title: "Safety, Cyclones & Crocodiles",
    icon: AlertTriangle,
    description:
      "Important safety information for storms, crocodiles, water, accommodation scams, transport and emergency planning.",
    sections: [
      {
        heading: "Crocodile and water safety",
        points: [
          "Never swim in rivers, creeks, mangroves, floodwater or unknown waterholes unless signs clearly say it is safe.",
          "Follow crocodile warning signs.",
          "Stay away from water edges in risky areas.",
          "Be careful around boat ramps, beaches, mangroves and remote camping areas.",
          "Ask locals or official sources before visiting natural swimming places.",
        ],
        commonMistakes: [
          "Thinking calm water means safe water.",
          "Ignoring warning signs for photos.",
          "Swimming in unknown waterholes without checking official safety information.",
        ],
      },
      {
        heading: "Cyclone and storm preparation",
        points: [
          "Wet season is also cyclone season in northern Australia.",
          "Keep a torch, power bank, water and basic food ready.",
          "Save important documents digitally.",
          "Follow official weather warnings.",
          "Talk with housemates about emergency plans.",
        ],
      },
      {
        heading: "Accommodation and personal safety",
        points: [
          "Inspect rooms where possible before paying.",
          "Avoid paying bond before confirming the host and address.",
          "Keep records of payments and messages.",
          "Use well-lit areas when walking at night.",
          "Report suspicious listings or unsafe behaviour.",
        ],
      },
    ],
  },

  {
    slug: "important-contacts",
    title: "Important Contacts",
    icon: Phone,
    description:
      "Save emergency, health, police, university, accommodation and safety contacts before you need them.",
    sections: [
      {
        heading: "Emergency numbers",
        points: [
          "000 for police, fire or ambulance emergencies.",
          "131 444 for non-urgent police assistance.",
          "Know your full address and nearest landmark.",
          "Save emergency contacts in your phone.",
          "If unsure during a serious emergency, call 000.",
        ],
      },
      {
        heading: "Health and hospital",
        points: [
          "Royal Darwin Hospital is a major hospital in Darwin.",
          "Know your nearest GP clinic and pharmacy.",
          "Keep your OSHC details ready.",
          "Ask about fees before non-emergency appointments.",
          "For urgent medical situations, call 000.",
        ],
      },
      {
        heading: "Student support",
        points: [
          "Save your university or college student support contact.",
          "Keep copies of passport, visa, CoE, OSHC and lease.",
          "Contact your provider early for academic or wellbeing issues.",
          "Ask for help before problems become bigger.",
          "Keep family emergency contacts updated.",
        ],
      },
    ],
  },

  {
    slug: "weather",
    title: "Weather & Seasons",
    icon: CloudRain,
    description:
      "Learn about Darwin’s Dry season, Wet season, storms, humidity, cyclone preparation and how weather affects student life.",
    sections: [
      {
        heading: "Dry Season: May to October",
        points: [
          "Dry season usually has less rain and lower humidity.",
          "It is one of the best times to explore Darwin.",
          "Markets, events, tourism and outdoor activities are busier.",
          "Nights can feel cooler but days are still warm.",
          "Carry water and sun protection.",
        ],
      },
      {
        heading: "Wet Season: November to April",
        points: [
          "Wet season brings humidity, heavy rain, storms and possible cyclones.",
          "Transport and outdoor plans may be affected.",
          "Some roads, parks or swimming areas can close.",
          "Keep basic emergency supplies ready.",
          "Avoid floodwater and follow official weather warnings.",
        ],
      },
      {
        heading: "Student preparation",
        points: [
          "Choose accommodation carefully if you rely on buses.",
          "Keep umbrella, rain jacket or waterproof bag during Wet season.",
          "Protect electronics and documents from rain.",
          "Check weather before long trips.",
          "Stay hydrated in hot and humid weather.",
        ],
      },
    ],
  },

  {
    slug: "things-to-do",
    title: "Things to Do in Darwin",
    icon: Compass,
    description:
      "Discover Darwin beaches, markets, parks, wildlife attractions, sunset locations and weekend activities for students.",
    sections: [
      {
        heading: "Popular student places",
        points: [
          "Nightcliff Foreshore is popular for sunsets, walks and cycling.",
          "Darwin Waterfront has food, lagoon swimming areas and city relaxation.",
          "Mindil Beach Sunset Market is popular during the season.",
          "East Point Reserve is good for nature, picnics and ocean views.",
          "George Brown Botanic Gardens is a peaceful place to relax.",
        ],
      },
      {
        heading: "Markets and food experiences",
        points: [
          "Rapid Creek Markets are popular for tropical fruit and Asian food.",
          "Parap Markets are good for weekend breakfast and local food.",
          "Mindil Beach Markets offer multicultural food and sunset views.",
          "Check market seasons and opening days before travelling.",
          "Go with friends when exploring new places for the first time.",
        ],
      },
      {
        heading: "Weekend trips",
        points: [
          "Litchfield National Park is popular for waterfalls and nature trips.",
          "Berry Springs is popular for day trips.",
          "Kakadu National Park is a major Top End destination.",
          "Check road access and weather before travelling.",
          "Follow crocodile and swimming safety signs.",
        ],
      },
    ],
  },
];

export function getLivingPage(slug: string) {
  return livingPages.find((page) => page.slug === slug);
}
