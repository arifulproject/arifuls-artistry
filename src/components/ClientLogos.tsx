import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const logos = [
  "WordPress", "WooCommerce", "Elementor", "Divi", "Crocoblock",
  "LearnDash", "Stripe", "Google", "Cloudflare", "cPanel",
  "PHP", "JavaScript", "MySQL", "AWS", "Yoast SEO",
];

const ClientLogos = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="py-16 overflow-hidden border-y border-border/30" ref={ref}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="text-center text-sm text-muted-foreground font-mono tracking-widest uppercase mb-8">
          Technologies & Partners
        </p>
        <div className="relative">
          <div className="flex animate-marquee gap-12 whitespace-nowrap">
            {[...logos, ...logos].map((logo, i) => (
              <span
                key={i}
                className="text-muted-foreground/50 text-lg font-semibold hover:text-primary transition-colors cursor-default select-none"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ClientLogos;
