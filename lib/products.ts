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
  name: "Ellenox  Smart EV Charger",
  tagline: "Smart charging for your electric vehicle",
  description:
    "Ellenox  Smart EV Charger is a premium intelligent charging station with full connectivity, dynamic load balancing and OCPP compatibility. Control charging from anywhere in the world via our mobile app.",
  price: 899,
  installationPrice: 299,
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
    name: "Mobile App",
    description:
      "Full control from your smartphone. Start/stop charging, monitor consumption, set schedules and receive real-time notifications. Available for iOS and Android.",
    icon: "smartphone",
  },
  {
    id: "rfid",
    name: "RFID Access Control",
    description:
      "Restrict access to the charging station with RFID cards. Ideal for shared parking or when you want to control who can charge.",
    icon: "key-round",
  },
  {
    id: "solar",
    name: "Solar Charge",
    description:
      "Optimise charging using your solar surplus. Prioritises PV energy to reduce grid usage and lower charging costs (requires compatible inverter/energy meter setup).",
    icon: "sun",
  },
  {
    id: "dlb",
    name: "Dynamic Load Balancing (DLB)",
    description:
      "Intelligent load balancing automatically adjusts charging power based on your home consumption. Prevents overloading your electrical installation.",
    icon: "activity",
  },
  {
    id: "ocpp",
    name: "OCPP 1.6J",
    description:
      "Open communication protocol that allows integration with any charging station management system, energy managers and smart home platforms.",
    icon: "plug-zap",
  },
],

  technicalSpecs: [
    {
      category: "Electrical Parameters",
      specs: [
        { label: "Maximum Power", value: "11kW (3-phase) / 7.4kW (1-phase)" },
        { label: "Input Voltage", value: "230V (1-phase) / 400V (3-phase)" },
        { label: "Maximum Current", value: "16A per phase" },
        { label: "Frequency", value: "50/60 Hz" },
      ],
    },
    {
      category: "Connector & Cable",
      specs: [
        { label: "Connector Type", value: "Type 2 (IEC 62196-2)" },
        { label: "Cable Length", value: "7.5 metres (included)" },
        { label: "Compatibility", value: "All EVs with Type 2 / CCS" },
      ],
    },
    {
      category: "Connectivity",
      specs: [
        { label: "WiFi", value: "802.11 b/g/n (2.4 GHz)" },
        { label: "Ethernet", value: "10/100 Mbps (optional)" },
        { label: "4G/LTE", value: "Built-in module (optional)" },
        { label: "Protocols", value: "OCPP 1.6J, OCPP 2.0.1, Modbus TCP" },
      ],
    },
    {
      category: "Physical Characteristics",
      specs: [
        { label: "Dimensions (WxHxD)", value: "240 x 380 x 140 mm" },
        { label: "Weight", value: "5.8 kg (without cable)" },
        { label: "Protection Rating", value: "IP65 (outdoor installation)" },
        { label: "Operating Temperature", value: "-25°C to +50°C" },
      ],
    },
    {
      category: "Safety & Certifications",
      specs: [
        { label: "Shock Protection", value: "DC 6mA protection, Type A RCD" },
        { label: "Overload Protection", value: "Built-in thermal protection" },
        { label: "Certifications", value: "CE, TÜV Rheinland, IEC 61851-1" },
        { label: "Warranty", value: "5 years" },
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
