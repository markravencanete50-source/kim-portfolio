// Single source of truth for all portfolio content.
// Sourced from Karl Ian Martin C. Cañeda's 2026 résumé.

export const profile = {
  name: "Karl Ian Martin C. Cañeda",
  shortName: "Karl Cañeda",
  title: "Operations Manager",
  tagline: "BPO & KPO Operations Leader",
  // Rotating roles shown under the name in the hero (typewriter cycle).
  roles: [
    "Operations Manager",
    "Contact-Center Operations Leader",
    "Workforce & SLA Strategist",
    "People-First Performance Coach",
    "BPO & KPO Specialist",
  ],
  location: "Tagbilaran City, Bohol, Philippines",
  email: "kimcastillocaneda88@gmail.com",
  phone: "+63 968 873 2315",
  address: "Tagbilaran City, Bohol, Philippines 6300",
  resume: "/Karl-Caneda-Resume.pdf",
  photo: "/karl.jpg",
  intro:
    "I run contact-center operations that hit their numbers without burning out the people who deliver them. Fifteen years across healthcare, telco, financial, and sales accounts — building glide paths, coaching leaders, and turning KPIs and SLAs into daily habits teams can actually keep.",
  about: [
    "Fifteen-plus years inside the operations floor — from taking the first call to running whole sites across healthcare, telco, financial, and sales accounts. That range means I read a P&L and a shrinkage report the same way I read a coaching conversation: as levers on the same outcome.",
    "These days that work is remote and increasingly automated. I pair traditional contact-center frameworks with AI tools and automation platforms — Make.com, Zapier, ChatGPT, Claude — to cut manual workflows, tighten reporting, and keep distributed teams productive. As a Client Success and operations partner, I've built dashboards and standardized SOPs that reduced administrative overhead by 25% and accelerated reporting cycles.",
    "I lead by the numbers without losing the people behind them: attrition held at 4–6%, AHT kept at 480 seconds and below, and SLAs managed at 80–85% to protect coaching and meeting time. Two degrees — Information Technology and Economics — keep me fluent in both the systems and the math behind the floor.",
  ],
};

// Concrete operating benchmarks pulled from the résumé, shown in the About section.
export const benchmarks = [
  { label: "Attrition held", value: "4–6%" },
  { label: "AHT maintained", value: "≤ 480s" },
  { label: "SLA managed", value: "80–85%" },
  { label: "Admin overhead cut", value: "25%" },
];

// Modern toolkit — AI, automation, PM, and CRM platforms from the résumé.
export const toolkit = [
  { group: "AI", items: ["ChatGPT", "Claude", "Gemini", "Copilot"] },
  { group: "Automation", items: ["Make.com", "Zapier", "Pabbly"] },
  { group: "Project Mgmt", items: ["ClickUp", "Asana", "Trello", "Jira", "Teamwork"] },
  { group: "CRM", items: ["HubSpot", "Salesforce", "Capsule"] },
];

export const stats = [
  { value: "15+", label: "Years in BPO & operations" },
  { value: "10+", label: "Global brands served" },
  { value: "5", label: "Industry verticals" },
  { value: "100+", label: "Agents & leaders coached" },
];

// Verticals handled across the career, for the marquee band.
export const verticals = [
  "Healthcare",
  "Telco",
  "Financial",
  "Sales",
  "Retail & Hospitality",
  "Food Delivery Logistics",
  "Technical Support",
];

