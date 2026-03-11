import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const PortfolioSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [showAll, setShowAll] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("portfolio_projects").select("*").eq("is_active", true).order("sort_order")
      .then(({ data }) => { if (data) setProjects(data); });
  }, []);

  const displayed = showAll ? projects : projects.slice(0, 6);

  return (
    <section id="portfolio" className="section-padding" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Recent Work</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {displayed.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group card-glass overflow-hidden hover-lift shine-border"
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  {project.project_url && (
                    <a
                      href={project.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-lg bg-accent text-accent-foreground font-medium text-sm flex items-center gap-2 btn-premium"
                    >
                      Live Preview <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-foreground mb-1">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {(project.tech_stack || []).map((t: string) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-muted text-primary font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {!showAll && projects.length > 6 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 rounded-xl border border-primary/30 text-primary font-medium hover:bg-primary/10 transition-all btn-premium"
            >
              View All Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
