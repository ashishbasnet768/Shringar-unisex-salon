const menHaircutFadeImg = '67463_28f7b644.png';
const menBeardTrimImg = '15709_1f94c832.png';
const menCleanShaveImg = '6920_395ac92d.png';
const menScalpCareImg = 'men_scalp_care_1795444911873.jpg';
const beautyThreadingImg = 'beauty_threading_1795444912260.jpg';
const beautyWaxingImg = 'beauty_waxing_1795444912025.jpg';
const beautyBodyWaxingImg = 'beauty_body_waxing_1795445885908.jpg';
const beautyFacialGroomingImg = 'beauty_facial_grooming_1795444912786.jpg';
const facialDeepCleanseImg = 'facial_deep_cleanse_1795444911885.jpg';
const facialGlowRitualImg = 'facial_glow_ritual_1795444912480.jpg';
const facialHydratingCalmImg = 'facial_hydrating_calm_1795444911654.jpg';
const prodCasmaraHydraImg = 'prod_casmara_hydra_1795446118643.jpg';
const prodCasmaraLighteningImg = 'prod_casmara_lightening_1795446119204.jpg';
const prodGkBalancingImg = 'prod_gk_balancing_1795446118485.jpg';
const prodLorealAbsolutImg = 'prod_loreal_absolut_1795446119159.jpg';
const prodLorealInforcerMaskImg = 'prod_loreal_inforcer_mask_1795446119292.jpg';
const prodLorealInforcerShampooImg = 'prod_loreal_inforcer_shampoo_1795446119581.jpg';
const prodPurestCleanserImg = 'prod_purest_cleanser_1795446118704.jpg';
const prodPurestRetinolImg = 'prod_purest_retinol_1795446119139.jpg';
const prodPurestSpf50Img = 'prod_purest_spf50_1795446118940.jpg';

