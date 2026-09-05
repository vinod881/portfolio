import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Phone, MapPin, Link as Linkedin, GitBranch as Github,
  Search, SlidersHorizontal, Code2, Sparkles, Layout as LayoutIcon,
  Cloud, ExternalLink, Send, Award, GraduationCap, Briefcase, Database,
  Terminal, Brain, MapPinned, Languages, ChevronRight, ArrowUpRight, X
} from "lucide-react";

// --- DATA ---
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Process", href: "#process" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

const QUICK_FACTS = [
  { icon: GraduationCap, text: "B.E. AI & Data Science, GEC Bidar — 2026" },
  { icon: Briefcase, text: "1 internship — Robomanthan Pvt. Ltd." },
  { icon: Sparkles, text: "5+ projects shipped, solo and in teams" },
  { icon: MapPinned, text: "Bidar, Karnataka — open to relocation" },
  { icon: Languages, text: "English, Kannada, Hindi, Telugu" },
];

const SKILL_GROUPS = [
  {
    icon: Terminal,
    title: "Languages",
    items: ["Java", "Python", "SQL", "JavaScript", "TypeScript"],
  },
  {
    icon: LayoutIcon,
    title: "Backend",
    items: [
      "OOP", "Java Collections", "Spring Boot", "Spring Security", 
      "REST APIs", "JWT Auth", "Microservices", "FastAPI",
    ],
  },
  {
    icon: Code2,
    title: "Frontend",
    items: ["React.js", "HTML", "CSS", "Responsive UI", "Tailwind CSS"],
  },
  {
    icon: Database,
    title: "Databases",
    items: ["MySQL", "PostgreSQL", "MongoDB", "Supabase", "Redis"],
  },
  {
    icon: Cloud,
    title: "Cloud & Tools",
    items: ["AWS", "Docker", "Git & GitHub", "Swagger UI", "VS Code", "Eclipse"],
  },
  {
    icon: Brain,
    title: "AI / ML-adjacent",
    items: ["RAG", "ChromaDB", "Sentence Transformers", "Groq LLM API"],
  },
];

const CORE_STRENGTHS = [
  "Problem Solving",
  "Debugging",
  "Application Planning",
  "Team Coordination",
  "Technical Documentation",
];

const PROCESS_STEPS = [
  {
    icon: Search,
    step: "01",
    title: "Understand",
    text: "Break the requirement down and figure out the data model and API shape before writing any code.",
    example: "This means mapping out the system architecture and business logic before building a single endpoint.",
  },
  {
    icon: SlidersHorizontal,
    step: "02",
    title: "Design",
    text: "Sketch the schema, endpoints, and component structure — focusing on scalable backends and intuitive frontends.",
    example: "Planning how databases, APIs, and client-side interfaces will communicate efficiently.",
  },
  {
    icon: Code2,
    step: "03",
    title: "Build",
    text: "Write the backend logic, wire up the frontend, and test the data flow end-to-end throughout the process.",
    example: "Build a single REST endpoint, test its stability, then connect it to the corresponding UI component.",
  },
  {
    icon: Sparkles,
    step: "04",
    title: "Ship & Iterate",
    text: "Deploy the application, gather user feedback, and refine the architecture based on real-world usage.",
    example: "Deploying early and frequently surfaces potential bottlenecks faster than testing locally.",
  },
];

const EXPERIENCE = [
  {
    title: "Cloud Native Java Microservices Engineer Intern",
    org: "Robomanthan Pvt. Ltd, Bangalore",
    date: "Feb 2026 – May 2026",
    bullets: [
      "Built Grama-Vasathi, a full-stack rural homestay booking platform using Java, Spring Boot, and React.js.",
      "Designed REST API endpoints for booking, activity, and homestay management, connected to MySQL via Spring Data JPA.",
      "Set up Spring Security with JWT for role-based authentication across guest, host, and admin roles.",
      "Built the React frontend and integrated it with the backend APIs for a fully working end-to-end platform.",
    ],
  },
  {
    title: "AWS Academy Trainee",
    org: "Karnataka German Technical Training Institute, Gulbarga",
    date: "May 2024 – Jun 2024",
    bullets: [
      "Completed structured coursework in AWS Cloud Foundations and Cloud Architecting.",
      "Covered core cloud services, IAM, and deployment basics hands-on.",
    ],
  },
];

