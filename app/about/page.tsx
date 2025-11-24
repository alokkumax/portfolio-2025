"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 uppercase">
            About Me
          </h1>
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-red mb-2">
              Kumax
            </h2>
            <p className="text-gray-400 text-lg">
              Alok Kumar Sah
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Hello! My name is Alok Kumar Sah, and I am from Siliguri, West Bengal. 
              I am a recent graduate from Siliguri Institute of Technology, in 
              Computer Science and Engineering [ 2019-2023 ].
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Throughout my engineering days, I have gained expertise in several 
              programming languages, including C, Java, and JavaScript. I have 
              worked on a variety of projects, from web applications to mobile 
              apps, utilizing technologies like HTML, CSS, JS, React.js, Next.js, 
              Flutter, and React Native. Additionally, I have strong experience in 
              designing intuitive and engaging UI/UX for both websites and mobile 
              frameworks, ensuring seamless user experiences.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              I have gained experience in starting a startup from scratch and 
              growing it into a profitable business. I have worked with 
              cross-functional teams in many industry-level companies, including 
              the German Ministry, where I contributed as a developer for a product.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              I won the National Level Hackathon (SIH22), and my team and I have 
              built a product for the Ministry of Social Justice and Empowerment 
              in India. I have also participated in Unesco India Africa 2022 
              Hackathon, where I represented my country and became the runners-up.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              In addition to my passion for development, I am an enthusiastic 
              learner who challenges myself in every situation. I step up to take 
              on leadership roles and play different positions in the team. I love 
              how the projects I build help users enhance their lives. As a nature 
              lover, my only goal is to give back to the environment and help society.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <a
              href="/projects"
              className="inline-flex items-center gap-2 bg-brand-red text-white font-semibold uppercase px-8 py-4 rounded-lg hover:bg-red-600 transition-colors"
            >
              <span>View My Work</span>
              <span>→</span>
            </a>
            <a
              href="/resume"
              className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold uppercase px-8 py-4 rounded-lg hover:bg-white/10 transition-colors"
            >
              <span>View Resume</span>
              <span>→</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}


