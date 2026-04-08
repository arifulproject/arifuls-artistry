import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

import profilePhoto from "@/assets/profile-photo.jpg";
import wordpressLogo from "@/assets/logos/wordpress.png";
import elementorLogo from "@/assets/logos/elementor.png";
import woocommerceLogo from "@/assets/logos/woocommerce.png";
import memberpressLogo from "@/assets/logos/memberpress.png";
import reactLogo from "@/assets/logos/react.png";
import canvaLogo from "@/assets/logos/canva.png";
import figmaLogo from "@/assets/logos/figma.png";
import webflowLogo from "@/assets/logos/webflow.png";

const orbitLogos = [
  { src: wordpressLogo, alt: "WordPress" },
  { src: reactLogo, alt: "React" },
  { src: elementorLogo, alt: "Elementor" },
  { src: figmaLogo, alt: "Figma" },
  { src: woocommerceLogo, alt: "WooCommerce" },
  { src: canvaLogo, alt: "Canva" },
  { src: memberpressLogo, alt: "MemberPress" },
  { src: webflowLogo, alt: "Webflow" },
];

const HeroSection = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hero, setHero] = useState({
    greeting: "Welcome to my portfolio",
    name: "Ariful",
    titles: ["WordPress Developer", "Custom Plugin Developer", "SEO Expert", "Performance Specialist"],
    description: "Crafting high-performance WordPress solutions, custom plugins, and SEO-optimized websites that drive real business results.",
    cta_primary_text: "View Work",
    cta_primary_url: "#portfolio",
    cta_secondary_text: "Hire Me",
    cta_secondary_url: "#contact",
  });

  useEffect(() => {
    supabase.from("hero_content").select("*").limit(1).maybeSingle()
      .then(({ data }) => { if (data) setHero(data); });
  }, []);

  const titles = hero.titles;

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    if (!currentTitle) return;
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
  }, [charIndex, isDeleting, titleIndex, titles]);

  const orbitRadius = 160; // px, desktop
  const logoCount = orbitLogos.length;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(var(--color-tertiary) / 0.3), transparent 70%)" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-8 lg:gap-16">
          {/* Left: Text Content */}
          <motion.div
            className="flex-1 text-center md:text-left order-2 md:order-1"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary font-mono text-sm mb-4 tracking-widest uppercase">{hero.greeting}</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              Hi, I'm <span className="text-gradient">{hero.name}</span>
            </h1>
            <div className="h-12 md:h-14 flex items-center justify-center md:justify-start mb-6">
              <span className="text-xl md:text-3xl font-medium text-muted-foreground">
                {titles[titleIndex]?.substring(0, charIndex)}
              </span>
              <span className="ml-0.5 w-0.5 h-7 md:h-9 bg-primary animate-pulse" />
            </div>
            <p className="max-w-xl text-muted-foreground mb-10 text-base md:text-lg">{hero.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start sm:items-center">
              <a href={hero.cta_primary_url} className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-xl bg-accent text-accent-foreground font-medium btn-premium hover:scale-105">
                {hero.cta_primary_text} <ExternalLink size={16} />
              </a>
              <a href={hero.cta_secondary_url} className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-xl border border-primary/30 text-primary font-medium hover:bg-primary/10 btn-premium hover:scale-105">
                {hero.cta_secondary_text}
              </a>
            </div>
          </motion.div>

          {/* Right: Profile Image with Orbiting Logos */}
          <motion.div
            className="flex-shrink-0 order-1 md:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] lg:w-[420px] lg:h-[420px]">
              {/* Orbit ring line */}
              <div className="absolute inset-0 rounded-full border border-primary/15" />

              {/* Rotating container — spins the whole ring of logos */}
              <div className="absolute inset-0 hero-orbit-ring">
                {orbitLogos.map((logo, i) => {
                  const angle = (360 / orbitLogos.length) * i;
                  const rad = (angle * Math.PI) / 180;
                  // Position each logo on the circle edge using top/left %
                  const x = 50 + 45 * Math.cos(rad); // 45% of container = orbit radius
                  const y = 50 + 45 * Math.sin(rad);
                  return (
                    <div
                      key={logo.alt}
                      className="absolute hero-orbit-item"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-card shadow-lg border border-border/40 object-cover p-1.5"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Inner subtle ring */}
              <div className="absolute inset-8 rounded-full border border-primary/8" />

              {/* Profile image */}
              <div className="absolute inset-14 sm:inset-16 lg:inset-[72px] rounded-full overflow-hidden border-2 border-primary/25 shadow-xl">
                <img
                  src={profilePhoto}
                  alt="Ariful - WordPress Developer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Glow behind image */}
              <div className="absolute inset-14 sm:inset-16 lg:inset-[72px] rounded-full opacity-25 blur-2xl -z-10"
                style={{ background: "radial-gradient(circle, hsl(var(--color-tertiary) / 0.4), transparent 70%)" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll down arrow */}
        <motion.a href="#about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowDown className="animate-bounce" size={24} />
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
