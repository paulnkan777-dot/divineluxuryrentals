// ------------------------------------------------------------------
// Site content. Each list below is rendered into the page by main.js.
//
// To add an item, copy one object and edit it.
// Photos: every item has `image` and `imageHint`.
//   - image: null      → an elegant placeholder is shown, labelled with imageHint
//   - image: "images/rental-ivory-charger.jpg" → that photo is shown instead
// Optional `alt` describes the photo for screen readers (defaults to the name).
// ------------------------------------------------------------------

const SERVICES = [
  {
    name: "Wedding Rentals",
    description: "Complete rental packages for your wedding day, from ceremony to reception.",
    image: "images/service-wedding-rentals.jpg",
    imageHint: "images/service-wedding-rentals.jpg",
    alt: "A long wedding banquet table dressed in white, lined with pastel florals under crystal chandeliers",
  },
  {
    name: "Party Rentals",
    description: "Rental pieces for birthdays, anniversaries and private celebrations of any size.",
    image: "images/service-party-rentals.jpg",
    imageHint: "images/service-party-rentals.jpg",
    alt: "A birthday celebration setup with a pink and white balloon arch around the cake table",
  },
  {
    name: "Luxury Tablescapes",
    description: "Fully styled table designs, layered from charger to centrepiece for a cohesive look.",
    image: "images/gold-napkin-tablescape.jpg",
    imageHint: "images/gold-napkin-tablescape.jpg",
    alt: "A mirrored gold banquet table set with scalloped white plates, bow-folded gold napkins and crystal glassware",
  },
  {
    name: "Dinnerware & Chargers",
    description: "Fine plates, bowls and charger sets in a range of finishes to suit your table.",
    image: "images/service-dinnerware-chargers.jpg",
    imageHint: "images/service-dinnerware-chargers.jpg",
    alt: "A clear glass charger plate with a gold-beaded rim and a folded white napkin",
  },
  {
    name: "Glassware & Cutlery",
    description: "Crystal glassware and polished cutlery, from everyday sets to statement pieces.",
    image: "images/service-glassware-cutlery.jpg",
    imageHint: "images/service-glassware-cutlery.jpg",
    alt: "Wine glasses and polished cutlery set on a white-clothed dining table",
  },
  {
    name: "Tables & Chairs",
    description: "Dining tables and seating in a range of styles, sized to fit your guest list.",
    image: "images/service-tables-chairs.jpg",
    imageHint: "images/service-tables-chairs.jpg",
    alt: "A reception hall of round tables in white linen with gold chiavari chairs",
  },
  {
    name: "Centrepieces & Floral Styling",
    description: "Floral arrangements and decorative centrepieces designed to anchor each table.",
    image: "images/service-centrepieces-floral.jpg",
    imageHint: "images/service-centrepieces-floral.jpg",
    alt: "A low arrangement of white and pink roses as a table centrepiece beside wine glasses",
  },
  {
    name: "Event Setup",
    description: "On-site styling and setup, so every table is ready before your guests arrive.",
    image: "images/service-event-setup.jpg",
    imageHint: "images/service-event-setup.jpg",
    alt: "An outdoor event space with draped fabric canopies over dressed round tables",
  },
];

// Filter chips for the rental collection. `id` must match each rental's `category`.
const RENTAL_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "dinnerware", label: "Dinnerware" },
  { id: "glassware", label: "Glassware" },
  { id: "cutlery", label: "Cutlery" },
  { id: "tables-chairs", label: "Tables & Chairs" },
  { id: "linens", label: "Linens" },
  { id: "centrepieces", label: "Centrepieces" },
  { id: "decor", label: "Decor" },
  { id: "tea-coffee", label: "Tea & Coffee" },
];