const EDUCATION = [
  {
    degree: "Bachelor of Engineering (B.E.), Artificial Intelligence and Data Science",
    school: "Government Engineering College (GEC), Bidar, Karnataka",
    date: "2023 – 2026",
  },
  {
    degree: "Diploma, Mechanical Engineering",
    school: "Government Polytechnic, Bidar, Karnataka",
    date: "2020 – 2023",
  },
  {
    degree: "Secondary School Leaving Certificate",
    school: "Government Adarsh Vidyalaya, Janwada, Bidar",
    date: "2020",
  },
];

const PROJECTS = [
  {
    title: "Grama-Vasathi - Rural Homestay Booking",
    tag: "Java · Spring Boot · React",
    desc: "A full-stack rural homestay platform bridging local hosts and travelers with seamless booking flows.",
    longDesc: "Grama-Vasathi is a robust, end-to-end booking platform designed specifically for rural homestays. The architecture focuses on high reliability and secure data handling, providing a smooth user experience for both guests searching for getaways and hosts managing their properties.",
    bullets: [
      "Designed and engineered 12+ optimized REST API endpoints for booking management, activity scheduling, and host profiles, securely connected to a MySQL database via Spring Data JPA.",
      "Implemented a comprehensive JWT-based role authentication system to strictly isolate access between 3 distinct user groups: guests, hosts, and platform administrators.",
      "Developed an interactive React frontend that natively integrates with 10+ backend micro-services, prioritizing state management and responsive UI components for mobile users.",
    ],
    image: "/projects/grama_vasathi.png",
    accent: "#8b5cf6",
    link: "https://github.com/vinod881/gram-vasati",
    linkLabel: "View Code",
  },
  {
    title: "Medical AI Service",
    tag: "FastAPI · RAG · LLM",
    desc: "An intelligent medical assistant API featuring RAG-powered query resolution and a patient simulator.",
    longDesc: "This project pushes the boundary of specialized AI by utilizing a custom Retrieval-Augmented Generation (RAG) pipeline. It acts as a highly knowledgeable medical assistant capable of answering complex physiological questions, generating exams, and simulating patient scenarios.",
    bullets: [
      "Architected a high-performance REST API using FastAPI and the Groq Llama 3.1 model, exposing 8+ distinct endpoints including a conversational chatbot, MCQ generator, and exam rank predictor.",
      "Engineered a Retrieval-Augmented Generation (RAG) pipeline utilizing ChromaDB and Sentence Transformers to mathematically map and ground AI answers directly within verified medical textbooks.",
      "Dramatically reduced API latency by implementing Redis caching with a 15-minute TTL, containerized the entire infrastructure via Docker Compose, and provided strict OpenAPI/Swagger documentation."
    ],
    image: "/projects/medical_ai.png",
    accent: "#6366f1",
    link: "https://github.com/vinod881/Ai-agent",
    linkLabel: "View Code",
  },
  {
    title: "Nutri-Vision AI Tracker",
    tag: "React · TypeScript · Supabase",
    desc: "An intelligent nutrition dashboard that calculates personalized macro breakdowns using Edge AI.",
    longDesc: "Nutri-Vision goes beyond simple calorie counting by utilizing AI algorithms deployed at the edge to analyze food inputs. It provides users with deep, visual insights into their eating habits through a highly responsive, modern dashboard.",
    bullets: [
      "Engineered a scalable nutrition-tracking web application utilizing strict TypeScript typing and Vite for rapid module reloading.",
      "Leveraged Supabase Edge Functions to execute serverless AI logic that dynamically analyzes food logs and calculates exact macro and caloric values instantly.",
      "Integrated Recharts to visualize user health trends on custom dashboards, secured end-to-end by Supabase's native authentication flow."
    ],
    image: "/projects/nutri_vision.png",
    accent: "#ec4899",
    link: "https://github.com/vinod881/nutri-vision",
    linkLabel: "View Code",
  },
  {
    title: "Pacemaker Platform",
    tag: "Full-Stack · Team Project",
    desc: "A comprehensive medical learning ecosystem — I built interactive UI screens and robust backend connectivity.",
    longDesc: "A collaborative full-stack initiative to engineer a highly interactive, high-performance web platform tailored specifically for medical students. It centralizes study materials, iterative testing, and progress tracking into a single ecosystem.",
    bullets: [
      "Contributed to a comprehensive medical learning platform, building responsive UI screens, wiring up complex API connectivity, and ensuring seamless relational database integration.",
      "Worked dynamically across the frontend and backend stack to ship features end-to-end, gaining deep insights into production-level state management and routing architecture.",
      "Integrated quickly into an existing collaborative team codebase, strictly following established agile conventions, and successfully managed continuous deployments via Vercel and Render."
    ],
    image: "/projects/pacemaker.png",
    accent: "#10b981",
    link: "https://pacemaker-testing.vercel.app/",
    linkLabel: "View Live",
  },
  {
    title: "Course Material System",
    tag: "React · Node · MongoDB",
    desc: "Led a 4-person team to engineer a centralized academic resource sharing application.",
    longDesc: "Designed to solve the real-world problem of disorganized college resources, this system provides a structured, scalable way for students to upload, categorize, and retrieve vital academic materials.",
    bullets: [
      "Led and mentored a 4-person development team to design, build, and ship a centralized system for organizing and sharing academic course materials.",
      "Engineered the responsive frontend interface and architected the backend logic using MongoDB to handle heavy document uploads and rapid, indexed retrieval.",
      "Acted as technical lead by splitting tasks effectively, running weekly code reviews, and maintaining a strict version control workflow to ensure on-time delivery."
    ],
    image: "/projects/course_material.png",
    accent: "#0ea5e9",
    link: "https://github.com/vinod881/cource-matrial",
    linkLabel: "View Code",
  },
];

