import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const skills = [
  "WordPress", "PHP", "JavaScript", "HTML", "CSS", "WooCommerce",
  "Elementor", "Crocoblock", "Divi", "API Integration", "SEO",
  "Speed Optimization", "Custom Plugins",
];

const innerRing = skills.slice(0, 6);
const outerRing = skills.slice(6);

function OrbitRing({
  items,
  radius,
  duration,
  reverse = false,
}: {
  items: string[];
  radius: number;
  duration: number;
  reverse?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="absolute inset-0 m-auto rounded-full border border-border/20"
      style={{ width: radius * 2, height: radius * 2 }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{
        duration: hovered ? duration * 3 : duration,
        repeat: Infinity,
        ease: "linear",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {items.map((skill, i) => {
        const angle = (360 / items.length) * i;
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;

        return (
          <motion.div
            key={skill}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ x, y }}
            animate={{ rotate: reverse ? 360 : -360 }}
            transition={{
              duration: hovered ? duration * 3 : duration,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full bg-card/90 backdrop-blur-sm border border-border/40 shadow-sm hover:shadow-[0_0_20px_hsl(var(--color-tertiary)/0.3)] hover:border-primary/60 transition-all duration-300 cursor-default whitespace-nowrap">
              <span className="text-[8px] sm:text-xs md:text-sm font-medium text-foreground">{skill}</span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isMobile = useIsMobile();

  const innerRadius = isMobile ? 100 : 160;
  const outerRadius = isMobile ? 155 : 240;
  const containerSize = isMobile ? 350 : 550;

  return (
    <section id="skills" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative mx-auto flex items-center justify-center"
          style={{ height: containerSize, width: containerSize, maxWidth: "100%" }}
        >
          <div className="absolute inset-0 m-auto w-40 h-40 rounded-full bg-primary/5 blur-3xl" />

          <div className="relative z-10 text-center px-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
              My <span className="text-gradient">Skills</span>
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground max-w-[200px] mx-auto leading-relaxed">
              Building a Seamless Integration Experience
            </p>
          </div>

          <OrbitRing items={innerRing} radius={innerRadius} duration={45} />
          <OrbitRing items={outerRing} radius={outerRadius} duration={60} reverse />
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