const STUDIO_CATEGORIES = [
  {
    id: 'hair',
    pageUrl: 'hair.html',
    index: '01',
    tags: 'CUT · COLOUR · TREATMENTS · SPA',
    title: 'Hair',
    subtitle: 'Ladies cuts, hair colour, keratin, botox & restorative hair spa',
    description:
      'All types of ladies haircuts, balayage, global colour, keratin, hair botox, nano botox, and L’Oréal hair spa.',
    ctaLabel: 'Explore the hair studio',
    image: 'shringar-campaign_0c203bb4.jpg',
    imagePosition: 'center 20%',
    productsNote: 'Professional hair colour & treatments featuring:',
    productsUsed: [
      'L’Oréal Professionnel',
      'Brazilian Professional Hair Treatment Products',
      'Normal Hair Colour Products',
      'L’Oréal & Protein Hair Spa Care',
    ],
    packages: [],
    services: [
      {
        name: 'Ladies Haircuts & Hairstyling',
        tag: 'CUT · BLOW DRY · HAIRSTYLING',
        detail:
          'All types of ladies haircuts tailored to your face shape, paired with sleek blowouts, hair straightening, ironing, and occasion hairdos.',
        includes: [
          'All Types of Ladies Haircuts & Hair Cut',
          'Blow Dry & Hair Straightening',
          'Hair Ironing',
          'Hairdo & Hairstyling',
          'Party Hairstyles & Special Occasion Hairstyles',
        ],
        image: 'hair-cut_a75ad79a.jpg',
        imagePosition: 'center 20%',
      },
      {
        name: 'Hair Colour & Highlights',
        tag: 'BALAYAGE · GLOBAL · FASHION COLOUR',
        detail:
          'Dimensional highlights, seamless hand-painted balayage, global shades, and fashion hair colours using L’Oréal Professionnel and quality colour lines.',
        includes: [
          'Hair Highlights',
          'Balayage',
          'Global Hair Colour',
          'Fashion Hair Colour',
          'All Types of Hair Colour Services',
        ],
        image: 'hair-colour_3e7faf20.jpg',
        imagePosition: 'center 25%',
      },
      {
        name: 'Keratin, Botox & Protein Treatments',
        tag: 'KERATIN · HAIR BOTOX · NANO BOTOX',
        detail:
          'All types of protein and smoothing hair treatments formulated with Brazilian professional products for lasting silkiness and manageability.',
        includes: [
          'Protein Treatment',
          'Keratin Treatment',
          'Hair Botox',
          'Nano Botox',
          'Hair Straightening',
        ],
        image: 'hair-keratin_f6e77b7c.jpg',
        imagePosition: 'center 18%',
      },
      {
        name: 'Hair Spa & Scalp Nourishment',
        tag: 'NORMAL · L’ORÉAL · PROTEIN SPA',
        detail:
          'Restorative salon hair spa rituals combining relaxing scalp massage, micro-mist steam, and deep conditioning masks.',
        includes: [
          'Normal Hair Spa',
          'L’Oréal Hair Spa',
          'Protein Hair Spa',
        ],
        image: 'hair-spa_93dcee0e.jpg',
        imagePosition: 'center 30%',
      },
    ],
  },
  {
    id: 'men',
    pageUrl: 'men.html',
    index: '02',
    tags: 'CUT · BEARD · SHAVE · STYLING',
    title: 'Men',
    subtitle: 'Men’s haircuts, trendy cuts, beard trimming, designing & clean shaving',
    description:
      'Men’s haircuts, trendy cuts, beard trimming, beard designing, clean shaving, and hair styling — explore the men’s studio.',
    ctaLabel: 'Explore the men studio',
    image: menHaircutFadeImg,
    imagePosition: 'center 25%',
    productsNote: '',
    productsUsed: [],
    packages: [],
    services: [
      {
        name: 'Men’s Haircut & Trendy Haircuts',
        tag: 'CLASSIC CUTS · SKIN FADES · CROPS',
        detail:
          'Precision men’s haircuts and trendy fades tailored to your hair growth pattern for clean structure and effortless upkeep.',
        includes: [
          'Men’s Haircut',
          'Trendy Haircuts & Skin Fades',
          'Tailored Scissor & Clipper Finish',
        ],
        image: menHaircutFadeImg,
        imagePosition: 'center 22%',
      },
      {
        name: 'Beard Trimming & Beard Designing',
        tag: 'SCULPT · RAZOR LINE-UP · CONDITIONING',
        detail:
          'Custom beard trimming and sharp beard designing with clean cheek and neckline shaping.',
        includes: [
          'Beard Trimming',
          'Beard Designing',
          'Precision Line-Up & Conditioning Care',
        ],
        image: menBeardTrimImg,
        imagePosition: 'center 30%',
      },
      {
        name: 'Clean Shaving',
        tag: 'HOT TOWEL · CLASSIC RAZOR',
        detail:
          'Traditional warm-towel prep, rich protective lather, and close razor shave followed by calming post-shave care.',
        includes: [
          'Clean Shaving',
          'Warm Towel Facial Prep',
          'Soothing Aftershave Finish',
        ],
        image: menCleanShaveImg,
        imagePosition: 'center 35%',
      },
      {
        name: 'Hair Styling & Scalp Care',
        tag: 'WASH · MASSAGE · STYLING',
        detail:
          'Refreshing wash, relaxing scalp massage, and polished everyday or occasion hair styling.',
        includes: [
          'Hair Styling',
          'Refreshing Wash & Scalp Massage',
          'Natural Matte or Gloss Finish',
        ],
        image: menScalpCareImg,
        imagePosition: 'center 30%',
      },
    ],
  },
  {
    id: 'makeup',
    pageUrl: 'makeup.html',
    index: '03',
    tags: 'BRIDAL · SANGEET · PARTY · GROOM',
    title: 'Makeup',
    subtitle: 'Bridal, reception, engagement, mehendi, sangeet, party, groom & normal makeup',
    description:
      'Bridal, reception, mehendi, sangeet, engagement, party, groom and normal makeup crafted with Huda Beauty and MAC Cosmetics.',
    ctaLabel: 'Explore the makeup studio',
    image: 'shringar-makeup_0aa98376.jpg',
    imagePosition: 'center 18%',
    productsNote: 'Premium makeup products we use:',
    productsUsed: ['Huda Beauty', 'MAC Cosmetics'],
    packages: [
      {
        name: 'Bridal Package',
        summary: 'Complete heritage bridal makeup, hairstyling, draping, and pre-ceremony touch-up finish.',
      },
      {
        name: 'Groom Package',
        summary: 'Refined camera-ready groom makeup, hair styling, and fresh skin prep for the wedding day.',
      },
      {
        name: 'Mini Package',
        summary: 'Essential party or occasion makeup and hairstyling look tailored for compact celebrations.',
      },
      {
        name: 'All Services Package',
        summary: 'Full studio care bundling pre-event skin, hair, nails, beauty grooming, and event makeup.',
      },
    ],
    services: [
      {
        name: 'Bridal, Reception & Groom Makeup',
        tag: 'BRIDAL · RECEPTION · GROOM',
        detail:
          'All types of wedding artistry — from luminous heritage Bridal Makeup and Reception glam to natural camera-ready Groom Makeup.',
        includes: [
          'Bridal Makeup',
          'Reception Makeup',
          'Groom Makeup',
          'Huda Beauty & MAC Complexion Prep',
        ],
        image: 'makeup-bridal_aa31b99a.jpg',
        imagePosition: 'center 18%',
      },
      {
        name: 'Engagement, Mehendi & Sangeet Makeup',
        tag: 'ENGAGEMENT · MEHENDI · SANGEET',
        detail:
          'Soft romantic radiance, dewy rose tones, and floral-accented hairstyling designed for daylight Mehendi, Engagement, and evening Sangeet.',
        includes: [
          'Engagement Makeup',
          'Mehendi Makeup',
          'Sangeet Makeup',
        ],
        image: 'makeup-engagement_1cb2a6fb.jpg',
        imagePosition: 'center 18%',
      },
      {
        name: 'Party Makeup',
        tag: 'EVENING GLAM · LONG-WEAR',
        detail:
          'High-definition evening glamour featuring sculpted cheeks, crisp liner, lashes, and statement velvet or gloss lips.',
        includes: [
          'Party Makeup',
          'Sculpted Eye & Lash Artistry',
          'Sleek Bun or Evening Waves',
        ],
        image: 'makeup-party_113054ea.jpg',
        imagePosition: 'center 18%',
      },
      {
        name: 'Normal Makeup',
        tag: 'EVERYDAY · NATURAL FINISH',
        detail:
          'Lightweight, breathable complexion balancing with soft brows and a fresh, natural finish for daytime outings and family gatherings.',
        includes: [
          'Normal Makeup',
          'Skin Hydration & Natural Base',
          'Soft Cheek & Lip Tint',
        ],
        image: 'makeup-everyday_1f94b37f.jpg',
        imagePosition: 'center 18%',
      },
    ],
  },
  {
    id: 'nails',
    pageUrl: 'nails.html',
    index: '04',
    tags: 'MANICURE · PEDICURE · EXTENSIONS · ART',
    title: 'Nails',
    subtitle: 'Normal & deluxe manicure/pedicure, gel polish, overlay, extensions & nail art',
    description:
      'All types of nail care services — normal and deluxe manicure & pedicure, gel polish, gel overlay, nail extensions, and nail art.',
    ctaLabel: 'Explore the nails studio',
    image: 'shringar-nails_a86a8e25.jpg',
    imagePosition: 'center center',
    productsNote: '',
    productsUsed: [],
    packages: [],
    services: [
      {
        name: 'Normal & Deluxe Manicure',
        tag: 'CUTICLE CARE · HAND SPA · POLISH',
        detail:
          'Precision nail shaping, gentle cuticle work, exfoliating hand ritual in Deluxe care, and crisp classic polish.',
        includes: [
          'Normal Manicure',
          'Deluxe Manicure',
          'Cuticle Work & Relaxing Hand Massage',
        ],
        image: 'nails-manicure_b4262605.jpg',
        imagePosition: 'center center',
      },
      {
        name: 'Normal & Deluxe Pedicure',
        tag: 'WARM SOAK · FOOT SPA · POLISH',
        detail:
          'Soothing floral foot soak, heel smoothing, relaxing calf massage, and fresh glossy finish.',
        includes: [
          'Normal Pedicure',
          'Deluxe Pedicure',
          'Exfoliating Scrub & Foot Massage',
        ],
        image: 'nails-pedicure_a78b7b32.jpg',
        imagePosition: 'center center',
      },
      {
        name: 'Gel Polish, Gel Overlay & Extensions',
        tag: 'GEL POLISH · OVERLAY · EXTENSIONS',
        detail:
          'Chip-resistant UV gel colour, protective natural nail overlays, and sculpted nail extensions in your preferred length and shape.',
        includes: [
          'Gel Polish',
          'Gel Overlay',
          'Nail Extensions',
        ],
        image: 'nails-gel_d04a53c6.jpg',
        imagePosition: 'center center',
      },
      {
        name: 'Nail Art & Nail Designing',
        tag: 'CUSTOM DESIGNS · BRIDAL · FLORAL',
        detail:
          'Hand-painted florals, delicate chrome or gold-foil accents, and bespoke nail designing for weddings and everyday expression.',
        includes: [
          'Nail Art & Nail Designing',
          'All Types of Nail Care Services',
          'High-Gloss Protective Top Coat',
        ],
        image: 'nails-art_3d85aa8f.jpg',
        imagePosition: 'center center',
      },
    ],
  },
  {
    id: 'beauty',
    pageUrl: 'beauty.html',
    index: '05',
    tags: 'THREADING · WAXING',
    title: 'Beauty',
    subtitle: 'Full face threading and complete body waxing services',
    description:
      'Full face threading and full body, legs, arms, underarms, chest, and back waxing — clean, gentle care.',
    ctaLabel: 'Explore the beauty studio',
    image: beautyThreadingImg,
    imagePosition: 'center 25%',
    productsNote: '',
    productsUsed: [],
    packages: [],
    services: [
      {
        name: 'Full Face Threading',
        tag: 'THREADING SERVICES',
        detail:
          'Gentle organic cotton threading for clean brow framing and smooth, even facial skin without harsh irritation.',
        includes: [
          'Full Face Threading',
          'Eyebrow Shaping & Clean Definition',
          'Soothing Post-Threading Cooling Finish',
        ],
        image: beautyThreadingImg,
        imagePosition: 'center 25%',
      },
      {
        name: 'Upper Lip, Chin & Delicate Touch-Ups',
        tag: 'EXPRESS THREADING CARE',
        detail:
          'Quick, gentle upper lip, chin, and forehead threading finished with calming aloe soothing gel.',
        includes: [
          'Upper Lip & Chin Threading',
          'Forehead & Sideburn Clean-Up',
          'Cooling Botanical Aloe Finish',
        ],
        image: beautyFacialGroomingImg,
        imagePosition: 'center 22%',
      },
      {
        name: 'Full Body, Legs & Arms Waxing',
        tag: 'WAXING SERVICES',
        detail:
          'Hygienic, low-temperature gentle waxing sessions tailored for smooth limbs and full-body comfort.',
        includes: [
          'Full Body Waxing',
          'Full Legs Waxing',
          'Full Arms Waxing',
        ],
        image: beautyBodyWaxingImg,
        imagePosition: 'center center',
      },
      {
        name: 'Underarms, Chest & Back Waxing',
        tag: 'TARGETED WAXING CARE',
        detail:
          'Focused unisex waxing treatments for underarms, chest, and back using calming botanical pre- and post-wax care.',
        includes: [
          'Underarms Waxing',
          'Chest Waxing',
          'Back Waxing',
        ],
        image: beautyWaxingImg,
        imagePosition: 'center center',
      },
    ],
  },
  {
    id: 'facial',
    pageUrl: 'facial.html',
    index: '06',
    tags: 'CLEANSING · FACIALS · SKIN TREATMENTS',
    title: 'Facial',
    subtitle: 'All skin types facials, cleansing & branded skin treatments',
    description:
      'Normal & deep cleansing, fruit, brightening, pigmentation, anti-aging, collagen, detox & oily skin treatments with Casmara, Kanpeki, Lotus & more.',
    ctaLabel: 'Explore the facial studio',
    image: facialGlowRitualImg,
    imagePosition: 'center 25%',
    productsNote: 'Branded facial products available:',
    productsUsed: [
      'Casmara',
      'Kanpeki',
      'Lotus',
      'Aroma Magic',
      'Fruit Facial Products',
      'Skinora Products',
    ],
    packages: [],
    services: [
      {
        name: 'Normal, Deep Cleansing & Oily Skin',
        tag: 'CLEANSING · DETOX · OILY SKIN',
        detail:
          'Purifying cleansing, steam, and pore-balancing rituals designed to clear congestion and refresh oily or tired skin.',
        includes: [
          'Normal Cleansing & Deep Cleansing',
          'Skin Detox Facial',
          'Oily Skin Treatment',
        ],
        image: facialDeepCleanseImg,
        imagePosition: 'center 28%',
      },
      {
        name: 'Normal, Fruit & Brightening Facials',
        tag: 'BRIGHTENING · PIGMENTATION CARE',
        detail:
          'Radiance-focused facials and pigmentation care tailored for dullness, uneven tone, and pre-event glow.',
        includes: [
          'Normal Facial & Fruit Facial',
          'Skin Brightening Facial',
          'Pigmentation Skin Treatment',
        ],
        image: facialGlowRitualImg,
        imagePosition: 'center 25%',
      },
      {
        name: 'Anti-Aging & Collagen Facials',
        tag: 'ANTI-AGING · COLLAGEN · ALL SKIN TYPES',
        detail:
          'Firming botanical massage and collagen-rich masks formulated to deeply hydrate and revitalize skin elasticity.',
        includes: [
          'Anti-Aging Facial',
          'Collagen Facial',
          'All Skin Types Facial & Treatments',
        ],
        image: facialHydratingCalmImg,
        imagePosition: 'center 30%',
      },
    ],
  },
];

