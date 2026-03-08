import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
  return (
    <div
      className="absolute inset-0 m-auto rounded-full border border-border/20 orbit-ring"
      style={{
        width: radius * 2,
        height: radius * 2,
        animationDuration: `${duration}s`,
        animationDirection: reverse ? "reverse" : "normal",
      }}
    >
      {items.map((skill, i) => {
        const angle = (360 / items.length) * i;
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;

        return (
          <div
            key={skill}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 orbit-item"
            style={{
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
              animationDuration: `${duration}s`,
              animationDirection: reverse ? "normal" : "reverse",
            }}
          >
            <div className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-card/90 backdrop-blur-sm border border-border/40 shadow-sm hover:shadow-[0_0_20px_hsl(var(--color-tertiary)/0.3)] hover:border-primary/60 transition-all duration-300 cursor-default whitespace-nowrap">
              <span className="text-xs md:text-sm font-medium text-foreground">{skill}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative mx-auto flex items-center justify-center scale-[0.55] sm:scale-75 md:scale-90 lg:scale-100"
          style={{ height: 550, width: 550 }}
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

          <OrbitRing items={innerRing} radius={160} duration={45} />
          <OrbitRing items={outerRing} radius={240} duration={60} reverse />
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
