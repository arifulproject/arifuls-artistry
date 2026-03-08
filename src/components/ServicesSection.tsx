import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Globe, Puzzle, ShoppingCart, GraduationCap,
  Building, Home, Mic, Palette, Zap, Code2
} from "lucide-react";

const services = [
  { icon: Globe, title: "WordPress Development", desc: "Custom, scalable WordPress sites built for performance.", span: "col-span-1 md:col-span-2" },
  { icon: Puzzle, title: "Custom Plugin Development", desc: "Tailored plugins to extend your site's functionality.", span: "col-span-1" },
  { icon: ShoppingCart, title: "WooCommerce Stores", desc: "Full-featured e-commerce solutions that convert.", span: "col-span-1" },
  { icon: GraduationCap, title: "Membership & LMS", desc: "Online courses and membership platforms.", span: "col-span-1" },
  { icon: Building, title: "Business Websites", desc: "Professional sites that drive growth.", span: "col-span-1" },
  { icon: Home, title: "Real Estate Websites", desc: "IDX-integrated property listing platforms.", span: "col-span-1 md:col-span-2" },
  { icon: Mic, title: "Podcast Websites", desc: "Beautiful podcast hosting platforms.", span: "col-span-1" },
  { icon: Palette, title: "Portfolio Websites", desc: "Stunning portfolios that showcase your work.", span: "col-span-1" },
  { icon: Code2, title: "API Integration", desc: "Seamless third-party API connections.", span: "col-span-1" },
  { icon: Zap, title: "Speed Optimization", desc: "Lightning-fast page loads and Core Web Vitals.", span: "col-span-1" },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">What I Do</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            My <span className="text-gradient">Services</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`card-glass p-6 group hover:border-primary/30 transition-all duration-300 hover-lift ${service.span}`}
            >
              <service.icon className="text-primary mb-4 group-hover:scale-110 transition-transform" size={28} />
              <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
