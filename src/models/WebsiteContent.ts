
export interface ContentBlock {
  id: string;
  type: 'hero' | 'text' | 'image' | 'testimonial' | 'features' | 'cta';
  title?: string;
  content?: string;
  imageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
  items?: {
    title?: string;
    content?: string;
    imageUrl?: string;
  }[];
}

export interface WebsiteContent {
  page: string;
  title: string;
  description: string;
  blocks: ContentBlock[];
  updatedAt: Date;
}

// Mock database
export const websiteContent: WebsiteContent[] = [
  {
    page: "home",
    title: "TravelScribe - Your Journey Begins Here",
    description: "Discover amazing travel packages and experiences around the world",
    blocks: [
      {
        id: "home-hero-1",
        type: "hero",
        title: "Explore the World with TravelScribe",
        content: "Discover unforgettable travel experiences tailored to your preferences. From tropical beaches to mountain retreats, we have the perfect vacation package for you.",
        imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&h=600",
        buttonText: "Explore Packages",
        buttonLink: "/packages"
      },
      {
        id: "home-features-1",
        type: "features",
        title: "Why Choose Us",
        items: [
          {
            title: "Expertly Crafted Itineraries",
            content: "Our travel specialists design perfect journeys based on years of experience and local knowledge."
          },
          {
            title: "Personalized Service",
            content: "Every trip is tailored to your preferences, ensuring a unique and memorable experience."
          },
          {
            title: "Best Price Guarantee",
            content: "We promise competitive pricing without compromising on quality or service."
          }
        ]
      },
      {
        id: "home-testimonial-1",
        type: "testimonial",
        content: "TravelScribe made our honeymoon absolutely perfect! The attention to detail and personalized service exceeded our expectations.",
        items: [
          {
            title: "Sarah & James",
            content: "Bali Paradise Escape"
          }
        ]
      }
    ],
    updatedAt: new Date("2023-06-15")
  },
  {
    page: "about",
    title: "About TravelScribe",
    description: "Learn about our story, mission, and dedicated team",
    blocks: [
      {
        id: "about-text-1",
        type: "text",
        title: "Our Story",
        content: "Founded in 2015, TravelScribe began with a simple mission: to create authentic, transformative travel experiences. Our founders, avid travelers themselves, wanted to share their passion for discovery with others through carefully crafted journeys that go beyond typical tourism."
      },
      {
        id: "about-image-1",
        type: "image",
        imageUrl: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=1000&h=600"
      },
      {
        id: "about-text-2",
        type: "text",
        title: "Our Team",
        content: "Our diverse team brings together expertise from across the travel industry. From destination specialists to customer service experts, everyone at TravelScribe shares a passion for travel and a commitment to excellence."
      }
    ],
    updatedAt: new Date("2023-05-28")
  }
];
