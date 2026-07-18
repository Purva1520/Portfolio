/* ────────────────────────────────────────────────────────────────────
   Single source of truth for every piece of content on the site.
   ──────────────────────────────────────────────────────────────────── */

export const profile = {
  name: 'Purva Gupta',
  firstName: 'Purva',
  role: 'Full-Stack Developer',
  email: 'purva.gupta1520@gmail.com',
  phone: '+91 87086 48523',
  phoneHref: '+918708648523',
  location: 'Panchkula, Haryana · India',
  summary:
    'Computer Science undergraduate at Chitkara University with hands-on experience across the MERN stack, Java, SQL and Data Structures & Algorithms. I love shaping responsive full-stack applications, designing REST APIs and building software that is meant to scale.',
  resumeFile: '/resume.pdf',
  resumeName: 'Purva_Gupta_Resume.pdf',
};

export const links = {
  github: { label: 'GitHub', handle: '@Purva1520', url: 'https://github.com/Purva1520' },
  linkedin: { label: 'LinkedIn', handle: 'in/purva3107', url: 'https://www.linkedin.com/in/purva3107' },
  leetcode: { label: 'LeetCode', handle: 'Purva3107', url: 'https://leetcode.com/u/Purva3107/' },
};

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
];

export const tickerItems = [
  'MERN Stack',
  'REST APIs',
  'Java',
  'Data Structures & Algorithms',
  'SQL',
  'React.js',
  'Node.js',
  'MongoDB',
  '150+ LeetCode problems',
  'CGPA 9.05 / 10',
  'Linux Administration',
];

export const skillGroups = [
  {
    id: 'languages',
    label: 'Languages',
    blurb: 'The grammar I think in — from systems-level C to expressive JavaScript.',
    skills: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'SQL'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    blurb: 'Interfaces that feel calm, responsive and effortless on every screen.',
    skills: ['HTML5', 'CSS3', 'React.js', 'Tailwind CSS', 'Vite', 'Responsive UI'],
  },
  {
    id: 'backend',
    label: 'Backend & Data',
    blurb: 'APIs and data layers designed to stay graceful under growth.',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'MySQL', 'PostgreSQL'],
  },
  {
    id: 'systems',
    label: 'CS & Systems',
    blurb: 'The fundamentals underneath — algorithms, Linux and container tooling.',
    skills: ['Data Structures & Algorithms', 'Linux Administration', 'Docker', 'Kubernetes', 'Git & GitHub'],
  },
  {
    id: 'design',
    label: 'Design & Tools',
    blurb: 'A soft spot for clean visuals and the tools that shape them.',
    skills: ['Figma', 'Canva', 'NumPy', 'OpenCV'],
  },
];

export const softSkills = [
  'Adaptability',
  'Teamwork',
  'Effective Communication',
  'Time Management',
  'Problem Solving',
];

export const projects = [
  {
    id: 'gocab',
    index: '01',
    name: 'GoCab',
    kind: 'Cab Booking Platform',
    accent: 'lavender',
    description:
      'A full-stack cab booking experience built on the MERN stack — three tailored dashboards, one seamless ride.',
    points: [
      'Separate dashboards for customers, drivers and administrators',
      'REST APIs powering booking management and user authentication',
      'End-to-end MERN architecture designed for real-world flows',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript'],
    repo: 'https://github.com/Purva1520',
  },
  {
    id: 'cricketverse',
    index: '02',
    name: 'CricketVerse',
    kind: 'Cricket Management Platform',
    accent: 'sand',
    description:
      'A responsive cricket management and fan-engagement platform — player profiles, match modules and an architecture built to grow.',
    points: [
      'Player profiles and match information modules',
      'Scalable, future-ready application architecture',
      'Clean UI with a focus on fan engagement',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    repo: 'https://github.com/Purva1520',
  },
];

export const journey = [
  {
    period: '2021 — 2022',
    title: 'Gurukul Global School',
    subtitle: 'Secondary Schooling',
    detail: 'Where the curiosity started — finished with an 88% aggregate.',
    metric: '88%',
  },
  {
    period: '2023 — 2024',
    title: 'Gurukul Global School',
    subtitle: 'Senior Secondary Schooling',
    detail: 'Closed senior secondary with an 82% aggregate and a growing pull toward computer science.',
    metric: '82%',
  },
  {
    period: '2024 — Present',
    title: 'Chitkara University',
    subtitle: 'B.E. in Computer Science · Rajpura, Punjab',
    detail: 'Deep-diving into full-stack engineering, DSA and systems — currently holding a CGPA of 9.05 / 10.',
    metric: '9.05 CGPA',
  },
];

export const stats = [
  { value: 9.05, decimals: 2, suffix: '', label: 'CGPA at Chitkara University' },
  { value: 150, decimals: 0, suffix: '+', label: 'LeetCode problems solved' },
  { value: 50, decimals: 0, suffix: '-day', label: 'Coding streak badge' },
  { value: 100, decimals: 0, suffix: '/100', label: 'AI Masterclass score' },
];

export const certifications = [
  { issuer: 'Red Hat', name: 'System Administration II (RH134)' },
  { issuer: 'NASSCOM Foundation', name: 'Introduction to Docker & Kubernetes' },
  { issuer: 'Coursera', name: 'Cybersecurity for Everyone' },
  { issuer: 'Coursera', name: 'Machine Learning' },
  { issuer: 'Google · Coursera', name: 'Prompting Essentials Specialization' },
];

export const achievements = [
  'Secured 100/100 in the AI Masterclass at Chitkara University — spanning AI, ChatGPT, DeepSeek, Grok and the Metaverse.',
  'Solved 150+ LeetCode problems and earned the 50-Day Coding Streak badge.',
];
