export const subBrands = [
  {
    id: "afisac",
    name: "AFISAC",
    tagline: "Sacs macramés artisanaux",
    color: "#008753",
    products: [
      { id: 1, name: "Sac Élégance", price: 25000, description: "Sac macramé tissé à la main, style élégant" },
      { id: 2, name: "Sac Bohème",   price: 18000, description: "Pour les femmes libres et créatives" },
      { id: 3, name: "Sac Royal",    price: 35000, description: "La pièce maîtresse de votre garde-robe" },
      { id: 4, name: "Mini Sac",     price: 15000, description: "Compact et raffiné" },
    ],
  },
  {
    id: "afi-pagne",
    name: "AFI PAGNE",
    tagline: "Teinture & pagnes traditionnels",
    color: "#FCD116",
    products: [
      { id: 5, name: "Pagne Brut",     price: 12000, description: "Pagne naturel teint à la main" },
      { id: 6, name: "Tenue Complète", price: 45000, description: "Ensemble deux pièces en pagne" },
      { id: 7, name: "Couverture",     price: 22000, description: "Couverture en pagne teint" },
    ],
  },
  {
    id: "afi-chaussure",
    name: "AFI CHAUSSURE",
    tagline: "Chaussures artisanales",
    color: "#E8112D",
    products: [
      { id: 8,  name: "Sandales",         price: 22000, description: "Sandales en macramé fait main" },
      { id: 9,  name: "Mocassins",        price: 30000, description: "Mocassins en pagne et macramé" },
      { id: 10, name: "Chaussures Pagne", price: 28000, description: "Chaussures habillées en pagne" },
    ],
  },
  {
    id: "afi-vetement",
    name: "AFI VÊTEMENT",
    tagline: "Vêtements macramé",
    color: "#008753",
    products: [
      { id: 11, name: "Robe Cérémonie", price: 65000, description: "Robe macramé pour grandes occasions" },
      { id: 12, name: "Corsage",        price: 20000, description: "Corsage macramé élégant" },
      { id: 13, name: "Ensemble",       price: 80000, description: "Ensemble complet cérémonie" },
    ],
  },
  {
    id: "afi-tissu",
    name: "AFI TISSU",
    tagline: "Tissus artisanaux au mètre",
    color: "#FCD116",
    products: [
      { id: 14, name: "Faso Dan Fani", price: 15000, description: "Le tissu traditionnel burkinabé" },
      { id: 15, name: "Pagne Teint",   price: 10000, description: "Pagne teint exclusif AFI" },
      { id: 16, name: "Tissu Macramé", price: 25000, description: "Tissu macramé au mètre" },
    ],
  },
  {
    id: "afi-mode",
    name: "AFI MODE",
    tagline: "Accessoires & bijoux",
    color: "#E8112D",
    products: [
      { id: 17, name: "Bracelet", price: 7000,  description: "Bracelet macramé coloré" },
      { id: 18, name: "Collier",  price: 12000, description: "Collier macramé artisanal" },
      { id: 19, name: "Ceinture", price: 9000,  description: "Ceinture macramé tendance" },
    ],
  },
];

export const formations = [
  { id: 1, name: "Macramé-Tricotage", specialties: ["Sacs", "Chaussures", "Vêtements", "Accessoires", "Ameublement"], duration: "1,5 – 3 mois", price: "100 000 – 150 000 FCFA" },
  { id: 2, name: "Teinture de Pagne", specialties: ["Pagne brut", "Tenues", "Revêtements", "Couvertures", "Rideaux"], duration: "1 – 2 mois",   price: "80 000 – 120 000 FCFA" },
  { id: 3, name: "Filière Sésame",    specialties: ["Sauce", "Bouillie", "Chips", "Épices"],                          duration: "1 mois",         price: "50 000 FCFA" },
  { id: 4, name: "Filière Soja",      specialties: ["Bouillie", "Chips", "Sauce", "Épices"],                          duration: "1 mois",         price: "50 000 FCFA" },
];

export const distinctions = [
  { year: 2026, title: "Prix Africain de l'Artisanat le plus populaire", location: "Togo" },
  { year: 2025, title: "Ambassadrice GRAAD GLOBAL",                       location: "Londres" },
  { year: 2024, title: "Lauréate Artisanat Féminin Africain",             location: "Bénin" },
  { year: 2023, title: "Prix Excellence Artisanale",                      location: "Bénin" },
];