const RENTALS = [
  {
    category: "dinnerware",
    name: "Ivory Charger Plate",
    description: "A wide-rimmed charger in soft ivory, a versatile base for any table setting.",
    image: "images/rental-ivory-charger.jpg",
    imageHint: "images/rental-ivory-charger.jpg",
    alt: "An ivory place setting on a clear beaded charger plate with a folded napkin and gold cutlery",
  },
  {
    category: "dinnerware",
    name: "Classic White Dinner Set",
    description: "Plate, side plate and bowl in a clean white finish.",
    image: "images/rental-white-dinner-set.jpg",
    imageHint: "images/rental-white-dinner-set.jpg",
    alt: "A white dinner plate, side plate and bowl stacked together",
  },
  {
    category: "glassware",
    name: "Crystal Wine Goblet",
    description: "A faceted crystal glass for red or white wine service.",
    image: "images/rental-crystal-wine-goblet.jpg",
    imageHint: "images/rental-crystal-wine-goblet.jpg",
    alt: "A cut-crystal goblet with a faceted pattern",
  },
  {
    category: "glassware",
    name: "Champagne Flute",
    description: "A slim crystal flute for toasts and celebrations.",
    image: "images/rental-champagne-flute.jpg",
    imageHint: "images/rental-champagne-flute.jpg",
    alt: "Two slim crystal champagne flutes filled with sparkling wine",
  },
  {
    category: "cutlery",
    name: "Gold-Trim Cutlery Set",
    description: "Fork, knife and spoon with a fine gold-trimmed finish.",
    image: "images/rental-gold-trim-cutlery.jpg",
    imageHint: "images/rental-gold-trim-cutlery.jpg",
    alt: "A white-handled fork and knife with gold-finished heads",
  },
  {
    category: "cutlery",
    name: "Classic Silver Cutlery Set",
    description: "Polished silver-finish cutlery for a timeless table.",
    image: "images/rental-silver-cutlery.jpg",
    imageHint: "images/rental-silver-cutlery.jpg",
    alt: "A polished silver spoon, fork and knife",
  },
  {
    category: "tables-chairs",
    name: "Round Banquet Table",
    description: "A round dining table sized for comfortable group seating.",
    image: "images/rental-round-banquet-table.jpg",
    imageHint: "images/rental-round-banquet-table.jpg",
    alt: "A round banquet table in white linen with a floral centrepiece and candles",
  },
  {
    category: "tables-chairs",
    name: "Wishbone Dining Chair",
    description: "A woven-seat wooden chair with a soft, natural finish.",
    image: "images/rental-wishbone-chair.jpg",
    imageHint: "images/rental-wishbone-chair.jpg",
    alt: "A wooden wishbone chair with a natural woven seat",
  },
  {
    category: "linens",
    name: "Ivory Table Runner",
    description: "A woven table runner in soft ivory, layered over your base linen.",
    image: "images/rental-ivory-runner.jpg",
    imageHint: "images/rental-ivory-runner.jpg",
    alt: "A white woven table runner laid across a wooden dining table",
  },
  {
    category: "linens",
    name: "Velvet Tablecloth",
    description: "A rich velvet cloth for a warmer, more elevated table base.",
    image: "images/rental-velvet-tablecloth.jpg",
    imageHint: "images/rental-velvet-tablecloth.jpg",
    alt: "Soft champagne-coloured velvet fabric draped in folds",
  },
  {
    category: "centrepieces",
    name: "Floral Table Centrepiece",
    description: "A floral arrangement styled to anchor your table.",
    image: "images/rental-floral-centrepiece.jpg",
    imageHint: "images/rental-floral-centrepiece.jpg",
    alt: "A table centrepiece of white hydrangeas, roses and blush blooms",
  },
  {
    category: "centrepieces",
    name: "Candle Cluster Centrepiece",
    description: "Layered pillar candles for a soft, romantic glow.",
    image: "images/rental-candle-cluster.jpg",
    imageHint: "images/rental-candle-cluster.jpg",
    alt: "A cluster of lit ivory pillar candles of different heights",
  },
  {
    category: "decor",
    name: "Gold Napkin Ring",
    description: "A polished gold-finish ring, a finishing touch on folded napkins.",
    image: "images/rental-gold-napkin-ring.jpg",
    imageHint: "images/rental-gold-napkin-ring.jpg",
    alt: "A gold knot napkin ring holding a white linen napkin",
  },
  {
    category: "decor",
    name: "Table Number Stand",
    description: "An elegant stand for guiding guests to their seats.",
    image: "images/rental-table-number-stand.jpg",
    imageHint: "images/rental-table-number-stand.jpg",
    alt: "A table number card reading 'Table 1' among lemons and flowers",
  },
  {
    category: "tea-coffee",
    name: "Classic Tea & Coffee Service",
    description: "Cup, saucer and spoon set for tea or coffee service.",
    image: "images/tea-cup-service.jpg",
    imageHint: "images/tea-cup-service.jpg",
    alt: "Rows of white porcelain cups on saucers, each with a patterned silver teaspoon, laid out on a striped cloth",
  },
  {
    category: "tea-coffee",
    name: "Silver Coffee Pot",
    description: "A polished serving pot for tableside coffee service.",
    image: "images/rental-silver-coffee-pot.jpg",
    imageHint: "images/rental-silver-coffee-pot.jpg",
    alt: "A classic silver coffee pot with a long spout and hinged lid",
  },
];

