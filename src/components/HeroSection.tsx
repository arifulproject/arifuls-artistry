import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ExternalLink } from "lucide-react";

const titles = [
  "WordPress Developer",
  "Custom Plugin Developer",
  "SEO Expert",
  "Performance Specialist",
];

const HeroSection = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < currentTitle.length) {
            setCharIndex((c) => c + 1);
          } else {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          if (charIndex > 0) {
            setCharIndex((c) => c - 1);
          } else {
            setIsDeleting(false);
            setTitleIndex((i) => (i + 1) % titles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, titleIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Orbiting circles background */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[200, 300, 420].map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-primary/15"
            style={{ width: size, height: size }}
          >
            <motion.div
              className="absolute w-3 h-3 rounded-full bg-primary/40"
              style={{ top: -6, left: "50%", marginLeft: -6 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 12 + i * 6, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ))}
      </div>

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(var(--color-tertiary) / 0.3), transparent 70%)" }}
      />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary font-mono text-sm mb-4 tracking-widest uppercase">
            Welcome to my portfolio
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight">
            Hi, I'm{" "}
            <span className="text-gradient">Ariful</span>
          </h1>

          <div className="h-12 md:h-14 flex items-center justify-center mb-8">
            <span className="text-xl md:text-3xl font-medium text-muted-foreground">
              {titles[titleIndex].substring(0, charIndex)}
            </span>
            <span className="ml-0.5 w-0.5 h-7 md:h-9 bg-primary animate-pulse" />
          </div>

          <p className="max-w-xl mx-auto text-muted-foreground mb-10 text-base md:text-lg">
            Crafting high-performance WordPress solutions, custom plugins, and SEO-optimized websites that drive real business results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent text-accent-foreground font-medium hover:opacity-90 transition-all hover:scale-105"
            >
              View Work <ExternalLink size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-primary/30 text-primary font-medium hover:bg-primary/10 transition-all hover:scale-105"
            >
              Hire Me
            </a>
          </div>
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowDown className="animate-bounce" size={24} />
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
