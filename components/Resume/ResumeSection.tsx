"use client";

import { motion } from "framer-motion";

interface ResumeItemProps {
  title: string;
  subtitle?: string;
  period?: string;
  description?: string | string[];
  className?: string;
}

function ResumeItem({
  title,
  subtitle,
  period,
  description,
  className = "",
}: ResumeItemProps) {
  return (
    <div className={`mb-8 last:mb-0 ${className}`}>
      <div className="mb-2">
        <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
        {subtitle && (
          <p className="text-gray-400 text-sm font-medium">{subtitle}</p>
        )}
        {period && (
          <p className="text-gray-500 text-xs mt-1">{period}</p>
        )}
      </div>
      {description && (
        <div className="mt-3">
          {Array.isArray(description) ? (
            <ul className="space-y-1.5">
              {description.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-300 text-sm leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-brand-red"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
          )}
        </div>
      )}
    </div>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
}

function Section({ title, children, delay = 0 }: SectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      className="mb-16 last:mb-0"
    >
      <h2 className="text-white font-bold text-2xl md:text-3xl mb-8 uppercase tracking-tight">
        {title}
      </h2>
      <div className="space-y-6">{children}</div>
    </motion.div>
  );
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-brand-gray/30 backdrop-blur-sm rounded-lg p-6 md:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

export default function ResumeSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="py-20 md:py-32 bg-brand-dark relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 uppercase tracking-tight">
            Resume
          </h1>
          <div className="w-24 h-1 bg-brand-red mx-auto mt-6"></div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-16"
        >
          <h2 className="text-white font-bold text-xl md:text-2xl mb-2">
            Alok Kumar Sah
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            alokkumax1@gmail.com
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
        >
          {/* Left Column */}
          <div className="space-y-12">
            {/* Education */}
            <Section title="Education" delay={0.1}>
              <Card>
                <ResumeItem
                  title="Siliguri Institute of Technology"
                  subtitle="B.Tech CSE"
                  period="2019 – 2023 | CGPA: 9.0"
                />
              </Card>
            </Section>

            {/* Experience */}
            <Section title="Experience" delay={0.2}>
              <Card>
                <ResumeItem
                  title="Full Stack Developer Intern"
                  subtitle="QO Box (Remote)"
                  period="Oct 2024 – Dec 2024"
                  description={[
                    "Led frontend development for React & PHP projects",
                    "Collaborated with Figma designers for responsive UI/UX",
                  ]}
                />
                <div className="h-px bg-brand-light/20 my-6"></div>
                <ResumeItem
                  title="Full Stack Developer"
                  subtitle="Freelance"
                  period="Sept 2023 – Present"
                  description={[
                    "Built full-stack systems like food delivery & e-commerce",
                    "Delivered apps using Next.js, RN, MongoDB, Firebase, Stripe, Razorpay, Sanity",
                  ]}
                />
                <div className="h-px bg-brand-light/20 my-6"></div>
                <ResumeItem
                  title="Frontend Engineer Intern"
                  subtitle="Stolution, USA (Remote)"
                  period="Dec 2022 – Jan 2023"
                  description={[
                    "Implemented UI features for store management platform",
                    "Used Next.js, TS, REST APIs, MUI",
                  ]}
                />
                <div className="h-px bg-brand-light/20 my-6"></div>
                <ResumeItem
                  title="Software Engineer Intern"
                  subtitle="Digital Product School, Germany (Remote)"
                  period="Jan 2022 – Apr 2022"
                  description={[
                    "Built farm-control platform prototype",
                    "Tech: React, Node, Express, MongoDB",
                  ]}
                />
              </Card>
            </Section>

            {/* Skills */}
            <Section title="Skills" delay={0.3}>
              <Card>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-3 text-gray-400">
                      Languages
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Java, C, JavaScript, TypeScript, Python, Dart
                    </p>
                  </div>
                  <div className="h-px bg-brand-light/20"></div>
                  <div>
                    <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-3 text-gray-400">
                      Backend
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Node.js, Express, REST APIs, MongoDB, PostgreSQL, SQL,
                      Supabase
                    </p>
                  </div>
                  <div className="h-px bg-brand-light/20"></div>
                  <div>
                    <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-3 text-gray-400">
                      Frontend
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      React.js, Next.js, React Native, Flutter, Tailwind, MUI,
                      Bootstrap, HTML/CSS
                    </p>
                  </div>
                  <div className="h-px bg-brand-light/20"></div>
                  <div>
                    <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-3 text-gray-400">
                      Tools
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Git, GitHub, Firebase, Sanity, Stripe, Razorpay, Figma,
                      Sass, jQuery
                    </p>
                  </div>
                </div>
              </Card>
            </Section>
          </div>

          {/* Right Column */}
          <div className="space-y-12">
            {/* Projects */}
            <Section title="Projects" delay={0.4}>
              <Card>
                <ResumeItem
                  title="Danger Ahead"
                  description="Road-safety portal using Google Maps API"
                />
                <div className="h-px bg-brand-light/20 my-6"></div>
                <ResumeItem
                  title="Zensu Ecommerce"
                  description="Full-stack ecommerce platform"
                />
                <div className="mt-3">
                  <p className="text-gray-400 text-xs">
                    Tech: Next.js, Sanity, Stripe, Razorpay, ShadCN
                  </p>
                </div>
              </Card>
            </Section>

            {/* Achievements */}
            <Section title="Achievements" delay={0.5}>
              <Card>
                <ResumeItem
                  title="Smart India Hackathon 2022"
                  subtitle="Winner"
                  description="Built centralized ADIP scheme system for Govt of India"
                />
                <div className="h-px bg-brand-light/20 my-6"></div>
                <ResumeItem
                  title="UNESCO India–Africa Hackathon 2022"
                  subtitle="Runner-Up"
                  description="Soil-health analysis app delivering 14+ properties"
                />
                <div className="h-px bg-brand-light/20 my-6"></div>
                <ResumeItem
                  title="Decov 2020"
                  subtitle="Finalist"
                  description="App & website for personalized diet and COVID-care"
                />
              </Card>
            </Section>

            {/* Community */}
            <Section title="Community" delay={0.6}>
              <Card>
                <ResumeItem
                  title="Hack Club"
                  subtitle="Co-Leader"
                  period="2021–2023"
                  description="Conducted sessions on UI/UX and React"
                />
                <div className="h-px bg-brand-light/20 my-6"></div>
                <ResumeItem
                  title="Google Developer Group"
                  subtitle="Core Tech Team"
                  period="2022"
                  description="Managed DevFest websites and UI/UX"
                />
              </Card>
            </Section>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

