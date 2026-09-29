// ------------------------------------------------------------------
// Business details. This is the single source of truth: every phone
// number, email, Instagram link, address and WhatsApp link on the site
// is filled in from here. Edit this file and the whole site updates.
// ------------------------------------------------------------------
const DIVINE_CONFIG = {
  businessName: "Divine Luxury Events & Rentals",
  shortName: "Divine",
  tagline: "Classy Pieces. Memorable Moments.",
  whatsappNumber: "2348104677033", // digits only, country code first
  phones: [
    { display: "0810 467 7033", href: "+2348104677033" },
    { display: "0811 155 5255", href: "+2348111555255" },
  ],
  email: "divineluxury085@gmail.com",
  instagramHandle: "@divineluxuryrentals1",
  instagramUrl: "https://instagram.com/divineluxuryrentals1",
  addressLines: [
    "Grace Arena Plaza No 14,",
    "Yesufu Abiodun Road, off Atlantic Beach Estate,",
    "Victoria Island, Lagos",
  ],
};

const buildWhatsAppUrl = (msg) =>
  `https://wa.me/${DIVINE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