const STUDIO_PRODUCTS = [
  {
    brand: 'L’ORÉAL PROFESSIONNEL',
    name: 'Absolut Repair Shampoo',
    image: prodLorealAbsolutImg,
  },
  {
    brand: 'L’ORÉAL PROFESSIONNEL',
    name: 'Inforcer Strengthening Shampoo',
    image: prodLorealInforcerShampooImg,
  },
  {
    brand: 'L’ORÉAL PROFESSIONNEL',
    name: 'Inforcer Professional Mask',
    image: prodLorealInforcerMaskImg,
  },
  {
    brand: 'GK HAIR',
    name: 'Balancing Shampoo & Conditioner',
    image: prodGkBalancingImg,
  },
  {
    brand: 'CASMARA',
    name: 'Hydra Lifting Firming Cream & Serum',
    image: prodCasmaraHydraImg,
  },
  {
    brand: 'CASMARA',
    name: 'Lightening Nutri SPF 50 Cream',
    image: prodCasmaraLighteningImg,
  },
  {
    brand: 'THE PUREST SOLUTIONS',
    name: 'Exfoliating Salicylic Acid Cleanser',
    image: prodPurestCleanserImg,
  },
  {
    brand: 'THE PUREST SOLUTIONS',
    name: '1% Retinol + Ceramide Serum',
    image: prodPurestRetinolImg,
  },
  {
    brand: 'THE PUREST SOLUTIONS',
    name: '50 SPF Mattifier & Oil Control',
    image: prodPurestSpf50Img,
  },
];