const CERTIFICATIONS = [
  { title: "Core Java Programming", org: "Skill Development" },
  { title: "AWS Cloud Foundations", org: "AWS Academy" },
  { title: "AWS Cloud Architecting", org: "AWS Academy / KGTTI, Kalaburagi" },
  { title: "Full-Stack Development", org: "Simplilearn SkillUp" },
  { title: "CATIA V5, CAD", org: "Infosys Springboard" },
  { title: "Intro to Python Programming", org: "Center of Excellence in AI Based Skilling and Assessment" },
];

const SERVICES = [
  {
    icon: LayoutIcon,
    title: "Backend Development",
    text: "Spring Boot, REST APIs, Spring Security, JWT auth, and relational/NoSQL data modeling — the part of the stack I gravitate toward first.",
  },
  {
    icon: Code2,
    title: "Frontend Development",
    text: "React and TypeScript UIs that are responsive, accessible, and wired cleanly to whatever the backend exposes.",
  },
  {
    icon: Cloud,
    title: "Cloud & Deployment",
    text: "Docker, Docker Compose, and AWS fundamentals to containerize and actually ship what I build.",
  },
];

const TOOLS = [
  "Java", "Spring Boot", "React", "TypeScript", "MySQL", 
  "PostgreSQL", "MongoDB", "Docker", "AWS", "Git & GitHub",
];

// --- ANIMATION CONFIG ---
const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

function SectionLabel({ children, center }) {
  return (
    <motion.div variants={fadeUp} className={`mb-4 ${center ? "flex justify-center" : ""}`}>
      <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-widest uppercase">
        {children}
      </span>
    </motion.div>
  );
}

