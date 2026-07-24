import { Service, Project, Testimonial } from './types';

export const services: Service[] = [
  {
    id: 'brand-identity',
    title: 'Brand Identity Design',
    description: 'Comprehensive visual systems, strategic style guidelines, typography rules, and logo architectures built to command premium presence and establish lasting credibility.',
    iconName: 'Layers'
  },
  {
    id: 'logo-design',
    title: 'Logo Design',
    description: 'Uniquely crafted, memorable, and strategic marks that act as the ultimate visual anchor of your vision, communicating core identity before a single word is read.',
    iconName: 'Fingerprint'
  },
  {
    id: 'social-media',
    title: 'Social Media Graphics',
    description: 'High-impact templates, announcement cards, and custom graphics designed for digital channels, optimized to command attention in crowded social feeds.',
    iconName: 'Share2'
  },
  {
    id: 'flyers-banners',
    title: 'Flyers & Banners',
    description: 'Premium print-ready and digital event, service, and promotional campaign materials balancing flawless typographic hierarchy with dramatic creative direction.',
    iconName: 'FileText'
  }
];

export const projects: Project[] = [
  {
    id: 'kuvili-coffee',
    title: 'Brand Identity for Kuvili Coffee',
    tagline: 'Premium packaging & visual identity system',
    description: 'A fictional brand identity project exploring packaging, logo, and visual language for a premium coffee brand.',
    longDescription: 'An immersive brand identity exploration for Kuvili Coffee, an imaginary African specialty micro-roaster. This design integrates sleek modernist geometry with warm organic coffee house hues to craft an authentic story of premium artisanal roasting. The central emblem features stylized, geometric coffee beans that form a sophisticated monogram, carried onto elegant, structured packaging pouches, custom stamp seals, and clean visual style rules.',
    deliverables: [
      'Signature Geometric Monogram',
      'Artisanal Coffee Pouch Wrapper (250g/1kg)',
      'Brand Standards & Color Typography Guidelines',
      'Premium Stationery & Packaging Tape Layouts'
    ],
    colors: ['#0A0A0A', '#E67E22', '#F5E6D3', '#2C1D11'],
    tools: ['Adobe Illustrator', 'Adobe Photoshop'],
    interactiveSvgType: 'coffee',
    client: 'Kuvili Coffee (Concept)',
    year: '2025',
    category: 'Brand Identity'
  },
  {
    id: 'book-covers',
    title: 'Book Covers',
    tagline: 'Conceptual visual cover designs',
    description: 'Visual book cover designs that translate written ideas into compelling front-facing imagery.',
    longDescription: 'A premium collection of conceptual book jacket designs tailored for independent authors, educators, and leaders. Treating each book cover as an exquisite art gallery poster, these designs utilize deep-focus shadows, stark abstract symbolism, and strong editorial typography. This combination captures the core thesis of the literature, enabling authors to instantly engage prospective readers and build literary credibility.',
    deliverables: [
      'Hardcover Dust Jacket Wrapper',
      'Paperback Wrap-around (Spine & Back)',
      '3D Realistic Digital Book Mockups',
      'Kindle-Optimized High-Contrast Thumbnails'
    ],
    colors: ['#121212', '#E67E22', '#E2E8F0', '#030712'],
    tools: ['Adobe Illustrator', 'Adobe Photoshop'],
    interactiveSvgType: 'book',
    client: 'Bold Horizon Publishing',
    year: '2024',
    category: 'Book Covers'
  },
  {
    id: 'event-flyers',
    title: 'Event Flyers',
    tagline: 'High-impact promotional graphics',
    description: 'Promotional flyers for youth and community events, designed to capture attention and drive attendance.',
    longDescription: 'A series of high-energy, contemporary event graphics built for youth summits, entrepreneurship seminars, and community masterclasses. These assets employ bold, high-contrast typography, radiant orange focal points, textured background overlays, and layered physical design elements. This establishes a modern, fast-paced aesthetic that speaks directly to Enugu\'s creative youth demographic, driving attendance through outstanding visual urgency.',
    deliverables: [
      'Interactive Speaker Highlight Templates',
      'Dynamic Countdown Series',
      'High-Resolution A0 Event Posters',
      'Digital Attendee Pass Designs'
    ],
    colors: ['#050505', '#E67E22', '#F3F4F6', '#1A1A1A'],
    tools: ['Adobe Photoshop', 'PixelLab'],
    interactiveSvgType: 'event',
    client: 'NextGen Creative Hub',
    year: '2025',
    category: 'Event Flyers'
  },
  {
    id: 'church-flyers',
    title: 'Church Flyers',
    tagline: 'Service & Event Flyer systems',
    description: 'Event and service flyers designed for church programs, balancing clarity with spiritual tone.',
    longDescription: 'A curated collection of typographic-heavy, atmospheric flyer series created for ministries and religious gatherings. The design philosophy centers on strategic visual hierarchy—using dramatic light overlays, deep mysterious gradients, and modern layout layouts. Each asset is engineered to communicate theological narratives visually, ensuring critical information like scripture references, event dates, and keynote speakers are instantly legible and high-contrast.',
    deliverables: [
      'Sermon Series Key Visuals',
      'Social Broadcast Banners (16:9)',
      'Instagram Story & Feed Formats (1:1, 4:5)',
      'Print-ready Program Handouts'
    ],
    colors: ['#0A0B10', '#E67E22', '#FFFFFF', '#242B3D'],
    tools: ['Adobe Photoshop', 'PixelLab'],
    interactiveSvgType: 'church',
    client: 'Enugu Grace Assemblies',
    year: '2025',
    category: 'Church Flyers'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: "Emmanuel's visual identity for Kuvili Coffee completely transformed how our customers perceive us. He translated our vision into a sleek, premium brand that commands instant attention.",
    author: "Kuvili Brand Team",
    role: "Founders",
    organization: "Kuvili Coffee Roasters",
    rating: 5,
    projectAssociated: "Brand Identity Design"
  },
  {
    id: '2',
    quote: "Working with Emmanuel on our church program flyer series was seamless. His ability to balance spiritual depth with ultra-modern typography resulted in our highest event turnout to date.",
    author: "Pastor K. Okafor",
    role: "Lead Pastor",
    organization: "Enugu Grace Assemblies",
    rating: 5,
    projectAssociated: "Church Flyers & Visual Systems"
  },
  {
    id: '3',
    quote: "The book cover Emmanuel created was nothing short of a masterpiece. It stands out dramatically on digital stores and perfectly captures the heart of the message before a page is turned.",
    author: "Chidi N. Horizon",
    role: "Author & Publisher",
    organization: "Bold Horizon Publishing",
    rating: 5,
    projectAssociated: "Book Cover Design"
  },
  {
    id: '4',
    quote: "Our youth summit posters designed by Emmanuel were everywhere across social media. His sharp, strategic visual hierarchy drives real action and attendance.",
    author: "Adaora E.",
    role: "Community Director",
    organization: "NextGen Creative Hub",
    rating: 5,
    projectAssociated: "Event Flyers"
  }
];

export const tools: string[] = [
  'Adobe Photoshop',
  'Adobe Illustrator',
  'PixelLab'
];
