import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Globe, Puzzle, ShoppingCart, GraduationCap,
  Building, Home, Mic, Palette, Zap, Code2, LucideIcon
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SectionEmptyState from "@/components/SectionEmptyState";

const iconMap: Record<string, LucideIcon> = {
  Globe, Puzzle, ShoppingCart, GraduationCap,
  Building, Home, Mic, Palette, Zap, Code2,
};

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("services").select("*").eq("is_active", true).order("sort_order")
      .then(({ data }) => { setServices(data ?? []); });
  }, []);

  const hasServices = services.length > 0;

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

        {hasServices ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] || Globe;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`card-glass p-6 group hover:border-primary/30 transition-all duration-300 hover-lift shine-border ${service.span}`}
                >
                  <Icon className="text-primary mb-4 group-hover:scale-110 transition-transform" size={28} />
                  <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <SectionEmptyState
            title="Services will appear here"
            description="Add or activate services from the admin dashboard and they will show on the homepage automatically."
          />
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
