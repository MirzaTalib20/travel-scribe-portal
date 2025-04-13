
export interface Package {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  imageUrl: string;
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  faqs: FAQ[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

// Mock database
export const packages: Package[] = [
  {
    id: "1",
    title: "Bali Paradise Escape",
    description: "Experience the beautiful beaches and vibrant culture of Bali on this 7-day adventure.",
    price: 1299,
    duration: "7 days",
    location: "Bali, Indonesia",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&h=500",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Denpasar",
        description: "Welcome to Bali! Transfer to your beach resort and enjoy a welcome dinner.",
        activities: ["Airport pickup", "Hotel check-in", "Welcome dinner"]
      },
      {
        day: 2,
        title: "Ubud Cultural Tour",
        description: "Explore the cultural heart of Bali with visits to temples and art villages.",
        activities: ["Temple visit", "Art market", "Traditional dance performance"]
      }
    ],
    inclusions: ["Hotel accommodation", "Daily breakfast", "Airport transfers", "Guided tours"],
    exclusions: ["International flights", "Travel insurance", "Personal expenses"],
    faqs: [
      {
        question: "What's the best time to visit Bali?",
        answer: "The best time to visit Bali is during the dry season from April to October."
      },
      {
        question: "Do I need a visa?",
        answer: "Many countries receive a 30-day visa on arrival, but please check your country's specific requirements."
      }
    ],
    featured: true,
    createdAt: new Date("2023-05-15"),
    updatedAt: new Date("2023-06-10")
  },
  {
    id: "2",
    title: "Thailand Adventure",
    description: "Discover the wonders of Thailand from bustling Bangkok to serene beaches.",
    price: 1499,
    duration: "10 days",
    location: "Thailand",
    imageUrl: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&h=500",
    itinerary: [
      {
        day: 1,
        title: "Bangkok Arrival",
        description: "Arrive in Bangkok and transfer to your hotel in the city center.",
        activities: ["Airport pickup", "Hotel check-in", "Evening at leisure"]
      },
      {
        day: 2,
        title: "Bangkok City Tour",
        description: "Explore the magnificent Grand Palace and temples of Bangkok.",
        activities: ["Grand Palace visit", "Wat Pho tour", "Canal boat ride"]
      }
    ],
    inclusions: ["Hotel accommodation", "Daily breakfast", "Transportation", "English-speaking guide"],
    exclusions: ["International flights", "Optional activities", "Tips"],
    faqs: [
      {
        question: "Is Thailand safe for tourists?",
        answer: "Thailand is generally considered safe for tourists, but always exercise normal precautions."
      },
      {
        question: "What currency is used in Thailand?",
        answer: "The Thai Baht (THB) is the local currency."
      }
    ],
    featured: false,
    createdAt: new Date("2023-04-20"),
    updatedAt: new Date("2023-04-22")
  }
];
