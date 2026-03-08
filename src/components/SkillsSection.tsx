import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "WordPress", level: 95 },
  { name: "Custom Plugins", level: 90 },
  { name: "WooCommerce", level: 92 },
  { name: "PHP", level: 88 },
  { name: "JavaScript", level: 85 },
  { name: "HTML/CSS", level: 95 },
  { name: "Elementor", level: 93 },
  { name: "SEO", level: 90 },
  { name: "Speed Optimization", level: 92 },
  { name: "API Integration", level: 85 },
  { name: "Divi", level: 88 },
  { name: "Crocoblock", level: 87 },
];

function CircularProgress({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center gap-3 hover-lift"
    >
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r={radius}
            fill="none"
            className="stroke-muted"
            strokeWidth="6"
          />
          <motion.circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke="url(#skill-gradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset: offset } : {}}
            transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="skill-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--color-tertiary))" />
              <stop offset="100%" stopColor="hsl(var(--color-accent))" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-foreground">{level}%</span>
        </div>
      </div>
      <span className="text-sm text-muted-foreground text-center font-medium">{name}</span>
    </motion.div>
  );
}

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Expertise</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            My <span className="text-gradient">Skills</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 max-w-4xl mx-auto">
          {skills.map((skill, i) => (
            <CircularProgress key={skill.name} {...skill} delay={i * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
