/* ── EDIT YOUR PROJECTS HERE (used by index.html and projects.html) ──
   status: "live" | "wip" | "concept"   |   live: null hides the live button */
const PROJECTS = [
  {
    title: "MarketLink", overview: "A web-based marketplace built to connect farmers directly with customers. It brings products, inventory, orders, farmers and customers into one management system with secure sign-in.", features: ["Product and inventory management", "Order management for customers and farmers", "Farmer and customer management", "Secure authentication with ASP.NET Identity", "SQL Server database accessed through EF Core 8"], sub: "Agricultural Marketplace Management System", category: "ASP.NET Core MVC", year: "2026", status: "live",
    image: "Images/Screenshot 2026-10-15 181148.png",
    description: "A web-based agricultural marketplace connecting farmers with customers: product, inventory, order, farmer and customer management.",
    tech: ["C#", "ASP.NET Core MVC", "EF Core 8", "SQL Server", "Identity"],
    github: "https://github.com/Ali316-web/MarketLink-Agricultural-Marketplace-Management-System", live: "https://sfc-infiniteloop.runasp.net/"
  },
  {
    title: "Give-Aid", overview: "A charity management platform that keeps donations, causes, NGOs and admin operations organized in one centralized system.", features: ["Donation tracking", "Cause and NGO management", "Admin operations panel", "Responsive Bootstrap interface", "SQL Server database accessed through EF Core"], sub: "NGO & Donation Management System", category: "ASP.NET Core MVC", year: "2026", status: "live",
    image: "Images/Screenshot 2026-10-12 221918.png",
    description: "A charity management platform that organizes donations, causes, NGOs and admin operations in one centralized system.",
    tech: ["C#", "ASP.NET Core MVC", "EF Core", "SQL Server", "Bootstrap"],
    github: "https://github.com/Ali316-web/Give-Aid-NGO-Donation-Management-System", live: "https://give-aid-web.runasp.net/"
  },
  {
    title: "LawBridge", overview: "A modern legal assistance platform designed to simplify access to legal information and services. Currently a concept build.", features: ["Simplified access to legal information", "Modern, clean React/TypeScript interface", "JSON-based data handling", "MySQL storage", "Analytics API integration"], sub: "AI-Powered Legal Assistance Platform", category: "React.JS", year: "2026", status: "concept",
    image: "Images/Screenshot 2026-07-27 163631.png",
    description: "A modern legal assistance platform designed to simplify access to legal information and services.",
    tech: ["TypeScript", "JavaScript", "JSON", "MySQL", "Analytics API"],
    github: "https://github.com/Ali316-web/LAW-BRIDGE", live: null
  },
  {
    title: "Luxe Interiors", overview: "A responsive interior design website that showcases elegant home décor, luxury living spaces and design services.", features: ["Fully responsive layout", "Showcase of living spaces and décor", "Design services presentation", "jQuery-powered interactions", "Hosted live on GitHub Pages"], sub: "Interior Design Website", category: "Frontend", year: "2026", status: "live",
    image: "Images/Screenshot 2026-06-06 214849.png",
    description: "A responsive interior design site showcasing elegant home décor, luxury living spaces and design services.",
    tech: ["HTML", "CSS", "JavaScript", "jQuery"],
    github: "https://github.com/Ali316-web/LUXE-INTERIOR", live: "https://ali316-web.github.io/LUXE-INTERIOR/"
  },
  {
    title: "Maria & Jenny", overview: "A responsive fashion e-commerce store focused on a smooth shopping experience across every device.", features: ["Product displays", "Customer reviews", "PHP and MySQL backend", "Email handling with PHPMailer", "Responsive design for mobile and desktop"], sub: "Fashion E-Commerce", category: "Full Stack", year: "2026", status: "concept",
    image: "Images/Screenshot 2026-06-07 151105.png",
    description: "A responsive fashion store with product displays, customer reviews and a modern, smooth shopping experience on every device.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "PHPMailer"],
    github: "https://github.com/Ali316-web/MARIA-JENNY", live: null
  },
  {
    title: "TECHtide", overview: "A dark-themed tech blog covering gadget reviews, built with no frameworks, just HTML, CSS and JavaScript.", features: ["Gadget review articles", "Animated dark UI", "Working contact form", "No frameworks, pure HTML/CSS/JS", "Hosted live on GitHub Pages"], sub: "Dark Tech Blog", category: "Frontend", year: "2026", status: "live",
    image: "Images/Screenshot 2026-06-06 094233.png",
    description: "A dark-themed tech blog with gadget reviews, animated UI and a contact form. No frameworks, just vibes.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Ali316-web/TECHtide", live: "https://ali316-web.github.io/TECHtide/"
  }
];
