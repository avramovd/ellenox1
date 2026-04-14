export interface SmartFeature {
  id: string
  name: string
  description: string
  icon: string
}

export interface TechnicalSpec {
  category: string
  specs: { label: string; value: string }[]
}

export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  price: number
  installationPrice: number
  image: string
  images: string[]
  benefits: {
    title: string
    description: string
    icon: string
  }[]
  smartFeatures: SmartFeature[]
  technicalSpecs: TechnicalSpec[]
  faqs: { question: string; answer: string }[]
}

export const smartCharger: Product = {
  id: "Ellenox -smart-charger",
  name: "Ellenox Smart EV Charger Model 1",
  tagline: "Smart charging for your electric vehicle",
  description:
    "Ellenox Smart EV Charger is Model 1 — a premium intelligent charging station with full connectivity, dynamic load balancing and OCPP compatibility. Control charging from anywhere in the world via our mobile app.",
  price: 495,
  installationPrice: 404,
  image: "/product.webp",
  images: [
    "/product.webp",
    "/ev-charger-installation-garage-clean-setup.jpg",
    "/ev-charger-app-smartphone-display.webp",
    "/ev-charger-rfid-access-control.jpg",
  ],
  benefits: [
    
  ],
  smartFeatures: [
  {
    id: "app",
    name: "Mobile App Control",
    description:
      "Control and monitor charging via the Ellenox mobile app. Set schedules, track energy usage and manage charging remotely.",
    icon: "smartphone",
  },
  {
    id: "rfid",
    name: "RFID Access Control",
    description:
      "Start and stop charging using RFID cards for secure and controlled access.",
    icon: "key-round",
  },
  {
    id: "solar",
    name: "Solar Integration",
    description:
      "Supports solar charging optimisation when connected to a compatible energy system and CT clamp.",
    icon: "sun",
  },
  {
    id: "power",
    name: "Power Management",
    description:
      "Automatically adjusts charging current to prevent overloading your household electrical system.",
    icon: "activity",
  },
  {
    id: "ocpp",
    name: "OCPP 1.6J",
    description:
      "Compatible with OCPP 1.6J for integration with charging management systems and remote control platforms.",
    icon: "plug-zap",
  },
],

  technicalSpecs: [
  {
    category: "Electrical Parameters",
    specs: [
      { label: "Rated Power", value: "7.4 kW (single-phase) / 22 kW (three-phase)" },
      { label: "Rated Voltage", value: "AC220–240V / AC380–415V" },
      { label: "Maximum Current", value: "Max 32A (adjustable 6–32A)" },
      { label: "Frequency", value: "50/60 Hz" },
    ],
  },
  {
    category: "Connector",
    specs: [
      { label: "Connector Type", value: "Type 2" },
    ],
  },
  {
    category: "Protection & Safety",
    specs: [
      { label: "Ingress Protection", value: "IP65 (charger), IP54 (connector)" },
      { label: "Residual Current Protection", value: "AC Type A 30mA + DC 6mA" },
      { label: "Over Current Protection", value: "Supported (max 32A)" },
      { label: "Over / Under Voltage Protection", value: "Supported" },
      { label: "Over Temperature Protection", value: "Supported" },
      { label: "PEN Protection", value: "Supported" },
    ],
  },
  {
    category: "Build & Installation",
    specs: [
      { label: "Material", value: "ABS + PC (Flammability Rating V-0)" },
      { label: "Installation", value: "Wall mounted" },
      { label: "Indicator", value: "LED Light" },
      { label: "Standby Consumption", value: "<10W" },
    ],
  },
  {
    category: "Environment",
    specs: [
      { label: "Operating Temperature", value: "-25°C to +50°C" },
      { label: "Humidity", value: "3% – 95%" },
      { label: "Altitude", value: "<2000m" },
    ],
  },
  {
    category: "Dimensions",
    specs: [
      { label: "Size", value: "330 x 200 x 122 mm" },
    ],
  },
  {
    category: "Certifications",
    specs: [
      { label: "Certifications", value: "CE, UKCA" },
      { label: "Standards", value: "EN 61851, EN 62196" },
    ],
  },
],
  faqs: [
    {
      question: "Is it suitable for my electric vehicle?",
      answer:
        "Yes, the Ellenox  Smart EV Charger is compatible with all electric and plug-in hybrid vehicles equipped with a Type 2 connector, making it suitable for approximately 99% of electric vehicles on the road.",
    },
    {
       question: "What's the difference between 7.4kW and 22kW charging?",
    answer:
      "Model 1 is a 7.4kW single-phase charger. A higher-power option (Turbo 1) will support three-phase 22kW for faster charging, depending on your property’s electrical supply and installation.",
  },
    {
      question: "Can I install the charger outdoors?",
      answer:
        "Yes, the charging station has IP65 protection and is designed for outdoor installation. It withstands rain, snow and extreme temperatures from -25°C to +50°C.",
    },
    {
       question: "Is an internet connection required?",
    answer:
      "Basic charging works without internet. Smart App connectivity requires a stable Wi-Fi signal. For OCPP connectivity, you can use Wi-Fi or LAN. An optional 4G module is available, but it works only with OCPP.",
  },
    {
      question: "How does Dynamic Load Balancing work?",
      answer:
        "The DLB function monitors your home consumption via an additional current transformer and automatically adjusts charging power to avoid overloading the main fuse. For example, if you turn on an electric oven, charging automatically reduces power.",
    },
  ],
}

export function getProduct(): Product {
  return smartCharger
}
