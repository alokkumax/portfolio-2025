import { Project, MediaItem } from "@/types";

export const allProjects: Project[] = [
  {
    id: "1",
    slug: "zensu-ecommerce",
    title: "Zensu Ecommerce",
    description:
      "Full-stack ecommerce platform with modern UI/UX, featuring seamless shopping experience, secure payment integration, and comprehensive product management. Built with Next.js for optimal performance, integrated Sanity CMS for content management, and implemented Stripe and Razorpay for flexible payment options. The platform includes advanced features like product filtering, cart management, order tracking, and admin dashboard for inventory control.",
    category: "web-development",
    image: "/images/zensu-ecommerce.jpg",
    images: [],
    media: [], // Will be loaded dynamically via API
    tags: ["Next.js", "Sanity", "Stripe", "Razorpay", "ShadCN", "TypeScript"],
    date: "2024-09-01",
    featured: true,
    link: "https://zensu-next.vercel.app/",
  },
  {
    id: "2",
    slug: "danger-ahead",
    title: "Danger Ahead",
    description:
      "Road-safety portal leveraging Google Maps API to provide real-time hazard alerts, route safety analysis, and accident prevention features for safer navigation. The application allows users to report road hazards, view real-time danger zones, and receive route recommendations based on safety data. Features include interactive map visualization, user-reported incidents, and community-driven safety improvements.",
    category: "web-development",
    image: "/images/danger-ahead-thumbnail.png",
    images: ["/images/danger-ahead-thumbnail.png"],
    media: [], // Will be loaded dynamically via API
    tags: ["React", "Google Maps API", "JavaScript", "Web App"],
    date: "2024-06-15",
    featured: true,
    link: "https://danger-ahead.netlify.app/",
  },
  {
    id: "3",
    slug: "adip-scheme-system",
    title: "ADIP Scheme System",
    description:
      "Centralized system for Government of India's ADIP (Assistance to Disabled Persons) scheme, streamlining disability assistance distribution and management. This comprehensive platform digitizes the entire process from application submission to benefit distribution, reducing processing time and improving accessibility. The system includes features for applicant verification, document management, benefit tracking, and administrative oversight. Winner of Smart India Hackathon 2022, recognizing innovation in government service delivery.",
    category: "web-development",
    image: "/images/adip-scheme-thumbnail.png",
    images: ["/images/adip-scheme-thumbnail.png"],
    media: [
      {
        type: "video",
        url: "/videos/adip-walkthrough.mp4",
      },
    ] as MediaItem[],
    tags: ["Full Stack", "Government", "System Design", "Database"],
    date: "2022-08-15",
    featured: true,
  },
  {
    id: "3a",
    slug: "adip-scheme-system-uiux",
    title: "ADIP Scheme System - UI/UX Design",
    description:
      "Comprehensive UI/UX design for the ADIP Scheme System, focusing on accessibility, user-friendly interfaces, and intuitive navigation for government service delivery. The design emphasizes clarity and ease of use for applicants with disabilities, ensuring the platform is inclusive and accessible. Key design elements include clear information hierarchy, accessible color contrasts, intuitive form layouts, and responsive design patterns. The UI/UX work played a crucial role in making government services more accessible and user-friendly, contributing to the project's success at Smart India Hackathon 2022.",
    category: "ui-ux-design",
    image: "/images/adip-scheme-thumbnail.png",
    images: ["/images/adip-scheme-thumbnail.png"],
    media: [
      {
        type: "image",
        url: "/images/adip-scheme-thumbnail.png",
      },
    ] as MediaItem[],
    tags: ["UI/UX Design", "Accessibility", "Government", "User Research", "Wireframing", "Prototyping"],
    date: "2022-08-15",
    featured: false,
  },
  {
    id: "4",
    slug: "soil-health-analysis",
    title: "Soil Health Analysis App",
    description:
      "Advanced agricultural application delivering comprehensive analysis of 14+ soil properties including pH, nutrient levels, organic matter, and moisture content. The app helps farmers make data-driven decisions to optimize crop yields, reduce fertilizer costs, and improve soil sustainability. Features include soil sample analysis, personalized recommendations, crop compatibility suggestions, and historical tracking. Runner-Up at UNESCO India–Africa Hackathon 2022, highlighting innovation in agricultural technology.",
    category: "mobile-apps",
    image: "/images/soil-health.jpg",
    images: ["/images/soil-health.jpg"],
    tags: ["Mobile App", "Agriculture", "Data Analysis", "IoT"],
    date: "2022-11-20",
    featured: false,
  },
  {
    id: "5",
    slug: "decov-app",
    title: "Decov - Personalized Diet & COVID Care",
    description:
      "Comprehensive app and website providing personalized diet plans and COVID-19 care recommendations. The platform offers tailored nutrition guidance based on individual health profiles, COVID-19 symptom tracking, recovery protocols, and preventive care measures. Features include meal planning, ingredient tracking, health monitoring, and integration with healthcare providers. Finalist at Decov 2020 hackathon, addressing critical health needs during the pandemic.",
    category: "mobile-apps",
    image: "/images/decov.jpg",
    images: ["/images/decov.jpg"],
    tags: ["React Native", "Web App", "Health", "Personalization"],
    date: "2020-12-10",
    featured: false,
  },
  {
    id: "6",
    slug: "food-delivery-system",
    title: "Food Delivery System",
    description:
      "Complete full-stack food delivery platform with real-time order tracking, payment integration, and admin dashboard for restaurant management. The system includes customer-facing web and mobile apps, restaurant management portal, delivery tracking, and comprehensive analytics. Features include menu management, order processing, real-time notifications, multiple payment gateways (Stripe, Razorpay), and delivery partner coordination. Built with Next.js for optimal performance and MongoDB for scalable data management.",
    category: "web-development",
    image: "/images/food-delivery.jpg",
    images: ["/images/food-delivery.jpg"],
    tags: ["Next.js", "MongoDB", "Firebase", "Stripe", "Razorpay"],
    date: "2023-11-01",
    featured: false,
  },
  {
    id: "7",
    slug: "store-management-platform",
    title: "Store Management Platform",
    description:
      "Comprehensive store management solution built during internship at Stolution, USA. Features include real-time inventory management, sales tracking, customer relationship management, and analytics dashboard. The platform enables store owners to monitor stock levels, process transactions, generate reports, and manage staff. Built with Next.js and TypeScript for type safety, integrated REST APIs for backend communication, and Material-UI for a modern, responsive interface.",
    category: "web-development",
    image: "/images/store-management.jpg",
    images: ["/images/store-management.jpg"],
    tags: ["Next.js", "TypeScript", "REST APIs", "MUI", "Dashboard"],
    date: "2022-12-15",
    featured: false,
  },
  {
    id: "8",
    slug: "farm-control-platform",
    title: "Farm Control Platform",
    description:
      "IoT-based farm management prototype developed during internship at Digital Product School, Germany. The platform enables remote monitoring and control of farm operations including irrigation systems, climate control, livestock monitoring, and crop management. Features include real-time sensor data visualization, automated control systems, alert notifications, and historical data analysis. Built with React for the frontend, Node.js and Express for the backend API, and MongoDB for data storage, integrating various IoT sensors and actuators.",
    category: "web-development",
    image: "/images/farm-control.jpg",
    images: ["/images/farm-control.jpg"],
    tags: ["React", "Node.js", "Express", "MongoDB", "IoT"],
    date: "2022-03-20",
    featured: false,
  },
];

export const featuredProjects = allProjects.filter((p) => p.featured);