export const capabilities = [
  {
    title: "Operations Management",
    body: "Own site and account performance end to end — balancing resources, personnel, and competing priorities against objectives without dropping quality standards.",
    points: ["Resource & capacity allocation", "P&L and annual budgeting", "Operational strategy from results"],
  },
  {
    title: "Performance & KPIs",
    body: "Turn KPIs and SLAs into a rhythm the floor can hold. Weekly glide paths for team leaders, real-time AUX/AHT management, and reviews that move the number.",
    points: ["Glide paths & action plans", "Real-time AUX / AHT vs. forecast", "Weekly performance reviews"],
  },
  {
    title: "People & Retention",
    body: "Lower attrition by fixing the environment, not just the metric — teamwork, communication, and real development paths that keep good people on the floor.",
    points: ["Attrition & turnover reduction", "Coaching & mentorship", "Team leadership at scale"],
  },
  {
    title: "Process & Transition",
    body: "Stand up new lines of business and logistics from scratch — forecasting staffing, mapping routes and workflows, and transitioning campaigns into steady production.",
    points: ["New LOB transition", "Staffing forecasts & scheduling", "Workflow & digital-tool adoption"],
  },
];

// Reverse-chronological experience timeline.
export const experience = [
  {
    company: "24Fingers",
    account: "Automation — Remote",
    role: "Automation Specialist",
    period: "May 2026 – Present",
    length: "Current",
    points: [
      "Design and maintain automation sequences in Make.com and Pabbly, troubleshooting integration issues across tools.",
      "Keep Capsule CRM data clean — managing pipelines and organizing contacts.",
      "Execute, schedule, track, and analyze performance within Campaign Manager.",
      "Track deadlines, milestones, and dependencies in Teamwork to prevent bottlenecks.",
      "Provide administrative, documentation, and cross-functional support for remote, distributed projects.",
    ],
  },
  {
    company: "House of Lettings",
    account: "Executive Support — UK",
    role: "Executive Assistant & Operations Coordinator",
    period: "Apr 2026 – Present",
    length: "Current",
    points: [
      "Act as the CEO's primary operational partner across executive priorities and full remote operations.",
      "Built Google Sheets dashboards and standardized SOPs that cut administrative overhead by 25% and accelerated reporting.",
      "Manage a portfolio of 80+ UK property listings across Zoopla, ZooplaPro, OnTheMarket, and Gnomon.",
      "Coordinate vendor scheduling for viewings and maintenance while preparing leasing documentation.",
      "Drove a 30% reduction in tenant-inquiry turnaround via proactive workflows, templated responses, and centralized tracking.",
    ],
  },
  {
    company: "Sagility",
    account: "Healthcare — Provider of Service",
    role: "Operations Manager",
    period: "Jan 2026 – Jun 2026",
    length: "5 mos",
    points: [
      "Reduced attrition by building a floor culture around teamwork, communication, and development.",
      "Allocated resources and personnel across competing priorities while holding performance standards.",
      "Ran weekly performance reviews with constructive, growth-focused feedback.",
      "Lifted efficiency by adopting new digital tools for workflow management.",
      "Authored weekly glide paths for team leaders to follow and hit.",
    ],
  },
  {
    company: "Tech Mahindra — vCustomer",
    account: "Telco",
    role: "Associate Operations Manager",
    period: "Jan 2024 – Jul 2025",
    length: "1 yr 6 mos",
    points: [
      "Cut turnover by improving the day-to-day work environment and development paths.",
      "Raised CSAT by resolving concerns fast and shipping feedback-driven improvements.",
      "Managed a full team to consistent target achievement.",
      "Partnered cross-department to find and implement operational fixes.",
    ],
  },
  {
    company: "Fusion BPO Services",
    account: "Financial",
    role: "Operations Manager",
    period: "Jan 2023 – Jan 2024",
    length: "1 yr",
    points: [
      "Set call-center operational strategy from team results and objectives.",
      "Hit financial targets via performance estimates and annual budgets.",
      "Kept operations healthy by monitoring systems and resolving problems.",
      "Presented monthly and annual action plans and objectives.",
    ],
  },
  {
    company: "Sykes Asia (Sitel Group)",
    account: "Account Management",
    role: "Account Manager (Intern)",
    period: "Nov 2022 – Jan 2023",
    length: "2 mos",
    points: [
      "Managed operational performance against KPIs and SLAs.",
      "Motivated teams through relationship-building and real-time coaching.",
      "Coordinated staffing changes with Workforce Management.",
      "Brought operational depth to partner meetings.",
    ],
  },
  {
    company: "Sykes Asia (Sitel Group)",
    account: "Contact Center",
    role: "Team Lead",
    period: "Jul 2021 – Nov 2022",
    length: "1 yr 4 mos",
    points: [
      "Real-time management of AUX and AHT matched to forecasted call volume.",
      "Coached and developed agents against goals and KPIs.",
      "Directed the day-to-day work of a call-center team.",
    ],
  },
  {
    company: "Fusion BPO Services",
    account: "Sales",
    role: "Team Lead",
    period: "Sep 2020 – Jul 2021",
    length: "10 mos",
    points: [
      "Reported on team performance and key metrics.",
      "Guided and developed team members' skills.",
      "Drove performance and CSAT through motivation and coaching.",
    ],
  },
  {
    company: "UnitedHealth Group — Optum Global Solutions",
    account: "Healthcare",
    role: "SME / Coach",
    period: "Aug 2017 – Sep 2020",
    length: "3 yrs 1 mo",
    points: [
      "Trained and mentored agents, closing knowledge gaps in problem-solving.",
      "Served as escalation point for complex, unusual inquiries.",
      "Built and maintained training materials, FAQs, and troubleshooting guides.",
    ],
  },
  {
    company: "Citius",
    account: "Business Development",
    role: "Business Development Officer",
    period: "Feb 2017 – Jul 2017",
    length: "5 mos",
    points: [
      "Ran prospect meetings and built business presentations defining goals and delivery.",
      "Owned client contact through program implementation and invoicing.",
      "Forecasted staffing and metrics; transitioned new LOBs into production.",
    ],
  },
  {
    company: "Convergys",
    account: "Healthcare",
    role: "Customer Service Representative",
    period: "Jun 2016 – Feb 2017",
    length: "8 mos",
    points: [
      "Healthcare claims analysis.",
      "Provider-services inbound calls.",
    ],
  },
  {
    company: "Delivery 21 / Zomato",
    account: "Food Delivery — Cebu Office",
    role: "Team Leader / Office Manager",
    period: "Dec 2014 – May 2016",
    length: "1 yr 5 mos",
    points: [
      "Built the food-delivery logistics operation for the Cebu site from the ground up.",
      "Forecasted rider counts from order frequency plus corporate accounts (Accenture, Xerox, Convergys, Cognizant, Telstra).",
      "Launched a contract-out rider model to hit advance corporate deliveries and cut budget overrun.",
      "Mapped rider routes and protected the 45-min–1-hr delivery SLA.",
    ],
  },
  {
    company: "Teleperformance",
    account: "Retail & Hospitality",
    role: "Customer Service Representative",
    period: "Oct 2013 – Dec 2014",
    length: "1 yr 2 mos",
    points: [
      "Booked accommodation, events, and promotions for a US hotel & casino.",
    ],
  },
  {
    company: "Concentrix",
    account: "Technical & Sales",
    role: "Technical & Sales Representative",
    period: "Apr 2009 – May 2011",
    length: "2 yrs 1 mo",
    points: [
      "Troubleshot routers, range expanders, and access points.",
      "Sold remote-access services and after-sales devices.",
    ],
  },
];

export const education = [
  {
    degree: "BS Information Technology",
    school: "Southwestern University",
    year: "2012",
  },
  {
    degree: "BA Economics",
    school: "Xavier University – Ateneo de Cagayan",
    year: "2010",
  },
];

export const skills = [
  "Operations Strategy",
  "KPI & SLA Management",
  "Glide Path Planning",
  "AUX / AHT Real-time Mgmt",
  "Attrition Reduction",
  "Workforce Management",
  "Coaching & Mentorship",
  "Budgeting & P&L",
  "Performance Tracking",
  "Cross-functional Delivery",
  "New LOB Transition",
  "Data Entry & Reporting",
  "Calendar Management",
  "Microsoft Office",
  "Customer Service",
];