const TABLESCAPES = [
  {
    name: "Classic Elegance",
    description: "Silver-rimmed china, crystal glassware and soft florals for a timeless, refined table.",
    image: "images/silver-rim-place-setting.jpg",
    imageHint: "images/silver-rim-place-setting.jpg",
    alt: "A place setting of silver-rimmed china on a woven silver charger, with a ringed white napkin and crystal glassware",
  },
  {
    name: "Modern Romance",
    description: "Candlelight, layered blooms and rich tones for an intimate, contemporary feel.",
    image: "images/hero-candlelit-tablescape.jpg",
    imageHint: "images/hero-candlelit-tablescape.jpg",
    alt: "Round reception tables with dark plates on gold chargers, pleated lamps, candles and tall arrangements of autumn-toned roses",
  },
  {
    name: "Luxury Gold",
    description: "Gold accents and crystal detailing for a statement, celebratory table.",
    image: "images/gold-napkin-tablescape.jpg",
    imageHint: "images/gold-napkin-tablescape.jpg",
    alt: "A mirrored gold banquet table set with scalloped white plates, bow-folded gold napkins and crystal glassware",
  },
  {
    name: "Soft & Sophisticated",
    description: "Muted neutrals and gentle textures for a quiet, understated elegance.",
    image: "images/tablescape-soft-sophisticated.jpg",
    imageHint: "images/tablescape-soft-sophisticated.jpg",
    alt: "A neutral table setting with a white plate, blush napkin, white-handled cutlery and dried florals",
  },
  {
    name: "Garden Celebration",
    description: "Natural greens, fresh blooms and light linens for an outdoor, botanical feel.",
    image: "images/tablescape-garden-celebration.jpg",
    imageHint: "images/tablescape-garden-celebration.jpg",
    alt: "An outdoor table in white linen with hydrangea arrangements and white garden chairs",
  },
];

// Filter chips for the gallery. `id` must match each gallery item's `category`.
const GALLERY_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "weddings", label: "Weddings" },
  { id: "dining", label: "Dining" },
  { id: "tablescapes", label: "Tablescapes" },
  { id: "glassware", label: "Glassware" },
  { id: "dinnerware", label: "Dinnerware" },
  { id: "chairs", label: "Chairs" },
  { id: "event-setup", label: "Event Setup" },
  { id: "decor", label: "Decor" },
];

