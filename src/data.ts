export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  type: string;
  location: string;
  responsibilities: string[];
}

export interface Project {
  name: string;
  category: string;
  technologies: string;
  description: string;
  link: string;
  image?: string;
  highlights: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  description: string;
  skills: string[];
  badge_url: string;
  icon: string;
}

export interface Achievement {
  title: string;
  description: string;
  year: string;
  icon: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  score: string;
  description: string;
}

export interface Skill {
  name: string;
  level: number;
}

export const data = {
  personal: {
    name: "Soham Manish Sawalakhe",
    firstName: "Soham",
    lastName: "Sawalakhe",
    title: "Software Developer | AI/ML Engineer | Full Stack Developer",
    tagline: "Computer Engineering Student | AI/ML Enthusiast | Building Innovative Solutions",
    about: "Hello! I'm Soham, a passionate Software Developer and Computer Engineering student based in Amravati, Maharashtra. I specialize in building innovative solutions using cutting-edge technologies like Python, AI/ML, and modern web frameworks. With hands-on experience in developing full-stack applications, machine learning models, and secure systems, I love creating applications that solve real-world problems. My journey in technology has been marked by continuous learning, participating in hackathons, and publishing research in Scopus-indexed journals.",
    professionalSummary: "Results-driven Computer Engineering student with strong expertise in Python, AI/ML, and Full-Stack Web Development. Experienced in building scalable applications, implementing advanced algorithms, and integrating secure systems. Proven track record of delivering high-impact projects with clean, maintainable code.",
    email: "sohamsawalakhe@gmail.com",
    phone: "+91 7558496659",
    location: "Amravati, Maharashtra",
    birthday: "26 April 2004",
    age: "21",
    degree: "B.Tech (Computer Engineering)",
    freelance: "Available",
    github: "https://github.com/SohamSawalakhe",
    linkedin: "https://www.linkedin.com/in/soham-sawalakhe-901366278/",
    resume: "/Resume_Soham_Sawalakhe.pdf",
    image: "/Soham2.jpg",
    typedItems: ["Software Developer", "AI/ML Engineer", "Full Stack Developer", "Data Scientist", "Problem Solver"]
  },
  facts: {
    projects: "20+",
    researchPapers: "2",
    supportHours: "500+",
    certifications: "8+"
  },
  experience: [
    {
      role: "Backend Developer",
      company: "SitaraHub",
      period: "Jan 2026 - Present",
      location: "Onsite",
      type: "Full-Time",
      description: "Working as a Backend Developer building scalable APIs and server-side applications.",
      responsibilities: [
        "Developing and maintaining backend services and RESTful APIs",
        "Implementing database schemas and optimizing query performance",
        "Collaborating with frontend teams for seamless API integration",
        "Participating in code reviews and agile sprint planning"
      ]
    },
    {
      role: "Full Stack Developer Intern",
      company: "Techelevare Software Pvt Ltd",
      period: "Aug 2025 - Dec 2025",
      location: "Pune, India",
      type: "Internship",
      description: "Worked as a Full Stack Developer Intern, building enterprise applications and collaborating with cross-functional teams.",
      responsibilities: [
        "Worked on enterprise software development projects",
        "Built full-stack web applications using modern frameworks",
        "Collaborated with development teams on code reviews and implementation",
        "Participated in agile development methodologies",
        "Learned industry best practices and professional software development"
      ]
    },
    {
      role: "Full Stack Developer",
      company: "Freelance Projects",
      period: "2023 - 2024",
      location: "Amravati, Maharashtra",
      type: "Freelance",
      description: "Developed multiple full-stack web applications using Django, Flask, and React. Implemented AI/ML models for various projects.",
      responsibilities: [
        "Developed multiple full-stack web applications using Django, Flask, and React",
        "Implemented AI/ML models for various projects including image recognition and data analysis",
        "Built REST APIs for seamless integration between frontend and backend systems",
        "Managed databases using MySQL and MongoDB for efficient data storage",
        "Collaborated with clients to understand requirements and deliver custom solutions"
      ]
    },
    {
      role: "Technical Volunteer & Class Representative",
      company: "NSS & GCOE Yavatmal",
      period: "2021 - 2024",
      location: "GCOE, Yavatmal",
      type: "Leadership",
      description: "Led 60+ peers as Class Representative. Volunteered in 100+ hours of community service.",
      responsibilities: [
        "Led 60+ peers as Class Representative, facilitating communication between students and faculty",
        "Volunteered in 100+ hours of community service through National Service Scheme",
        "Organized technical workshops, coding competitions, and awareness programs",
        "Mentored junior students in programming and project development"
      ]
    }
  ],
  projects: [
    {
      name: "Covert Database Detection",
      category: "AI/ML",
      technologies: "Python, Tkinter, Scikit-learn, Stegano, Cryptography",
      description: "Built a sophisticated desktop application to detect hidden databases using steganography, cryptography, and advanced data structures. Achieved 90% detection accuracy by integrating custom ML models with real-time analysis visualization. Published research paper in Scopus indexed international journal.",
      link: "https://github.com/SohamSawalakhe/Covert-Database-Detection",
      image: "https://pplx-res.cloudinary.com/image/upload/v1755791143/pplx_project_search_images/6b938e197148b6295d18e07423270446e2c388c6.png",
      highlights: [
        "90% detection accuracy with custom ML models",
        "Advanced steganography and cryptography integration",
        "Real-time analysis and comprehensive reporting",
        "Published in Scopus indexed journal"
      ]
    },
    {
      name: "Library Management System",
      category: "Full Stack",
      technologies: "Django, DRF, MySQL, Bootstrap",
      description: "Comprehensive dual-interface system for admin and student users with role-based authentication. Created RESTful APIs enabling secure CRUD operations on books, members, and transactions.",
      link: "https://github.com/SohamSawalakhe/Library-Management-System",
      image: "https://pplx-res.cloudinary.com/image/upload/v1755078948/pplx_project_search_images/2d4dbbbb4562b2aa27e8d00df450bd43aa900623.png",
      highlights: [
        "Dual interface with role-based access control",
        "Secure REST API implementation with JWT authentication",
        "Custom admin dashboard with analytics",
        "Book issue/return tracking system"
      ]
    },
    {
      name: "CDP Chatbot",
      category: "AI/ML",
      technologies: "Python, NLP, Machine Learning, Flask",
      description: "Intelligent chatbot using natural language processing and machine learning algorithms for automated customer support. Features context-aware responses, multi-intent recognition, and sentiment analysis.",
      link: "https://github.com/SohamSawalakhe/cdp-chatbot",
      image: "https://pplx-res.cloudinary.com/image/upload/v1754758755/pplx_project_search_images/abddbd25833abb524cac679b499519659cc161d9.png",
      highlights: [
        "NLP-powered conversation engine",
        "Context-aware response generation",
        "Multi-intent recognition capability",
        "RESTful API for integration"
      ]
    },
    {
      name: "Any Search Tool",
      category: "Desktop App",
      technologies: "Python, Tkinter, GUI Libraries",
      description: "Real-time file search tool with advanced directory filtering for faster file access. Implemented multi-threaded search algorithms ensuring high responsiveness.",
      link: "https://github.com/SohamSawalakhe",
      image: "https://pplx-res.cloudinary.com/image/upload/v1759582872/pplx_project_search_images/b4a2d3666fb01e37940a82aba862a854fb863db0.png",
      highlights: [
        "Real-time file search with instant results",
        "Advanced directory filtering system",
        "Multi-threaded search implementation",
        "Lightweight and responsive GUI"
      ]
    },
    {
      name: "Data Analytics Dashboard",
      category: "Web App",
      technologies: "React, Node.js, MongoDB, Chart.js",
      description: "Interactive data analytics dashboard for visualizing business metrics and KPIs. Features real-time data updates, customizable widgets, and export functionality.",
      link: "https://github.com/SohamSawalakhe/NAIC-Data-Visualization-Dashboard",
      image: "https://pplx-res.cloudinary.com/image/upload/v1757159362/pplx_project_search_images/9b68f830611bb6c159e3978eb48ebfb4d2d1a147.png",
      highlights: [
        "Real-time data visualization",
        "Customizable dashboard widgets",
        "Interactive charts and graphs",
        "Export reports in multiple formats"
      ]
    },
    {
      name: "Spreadsheet Application",
      category: "Web App",
      technologies: "JavaScript, HTML, CSS, Data Structures",
      description: "Interactive spreadsheet application with formula support, data manipulation, and real-time calculations. Features include cell formatting, data validation, and undo/redo operations.",
      link: "https://github.com/SohamSawalakhe/spreadsheet_project",
      image: "https://pplx-res.cloudinary.com/image/upload/v1754709522/pplx_project_search_images/61edca218107ee74994571de9eab084345592bb0.png",
      highlights: [
        "Formula calculation engine",
        "Cell formatting and styling options",
        "Data import/export (CSV, Excel)",
        "Undo/Redo operations"
      ]
    }
  ],
  education: [
    {
      degree: "B.Tech in Computer Engineering",
      institution: "Government College of Engineering, Yavatmal",
      period: "2021 - 2025",
      score: "CGPA: 8.26/10",
      description: "Bachelor's degree in Computer Engineering with focus on AI/ML and Full Stack Development. Active participant in technical events, hackathons, and research activities."
    },
    {
      degree: "Higher Secondary (HSC)",
      institution: "Bhartiya Mahavidyalaya, Amravati",
      period: "2020 - 2021",
      score: "84.80%",
      description: "Completed Higher Secondary education with distinction, specializing in Science stream with Mathematics and Computer Science."
    },
    {
      degree: "Secondary (SSC)",
      institution: "Dnyanmata High School, Amravati",
      period: "2019",
      score: "77.6%",
      description: "Completed Secondary education with good academic performance and active participation in extracurricular activities."
    }
  ],
  certifications: [
    {
      name: "Google Cybersecurity Professional Certificate",
      issuer: "Google Career Certificates",
      date: "2024",
      description: "Comprehensive training in cybersecurity fundamentals, security operations, threat analysis, network security, and incident response.",
      skills: ["Python", "Linux", "SQL", "SIEM Tools", "Network Security", "Threat Analysis"],
      badge_url: "https://www.credly.com/org/googlecareercertificates/badge/google-cybersecurity-certificate",
      icon: "shield"
    },
    {
      name: "Microsoft & LinkedIn - Generative AI",
      issuer: "Microsoft & LinkedIn Learning",
      date: "2024",
      description: "Advanced training in Generative AI technologies, large language models, prompt engineering, and practical applications.",
      skills: ["Generative AI", "Prompt Engineering", "ChatGPT", "Microsoft Copilot"],
      badge_url: "#",
      icon: "robot"
    },
    {
      name: "Google AI Essentials",
      issuer: "Google",
      date: "2024",
      description: "Foundational knowledge in artificial intelligence, machine learning concepts, and AI-powered application development.",
      skills: ["Artificial Intelligence", "Machine Learning", "AI Applications"],
      badge_url: "#",
      icon: "cpu"
    },
    {
      name: "Cisco Data Analytics Essentials",
      issuer: "Cisco",
      date: "2024",
      description: "Training in data analytics fundamentals, visualization techniques, and statistical analysis.",
      skills: ["Data Analytics", "Excel", "SQL", "Tableau", "Data Visualization"],
      badge_url: "#",
      icon: "bar-chart"
    },
    {
      name: "Power BI Masterclass",
      issuer: "Udemy",
      date: "2023",
      description: "Expert-level training in Microsoft Power BI for data visualization, dashboard creation, and business intelligence.",
      skills: ["Power BI", "Data Visualization", "Business Intelligence", "DAX"],
      badge_url: "#",
      icon: "graph"
    },
    {
      name: "Python Professional Certification",
      issuer: "Professional Institute",
      date: "2023",
      description: "Expert-level certification in Python programming covering advanced concepts, data structures, and OOP.",
      skills: ["Python", "Data Structures", "OOP", "Application Development"],
      badge_url: "#",
      icon: "code"
    },
    {
      name: "NPTEL - Soft Skills",
      issuer: "NPTEL (IIT)",
      date: "2023",
      description: "Comprehensive training in professional communication, leadership, teamwork, and interpersonal skills.",
      skills: ["Communication", "Leadership", "Teamwork", "Presentation Skills"],
      badge_url: "#",
      icon: "people"
    },
    {
      name: "NPTEL - Professional Skills",
      issuer: "NPTEL (IIT)",
      date: "2023",
      description: "Advanced training in professional development, workplace ethics, time management, and career strategies.",
      skills: ["Professional Development", "Time Management", "Work Ethics"],
      badge_url: "#",
      icon: "briefcase"
    }
  ],
  achievements: [
    {
      title: "SitaraHub Internship",
      description: "Currently working as a Backend Developer at SitaraHub — building scalable APIs and server-side applications",
      year: "2026",
      icon: "award"
    },
    {
      title: "Published Research Paper",
      description: "Published paper on 'Covert Data Intelligence: Advanced Hiding Techniques' in Scopus Indexed international journal",
      year: "2024",
      icon: "journal"
    },
    {
      title: "Techelevare Internship",
      description: "Successfully completed Full Stack Developer Internship at Techelevare Software Pvt Ltd, Pune — built enterprise applications",
      year: "2025",
      icon: "award"
    },
    {
      title: "100+ Problems Solved",
      description: "Solved 100+ algorithmic problems on competitive coding platforms including LeetCode, HackerRank, and CodeChef",
      year: "2023-2024",
      icon: "trophy"
    },
    {
      title: "Hackathon Recognition",
      description: "Recognized in multiple national and state-level hackathons for innovative solutions and creative problem-solving",
      year: "2023-2024",
      icon: "lightbulb"
    },
    {
      title: "Leadership Excellence",
      description: "Led 60+ peers as Class Representative with strong leadership, communication, and organizational skills",
      year: "2021-2024",
      icon: "people"
    },
    {
      title: "Community Service",
      description: "Volunteered 100+ hours in NSS activities, contributing to social welfare and community development programs",
      year: "2021-2024",
      icon: "heart"
    }
  ],
  skills: {
    languages: [
      { name: "Python", level: 95 },
      { name: "JavaScript", level: 85 },
      { name: "Java", level: 80 },
      { name: "SQL", level: 90 },
      { name: "HTML/CSS", level: 90 }
    ],
    frameworks: [
      { name: "Django", level: 90 },
      { name: "Flask", level: 85 },
      { name: "React", level: 80 },
      { name: "Node.js", level: 80 },
      { name: "Bootstrap", level: 90 },
      { name: "REST APIs", level: 95 }
    ],
    aiml: [
      { name: "Scikit-learn", level: 85 },
      { name: "TensorFlow/Keras", level: 80 },
      { name: "Pandas/NumPy", level: 90 },
      { name: "Power BI", level: 85 },
      { name: "Machine Learning", level: 85 }
    ],
    tools: [
      { name: "Git/GitHub", level: 95 },
      { name: "VS Code", level: 90 },
      { name: "Docker", level: 75 },
      { name: "AWS", level: 70 },
      { name: "MongoDB", level: 85 }
    ]
  }
};
