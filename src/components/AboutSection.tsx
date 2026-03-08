import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Briefcase, Users, FolderOpen, Award } from "lucide-react";

const stats = [
  { icon: FolderOpen, value: 250, suffix: "+", label: "Projects Completed" },
  { icon: Users, value: 180, suffix: "+", label: "Happy Clients" },
  { icon: Briefcase, value: 8, suffix: "+", label: "Years Experience" },
  { icon: Award, value: 50, suffix: "+", label: "5-Star Reviews" },
];

function NumberTicker({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-bold text-gradient">
      {count}{suffix}
    </span>
  );
}

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">About Me</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Passionate <span className="text-gradient">Developer</span> & Digital Craftsman
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-base md:text-lg leading-relaxed">
            I'm Ariful, a seasoned WordPress developer and SEO expert with 8+ years of experience
            building high-performance websites. From custom plugins to complex WooCommerce stores,
            I deliver solutions that are fast, scalable, and optimized for growth. I've helped 180+
            clients worldwide transform their online presence.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-glass p-6 text-center hover-lift"
            >
              <stat.icon className="mx-auto mb-3 text-primary" size={28} />
              <NumberTicker value={stat.value} suffix={stat.suffix} />
              <p className="text-muted-foreground text-sm mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