const LOOKBOOK_ITEMS = [
  {
    id: 'look-makeup',
    title: 'Soft glam, lasting impressions',
    category: 'MAKEUP & BRIDAL',
    image: 'WhatsApp_Image_2026-11-23_at_16.16.11_aa54b829.jpeg',
    imagePosition: 'center 22%',
    tall: false,
    caption: 'Real Shringar client transformations — luminous bridal glow, floral updos, and evening party glam.',
    galleryExtras: [
      {
        src: 'WhatsApp_Image_2026-11-23_at_16.27.09_f5d723aa.jpeg',
        label: 'Bridal Makeup',
      },
      {
        src: 'WhatsApp_Image_2026-11-23_at_16.32.37_e7c24c60.jpeg',
        label: 'Reception & Wedding Glam',
      },
      {
        src: 'WhatsApp_Image_2026-11-23_at_16.16.06_d9d76000.jpeg',
        label: 'Engagement Soft Glam',
      },
      {
        src: 'WhatsApp_Image_2026-11-23_at_16.16.33_bdb8d86f.jpeg',
        label: 'Bridal Studio Look',
      },
      {
        src: 'WhatsApp_Image_2026-11-23_at_16.28.16_c98a3709.jpeg',
        label: 'Party Makeup',
      },
    ],
  },
  {
    id: 'look-hair',
    title: 'A good hair day, reimagined',
    category: 'HAIR & STYLING',
    image: '7515_188b5325.png',
    imagePosition: 'center 25%',
    tall: true,
    caption: 'Sunlit balayage waves, layered blowouts, sleek straightening, and floral occasion hairdos crafted in-studio.',
    galleryExtras: [
      {
        src: 'WhatsApp_Image_2026-11-24_at_17.13.52_58b83ee1.jpeg',
        label: 'Balayage Waves & Curls',
      },
      {
        src: 'WhatsApp_Image_2026-11-23_at_16.32.14_fc36dfad.jpeg',
        label: 'Hair Colour & Straightening',
      },
      {
        src: 'WhatsApp_Image_2026-11-23_at_16.29.56_424a39fa.jpeg',
        label: 'Floral Bun Hairstyling',
      },
      {
        src: '43045_029bcbe4.png',
        label: 'Bridal Updo',
      },
      {
        src: 'WhatsApp_Image_2026-11-24_at_17.13.52__1__be7c1828.jpeg',
        label: 'Layered Blowout & Styling',
      },
    ],
  },
  {
    id: 'look-nails',
    title: 'Details worth falling for',
    category: 'NAILS',
    image: '7505_05e4428c.png',
    imagePosition: 'center center',
    tall: false,
    caption: 'Crimson gel sets, sheer nude chrome art, milky ombré nails, and crystal accents crafted in-studio.',
    galleryExtras: [
      { src: '42964_baf2361c.png', label: 'Burgundy & Sheer Chrome Nail Art' },
      { src: '87200_c998f908.png', label: 'Milky Rose Ombré Gel Nails' },
      { src: '7258_6486f1bf.png', label: 'Classic Crimson Gel Manicure' },
      { src: 'nails-pedicure_a78b7b32.jpg', label: 'Normal & Deluxe Pedicure' },
      { src: '59975_9594b83e.png', label: 'Cute Nails' },
    ],
  },
  {
    id: 'look-men',
    title: 'Sharp fades, effortless craft',
    category: 'MEN’S HAIR & GROOMING',
    image: menHaircutFadeImg,
    imagePosition: 'center 22%',
    tall: false,
    caption: 'Precision skin fades, textured crops, blonde toning, beard designing, and warm-towel grooming.',
    galleryExtras: [
      { src: '14855_ef121487.png', label: 'Platinum Textured Fade' },
      { src: menBeardTrimImg, label: 'Beard Trimming & Designing' },
      { src: menCleanShaveImg, label: 'Warm Towel Clean Shaving' },
      { src: menScalpCareImg, label: 'Hair Styling & Scalp Care' },
    ],
  },
];

