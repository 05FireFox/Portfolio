import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Github, Linkedin, Mail, ExternalLink,
  Code, Brain, Layers, ChevronDown, Moon, Sun, MousePointer
} from 'lucide-react';

import Antigravity from './Antigravity';

// --- DATA ---
const resumeData = {
  name: "Vankara Jishnu Kali Praneet",
  role: "AI/ML Engineer",
  tagline: "Building the future with Intelligence & Code.",
  contact: {
    email: "vankarajishnukalipraneet05@gmail.com",
    linkedin: "#",
    github: "#"
  },
  skills: [
    { name: "Computer Vision", level: 90 },
    { name: "Deep Learning", level: 85 },
    { name: "React / Full Stack", level: 80 },
    { name: "Python / TensorFlow", level: 95 }
  ],
  projects: [
    {
      title: "Emotion-Driven Game Recommender",
      category: "AI Component",
      desc: "Hybrid logic recommender resolving cold-start problems using facial emotion recognition.",
      icon: <Brain size={24} />
    },
    {
      title: "High-Dim Movie Recommender",
      category: "Data Science",
      desc: "Content-based filtering on high-dimensional metadata deployed on Heroku.",
      icon: <Layers size={24} />
    }
  ]
};

// --- COMPONENTS ---

const Nav = ({ isOpen, toggle, darkMode, toggleTheme }) => (
  <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 mix-blend-difference text-white">
    <div className="text-xl font-bold tracking-tighter hover:tracking-widest transition-all duration-300 cursor-pointer">
      VJKP
    </div>

    <div className="flex items-center gap-6">
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none"
        aria-label="Toggle Theme"
      >
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      <button onClick={toggle} className="focus:outline-none" aria-label="Toggle Menu">
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </div>
  </nav>
);

const FullMenu = ({ isOpen, toggle }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: "-100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "-100%" }}
        transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }}
        className="fixed inset-0 z-40 bg-black text-white flex flex-col justify-center items-center"
      >
        <div className="flex flex-col gap-8 text-4xl md:text-6xl font-light tracking-tight text-center">
          {['Home', 'Work', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={toggle}
              className="hover:text-blue-600 transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Section = ({ children, className = "" }) => (
  <div className={`min-h-screen w-full flex flex-col justify-center px-6 md:px-20 py-20 relative z-10 ${className}`}>
    {children}
  </div>
);

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Initialize theme class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={`w-full relative overflow-x-hidden selection:bg-blue-600 selection:text-white font-sans transition-colors duration-500 ${darkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>

      {/* 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 2, 12], fov: 45 }}>
          {darkMode && <fog attach="fog" args={['black', 5, 20]} />}
          {!darkMode && <fog attach="fog" args={['#f9fafb', 5, 20]} />}

          <ambientLight intensity={darkMode ? 0.4 : 0.8} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <spotLight position={[-10, 10, -10]} angle={0.3} intensity={0.5} />

          {darkMode && <Stars radius={100} count={2000} factor={3} fade speed={1} />}

          <Antigravity
            ringRadius={6}
            particleSize={0.02}
            particleShape="sphere"
            color={darkMode ? "#ffffff" : "#000000"}
            particleVariance={1}
            rotationSpeed={0.3}
            count={600}
          />
        </Canvas>
        {/* Overlay Gradient for readability */}
        <div className={`absolute inset-0 bg-gradient-to-t ${darkMode ? 'from-black via-black/20 to-transparent' : 'from-gray-50 via-gray-50/20 to-transparent'}`} />
      </div>

      <Nav
        isOpen={menuOpen}
        toggle={() => setMenuOpen(!menuOpen)}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />
      <FullMenu isOpen={menuOpen} toggle={() => setMenuOpen(!menuOpen)} />

      {/* Hero Section */}
      <Section className="items-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-600 font-mono text-sm tracking-widest uppercase">Portfolio 2026</span>
            <div className="h-[1px] w-12 bg-blue-600" />
          </div>

          <h1 className="text-6xl md:text-9xl font-extrabold tracking-tighter leading-none mb-6">
            JISHNU<br />PRANEET
          </h1>
          <p className={`text-xl md:text-2xl max-w-2xl font-light leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {resumeData.tagline}
          </p>

          {/* Interaction Cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 2, duration: 1 }}
            className="flex items-center gap-2 mt-8 text-sm font-mono opacity-60"
          >
            <MousePointer size={14} className="animate-bounce" />
            <span>Hold mouse to interact</span>
          </motion.div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-6 md:left-20 flex gap-6 z-20"
        >
          <a href={resumeData.contact.github} className="hover:text-blue-500 transition"><Github /></a>
          <a href={resumeData.contact.linkedin} className="hover:text-blue-500 transition"><Linkedin /></a>
          <a href={`mailto:${resumeData.contact.email}`} className="hover:text-blue-500 transition"><Mail /></a>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 right-10 opacity-50"
        >
          <ChevronDown />
        </motion.div>
      </Section>

      {/* Projects / Work Section */}
      <Section className={darkMode ? "bg-gradient-to-b from-transparent to-black" : "bg-gradient-to-b from-transparent to-white"}>
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3 sticky top-32">
            <h3 className="text-4xl md:text-6xl font-bold mb-4">Selected<br />Works</h3>
            <div className="h-1 w-20 bg-blue-600 mb-6" />
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              A collection of projects exploring AI, Computer Vision, and Web Technologies.
            </p>
          </div>
          <div className="md:w-2/3 grid gap-8">
            {resumeData.projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
                className={`group p-8 rounded-2xl border transition-all duration-300 relative overflow-hidden ${darkMode
                  ? 'border-white/10 bg-white/5 hover:border-blue-500/50'
                  : 'border-black/5 bg-white shadow-xl shadow-gray-200/50 hover:border-blue-500/30'
                  }`}
              >
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className={`p-3 rounded-xl ${darkMode ? 'bg-white/10' : 'bg-blue-50 text-blue-600'}`}>
                    {project.icon || <Code size={24} />}
                  </div>
                  <ExternalLink size={20} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-y-2 group-hover:translate-y-0 duration-300" />
                </div>

                <h4 className="text-2xl font-bold mb-2 group-hover:text-blue-500 transition-colors relative z-10">{project.title}</h4>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-blue-500 font-mono text-xs tracking-wider uppercase border border-blue-500/30 px-2 py-0.5 rounded-full">{project.category}</span>
                </div>
                <p className={`text-lg relative z-10 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{project.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section className={darkMode ? 'bg-black' : 'bg-white'}>
        <div className="max-w-4xl mx-auto w-full">
          <h3 className="text-3xl font-bold mb-12 text-center">Technical Proficiency</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {resumeData.skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className={`text-center p-6 border rounded-2xl transition-all duration-300 ${darkMode
                  ? 'border-white/10 bg-white/5 hover:bg-white/10'
                  : 'border-gray-100 bg-gray-50 hover:bg-white hover:shadow-lg'
                  }`}
              >
                <div className="text-3xl font-bold mb-2 text-blue-600">{skill.level}%</div>
                <div className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{skill.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className={`py-12 text-center text-sm border-t ${darkMode ? 'border-white/10 text-gray-600' : 'border-gray-100 text-gray-400'}`}>
        <p>© 2026 VJKP. Dev. All Rights Reserved.</p>
      </footer>
    </div>
  );
}