const GALLERY = [
  { category: "weddings", caption: "Wedding Reception Table", image: "images/gallery-wedding-reception-table.jpg", imageHint: "images/gallery-wedding-reception-table.jpg",
    alt: "Round wedding reception tables with gold chairs and blush rose centrepieces" },
  { category: "weddings", caption: "Bridal Table Setting", image: "images/gallery-bridal-table.jpg", imageHint: "images/gallery-bridal-table.jpg",
    alt: "A bride's place setting with a hand-lettered 'Bride' card on a gold charger" },
  { category: "dining", caption: "Private Dinner Table", image: "images/gallery-private-dinner.jpg", imageHint: "images/gallery-private-dinner.jpg",
    alt: "An elegant private dining room with a round table set for dinner beneath a candelabra" },
  { category: "dining", caption: "Evening Dining Setup", image: "images/gallery-evening-dining.jpg", imageHint: "images/gallery-evening-dining.jpg",
    alt: "A long candlelit dinner table with florals down the centre" },
  { category: "tablescapes", caption: "Layered Tablescape Detail", image: "images/gallery-tablescape-detail.jpg", imageHint: "images/gallery-tablescape-detail.jpg",
    alt: "An overhead view of place settings with a greenery runner and tealights" },
  { category: "tablescapes", caption: "Styled Table, Wide View", image: "images/gallery-styled-table-wide.jpg", imageHint: "images/gallery-styled-table-wide.jpg",
    alt: "A long styled banquet table with white linen, glassware and florals" },
  { category: "glassware", caption: "Crystal Glassware Lineup", image: "images/gallery-crystal-glassware.jpg", imageHint: "images/gallery-crystal-glassware.jpg",
    alt: "A group of cut-crystal coupe glasses" },
  { category: "glassware", caption: "Champagne Flute Detail", image: "images/gallery-champagne-flute.jpg", imageHint: "images/gallery-champagne-flute.jpg",
    alt: "Champagne being poured over rows of filled flutes" },
  {
    category: "dinnerware",
    caption: "Cup & Saucer Service",
    image: "images/tea-cup-service.jpg",
    imageHint: "images/tea-cup-service.jpg",
    alt: "Rows of white porcelain cups on saucers, each with a patterned silver teaspoon, laid out on a striped cloth",
  },
  { category: "dinnerware", caption: "Charger Plate Stack", image: "images/gallery-charger-stack.jpg", imageHint: "images/gallery-charger-stack.jpg",
    alt: "Ornate cream plates and saucers layered together, seen from above" },
  { category: "chairs", caption: "Wishbone Chair Row", image: "images/gallery-wishbone-chairs.jpg", imageHint: "images/gallery-wishbone-chairs.jpg",
    alt: "A row of black wishbone chairs around a wooden dining table" },
  { category: "chairs", caption: "Reception Seating", image: "images/gallery-reception-seating.jpg", imageHint: "images/gallery-reception-seating.jpg",
    alt: "Gold chiavari chairs dressed with sheer white fabric and greenery" },
  { category: "event-setup", caption: "Tent Setup in Progress", image: "images/gallery-tent-setup.jpg", imageHint: "images/gallery-tent-setup.jpg",
    alt: "A white stretch tent being set up with rows of chairs on a lawn" },
  { category: "event-setup", caption: "Styling Before Guests Arrive", image: "images/gallery-styling-before-guests.jpg", imageHint: "images/gallery-styling-before-guests.jpg",
    alt: "A stylist arranging flowers on a dining table before an event" },
  { category: "decor", caption: "Floral & Candle Decor", image: "images/gallery-floral-candle-decor.jpg", imageHint: "images/gallery-floral-candle-decor.jpg",
    alt: "Taper candles and red protea florals on an outdoor dining table" },
  { category: "decor", caption: "Napkin & Table Accents", image: "images/gallery-napkin-accents.jpg", imageHint: "images/gallery-napkin-accents.jpg",
    alt: "A folded linen napkin with an autumn leaf on stacked white plates" },
];

const STEPS = [
  {
    title: "Tell Us About Your Event",
    description: "Share your event date, guest count and vision with our team — by phone, WhatsApp or the form below.",
  },
  {
    title: "Choose Your Rentals",
    description: "Pick your pieces from the collection, or let us recommend a set that fits your event.",
  },
  {
    title: "We Prepare & Style",
    description: "Every piece is cleaned, prepared and set up at your venue ahead of your event.",
  },
  {
    title: "Celebrate Your Moment",
    description: "Enjoy your event — we handle collection once everything is done.",
  },
];

const WHY_US = [
  {
    title: "Elegant, Carefully Selected Pieces",
    description: "Every item in the collection is chosen to work well together, from plate to centrepiece.",
  },
  {
    title: "Professional Event Support",
    description: "Our team is on hand from your first enquiry through to event day.",
  },
  {
    title: "Flexible Rental Options",
    description: "Rent exactly what you need, styled to fit weddings, private celebrations and corporate events alike.",
  },
  {
    title: "Attention to Detail",
    description: "From napkin folds to place settings, the small details are never an afterthought.",
  },
  {
    title: "Designed Around Your Vision",
    description: "We work with the mood and colours you already have in mind, rather than a fixed template.",
  },
  {
    title: "Beautiful Event Experiences",
    description: "The goal behind every rental is simple: a table your guests remember.",
  },
];