// --- MAIN COMPONENT ---
export default function PortfolioSite() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [scrolled, setScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSend = () => {
    const subject = encodeURIComponent(`Portfolio contact from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:vinodsutar3881@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-[#0a0a0f] text-slate-300 min-h-screen font-sans selection:bg-indigo-500/30">
      {/* BG orbs */}
      <div className="fixed top-0 left-0 w-[700px] h-[700px] rounded-full bg-indigo-700/10 blur-[140px] pointer-events-none -z-0" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-purple-700/8 blur-[140px] pointer-events-none -z-0" />

      {/* NAV */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-slate-950/70 backdrop-blur-xl border-b border-white/5 shadow-2xl" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center relative">
          <a href="#home" className="flex items-center gap-2.5 font-bold text-white z-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-black shadow-lg shadow-indigo-500/20">
              VS
            </div>
            <span className="hidden sm:block tracking-wide">Vinod Sutar</span>
          </a>
          <div className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-2 py-1.5 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} className="px-4 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="relative z-10 pt-32 lg:pt-36 pb-20 lg:pb-28 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <SectionLabel>Full-Stack Developer</SectionLabel>
            <motion.h1 variants={fadeUp} className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6">
              Hello, I'm<br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Vinod Sutar
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-slate-400 text-lg max-w-lg mb-10 leading-relaxed">
              Artificial Intelligence and Data Science graduate (B.E., 2026). Full-stack developer building reliable applications — Java and Spring Boot on the backend, React on the front.
            </motion.p>
            <motion.div variants={fadeUp} className="flex gap-4 mb-16">
              <a href="#portfolio" className="px-8 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm hover:opacity-90 hover:shadow-[0_0_24px_rgba(99,102,241,0.4)] transition-all">
                View My Work
              </a>
              <a href="#contact" className="px-8 py-3.5 rounded-full bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all">
                Get In Touch
              </a>
            </motion.div>
            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              {[
                { n: "2026", l: "AI & DS Graduate" }, 
                { n: "5+", l: "Projects Shipped" }, 
                { n: "1", l: "Internship Completed" }
              ].map((s) => (
                <div key={s.l}>
                  <p className="text-3xl font-extrabold text-white mb-1">{s.n}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">{s.l}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, type: "spring" }} className="relative flex justify-center lg:justify-center w-full lg:-mt-12 lg:-ml-8">
            <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-[0_0_80px_rgba(99,102,241,0.3)] relative p-1 lg:p-1.5">
              {/* Profile Image - Loaded from public/myimage.jpg */}
              <div className="w-full h-full bg-slate-900 rounded-full overflow-hidden relative">
                <img src="/myimage.jpg" alt="Vinod Sutar" className="w-full h-full object-cover" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
                {/* Fallback initials if myimage.jpg is missing */}
                <span className="hidden w-full h-full items-center justify-center text-white text-6xl lg:text-8xl font-extrabold absolute inset-0">VS</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <SectionLabel>About Me</SectionLabel>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Engineering scalable software solutions from the ground up
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 text-lg leading-relaxed mb-4">
              I'm an Artificial Intelligence and Data Science graduate (B.E., 2026) from Government Engineering College, Bidar, with hands-on experience from a cloud-native Java microservices internship at Robomanthan Pvt. Ltd., where I helped build a full-stack rural homestay booking platform from scratch — schema, APIs, auth, and the React frontend that ties it all together.
            </motion.p>
            <motion.p variants={fadeUp} className="text-slate-400 text-lg leading-relaxed mb-4">
              Outside the internship, I keep building. That's meant a RAG-powered medical AI backend with a real vector database and LLM behind it, a nutrition tracker with an AI food-analysis pipeline, and a course material system I led a small team on.
            </motion.p>
            <motion.p variants={fadeUp} className="text-slate-400 text-lg leading-relaxed mb-8">
              I'm currently looking for a Software Developer, Java Developer, or Full Stack role where I can keep shipping real things alongside people who've been doing this longer than I have.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex gap-3 mb-10">
              <a href="mailto:vinodsutar3881@gmail.com" className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all">
                <Mail size={18} />
              </a>
              <a href="https://linkedin.com/in/vinod-sutar-092671357/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all">
                <Linkedin size={18} />
              </a>
              <a href="https://github.com/vinod881" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all">
                <Github size={18} />
              </a>
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-slate-900 border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-6 relative z-10">Quick Facts</h3>
            <ul className="space-y-5 relative z-10">
              {QUICK_FACTS.map((f) => (
                <li key={f.text} className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <f.icon size={16} />
                  </span>
                  <span className="text-sm text-slate-300 pt-1.5">{f.text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 pt-6 border-t border-white/10 relative z-10">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Core Strengths</p>
              <div className="flex flex-wrap gap-2">
                {CORE_STRENGTHS.map((c) => (
                  <span key={c} className="text-xs font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1.5">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="relative z-10 py-24 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-16 text-center">
            <SectionLabel center>Skills</SectionLabel>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold text-white mb-3">What I actually work with</motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 max-w-md mx-auto">Grouped the way I'd explain it in an interview, not just a wall of keywords.</motion.p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SKILL_GROUPS.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-slate-900 border border-white/10 rounded-2xl p-7 hover:border-indigo-500/30 hover:bg-slate-800/50 transition-all group">
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-5 group-hover:bg-indigo-500/20 transition-colors">
                  <s.icon size={20} />
                </div>
                <h3 className="font-bold text-white text-lg mb-4 group-hover:text-indigo-400 transition-colors">{s.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {s.items.map(item => (
                    <span key={item} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-16 text-center">
            <SectionLabel center>How I Work</SectionLabel>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold text-white mb-3">My approach to a project</motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 max-w-lg mx-auto">Same four-step process whether it's an internship task or something I'm building on my own time.</motion.p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((s, i) => (
              <motion.div key={s.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-slate-900 border border-white/10 rounded-2xl p-7 flex flex-col hover:border-indigo-500/30 transition-colors">
                <p className="text-xs font-bold text-indigo-400 mb-4 tracking-widest">{s.step}</p>
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-5">
                  <s.icon size={20} />
                </div>
                <h3 className="font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-slate-400 mb-4">{s.text}</p>
                <p className="text-xs text-slate-500 border-t border-white/10 pt-4 mt-auto italic">{s.example}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE & EDUCATION */}
      <section id="experience" className="relative z-10 py-24 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-16 text-center">
            <SectionLabel center>Experience &amp; Education</SectionLabel>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold text-white">Where I've been</motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <div className="flex items-center gap-2 mb-6 text-white font-bold">
                <Briefcase size={18} className="text-indigo-400" />
                <h3>Experience</h3>
              </div>
              <div className="space-y-6">
                {EXPERIENCE.map((e, i) => (
                  <motion.div variants={fadeUp} key={i} className="bg-slate-900 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors">
                    <div className="flex flex-wrap justify-between gap-2 mb-1">
                      <h4 className="font-bold text-sm text-white">{e.title}</h4>
                      <span className="text-xs text-slate-400 font-medium whitespace-nowrap">{e.date}</span>
                    </div>
                    <p className="text-xs text-indigo-400 font-medium mb-3">{e.org}</p>
                    <ul className="space-y-2">
                      {e.bullets.map((b, j) => (
                        <li key={j} className="text-xs text-slate-400 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1 shrink-0" />
                          <span className="leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <div className="flex items-center gap-2 mb-6 text-white font-bold">
                <GraduationCap size={18} className="text-indigo-400" />
                <h3>Education</h3>
              </div>
              <div className="space-y-5">
                {EDUCATION.map((e, i) => (
                  <motion.div variants={fadeUp} key={i} className="bg-slate-900 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors">
                    <div className="flex flex-wrap justify-between gap-2 mb-1">
                      <h4 className="font-bold text-sm text-white">{e.degree}</h4>
                      <span className="text-xs text-slate-400 font-medium whitespace-nowrap">{e.date}</span>
                    </div>
                    <p className="text-xs text-slate-500">{e.school}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO (WITH IMAGES) */}
      <section id="portfolio" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-16">
            <SectionLabel center>Featured Work</SectionLabel>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold text-white text-center mb-4">Projects I've Shipped</motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 text-center max-w-lg mx-auto">End-to-end full-stack projects — from idea to deployment, built with real tech stacks.</motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p, i) => (
              <motion.div key={p.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                onClick={() => setSelectedProject(p)}
                className="group bg-slate-900 rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 hover:shadow-[0_0_40px_rgba(99,102,241,0.12)] transition-all duration-300 flex flex-col cursor-pointer">
                {/* Image Component */}
                <div className="relative h-52 overflow-hidden bg-slate-800 flex items-center justify-center">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                  {/* Tag pill */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-md" style={{ background: `${p.accent}40`, border: `1px solid ${p.accent}60` }}>
                      {p.tag}
                    </span>
                  </div>
                  {/* Link icon top right */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white group-hover:bg-indigo-600 transition-colors opacity-0 group-hover:opacity-100">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed flex-grow mb-6">{p.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold group-hover:text-indigo-400 transition-colors text-white/70">
                    View Details <ExternalLink size={14} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT I DO & CERTIFICATIONS */}
      <section className="relative z-10 py-24 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 mb-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-16 text-center">
            <SectionLabel center>What I Do</SectionLabel>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold text-white">Where I add the most value</motion.h2>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`rounded-3xl p-8 border ${i === 0 ? "bg-gradient-to-br from-indigo-600 to-purple-600 border-indigo-500/50" : "bg-slate-900 border-white/10"}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${i === 0 ? "bg-white/20 text-white" : "bg-indigo-500/10 text-indigo-400"}`}>
                  <s.icon size={22} />
                </div>
                <h3 className="font-bold text-white mb-2">{s.title}</h3>
                <p className={`text-sm leading-relaxed ${i === 0 ? "text-white/90" : "text-slate-400"}`}>{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-12 text-center">
            <SectionLabel center>Credentials</SectionLabel>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold text-white">Things I've studied</motion.h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="bg-slate-900 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors group flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 transition-colors">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm leading-tight mb-1">{c.title}</h3>
                  <p className="text-xs text-slate-500">{c.org}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS STRIP & CTA */}
      <section className="relative z-10 pt-16 pb-24 px-6">
        <div className="max-w-6xl mx-auto text-center mb-20">
          <SectionLabel center>Skills & Technologies</SectionLabel>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {TOOLS.map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-slate-300 px-5 py-2.5">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-px">
            <div className="rounded-3xl bg-slate-950/80 backdrop-blur-md px-10 py-16 text-center">
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">Looking for a Dedicated Engineer?</h2>
              <p className="text-white/70 mb-8 max-w-lg mx-auto">
                I combine strong academic foundations with hands-on experience in building scalable backend services and dynamic frontends. I am actively seeking a role where I can deliver immediate value and grow alongside a professional engineering team.
              </p>
              <a href="#contact" className="inline-block rounded-full bg-white text-slate-950 font-bold text-sm px-8 py-3.5 hover:bg-indigo-50 transition-colors">
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative z-10 py-24 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-16 text-center">
            <SectionLabel center>Contact</SectionLabel>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-bold text-white mb-4">Let's build something</motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 max-w-md mx-auto">Have a role open or a project in mind? I'd love to hear about it.</motion.p>
          </motion.div>

          <div className="max-w-5xl mx-auto grid lg:grid-cols-5 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600 to-purple-700 p-10 relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
              <h3 className="text-xl font-bold text-white mb-3 relative z-10">Contact Information</h3>
              <p className="text-indigo-200/70 text-sm mb-8 relative z-10">Reach out directly — email is fastest.</p>
              <div className="space-y-6 relative z-10">
                {[
                  { icon: Mail, t: "vinodsutar3881@gmail.com" },
                  { icon: Phone, t: "+91 89047 23881" },
                  { icon: MapPin, t: "Bidar, Karnataka, India" },
                  { icon: Linkedin, t: "linkedin.com/in/vinod-sutar" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white text-sm">
                    <div className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center shrink-0"><item.icon size={16} /></div>
                    <span className="font-medium">{item.t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 bg-slate-900 p-10 lg:p-14">
              <h3 className="text-xl font-bold text-white mb-2">Send a message</h3>
              <p className="text-slate-400 text-sm mb-8">Opens a pre-filled email to me.</p>
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Name</label>
                    <input type="text" value={form.name} onChange={handleChange("name")} placeholder="Your name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Email</label>
                    <input type="email" value={form.email} onChange={handleChange("email")} placeholder="you@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Message</label>
                  <textarea rows={4} value={form.message} onChange={handleChange("message")} placeholder="What are you looking to build?"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none" />
                </div>
                <button onClick={handleSend} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl px-8 py-3.5 transition-colors shadow-lg shadow-indigo-600/20">
                  Send Message <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5 mb-8">
            <div className="flex items-center gap-2.5 font-bold text-white">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-xs font-black">VS</div>
              <span>Vinod Sutar</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {NAV_LINKS.map((l) => (
                <a key={l.label} href={l.href} className="text-slate-400 hover:text-white font-medium transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <p className="text-center text-slate-600 text-xs font-medium">
            © 2026 Vinod Sutar. Built with React & Tailwind.
          </p>
        </div>
      </footer>

      {/* PROJECT MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm bg-slate-950/80"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/40 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-800">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
              </div>

              <div className="p-8 -mt-20 relative z-10">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-4 backdrop-blur-md" style={{ background: `${selectedProject.accent}40`, border: `1px solid ${selectedProject.accent}60` }}>
                  {selectedProject.tag}
                </span>
                
                <h2 className="text-3xl font-extrabold text-white mb-4 leading-tight">{selectedProject.title}</h2>
                <p className="text-lg text-indigo-300 font-medium mb-8 leading-relaxed">
                  {selectedProject.longDesc || selectedProject.desc}
                </p>

                {selectedProject.bullets && (
                  <div className="space-y-4 mb-10">
                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Key Implementations</h4>
                    <ul className="space-y-3">
                      {selectedProject.bullets.map((b, i) => (
                        <li key={i} className="flex gap-3 text-slate-300 leading-relaxed text-sm">
                          <span className="text-indigo-500 mt-1">●</span> {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-8 border-t border-white/10 flex flex-wrap gap-4">
                  <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" 
                    className="flex items-center gap-2 bg-white text-slate-950 font-bold text-sm px-6 py-3 rounded-full hover:bg-indigo-100 transition-colors">
                    {selectedProject.linkLabel} <ExternalLink size={16} />
                  </a>
                  <button onClick={() => setSelectedProject(null)} className="flex items-center gap-2 bg-white/5 border border-white/10 text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