const TIME_SLOTS = [
  '10:00 AM',
  '11:30 AM',
  '01:00 PM',
  '02:30 PM',
  '04:00 PM',
  '05:30 PM',
  '07:00 PM',
];

const SALON_WHATSAPP_NUMBER = '9779818565297';
const SALON_WHATSAPP_DISPLAY = '+977-9818565297';

const SALON_LOCATION = {
  name: 'Shringar Unisex Salon & Makeup Studio',
  lat: 27.6932626,
  lng: 85.3688654,
  coordsLabel: '27.693263° N, 85.368865° E',
  mapsUrl:
    'https://www.google.com/maps/place/Shringar+unisex+salon+%26+Make-up+Studio/@27.6932626,85.3688654,17z/data=!3m1!4b1!4m6!3m5!1s0x39eb1b001f20bdad:0xd8fcc2e0f1a87e5a!8m2!3d27.6932626!4d85.3688654!16s%2Fg%2F11nvw0dv5b?entry=ttu&g_ep=EgoyMDI2MTExOC4xIKXMDSoASAFQAw%3D%3D',
};

window.SHRINGAR_DATA = {
  STUDIO_CATEGORIES,
  STUDIO_PRODUCTS,
  LOOKBOOK_ITEMS,
  TIME_SLOTS,
  SALON_WHATSAPP_NUMBER,
  SALON_WHATSAPP_DISPLAY,
  SALON_LOCATION,
};
