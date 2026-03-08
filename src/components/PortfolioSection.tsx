import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, X, Monitor, Smartphone, Tablet } from "lucide-react";

const projects = [
  { title: "Flavor & Fork", desc: "Premium restaurant website with online ordering", tech: ["WordPress", "Elementor", "WooCommerce"], url: "https://flavorfork.developer.developer", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop" },
  { title: "TechVault Store", desc: "Full-scale electronics e-commerce platform", tech: ["WooCommerce", "PHP", "Stripe"], url: "https://developer.developer.developer", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop" },
  { title: "LearnHub Academy", desc: "Online learning management system", tech: ["WordPress", "LearnDash", "BuddyBoss"], url: "https://developer.developer.developer", image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop" },
  { title: "Zenith Corporate", desc: "Corporate website with advanced animations", tech: ["WordPress", "Elementor", "GSAP"], url: "https://developer.developer.developer", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop" },
  { title: "SoundWave Podcast", desc: "Podcast hosting and streaming platform", tech: ["WordPress", "Custom Plugin", "API"], url: "https://developer.developer.developer", image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&h=400&fit=crop" },
  { title: "FitPro Membership", desc: "Fitness membership site with scheduling", tech: ["WordPress", "MemberPress", "WooCommerce"], url: "https://developer.developer.developer", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop" },
  { title: "Artisan Portfolio", desc: "Photographer portfolio with lightbox gallery", tech: ["WordPress", "Divi", "JS"], url: "https://developer.developer.developer", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop" },
  { title: "GreenLeaf Organics", desc: "Organic food store with subscriptions", tech: ["WooCommerce", "Subscriptions", "Stripe"], url: "https://developer.developer.developer", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop" },
  { title: "AutoDrive Motors", desc: "Car dealership with inventory management", tech: ["WordPress", "Custom Plugin", "API"], url: "https://developer.developer.developer", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop" },
  { title: "MedCare Health", desc: "Medical practice with appointment booking", tech: ["WordPress", "Crocoblock", "Elementor"], url: "https://developer.developer.developer", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop" },
  { title: "TravelGo Adventures", desc: "Travel agency with booking integration", tech: ["WordPress", "WooCommerce", "API"], url: "https://developer.developer.developer", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop" },
  { title: "LuxStay Hotels", desc: "Hotel booking platform with room management", tech: ["WordPress", "Custom Plugin", "Stripe"], url: "https://developer.developer.developer", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop" },
  { title: "LegalEdge Law", desc: "Law firm website with case management", tech: ["WordPress", "Elementor", "PHP"], url: "https://developer.developer.developer", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop" },
  { title: "EventPro Planner", desc: "Event management with ticket booking", tech: ["WordPress", "Custom Plugin", "Stripe"], url: "https://developer.developer.developer", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop" },
  { title: "PropertyVault", desc: "Real estate platform with IDX integration", tech: ["WordPress", "IDX", "Elementor"], url: "https://developer.developer.developer", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop" },
];

type ViewportSize = "desktop" | "tablet" | "mobile";

const viewportWidths: Record<ViewportSize, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
};

const PortfolioSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [showAll, setShowAll] = useState(false);
  const [previewProject, setPreviewProject] = useState<typeof projects[0] | null>(null);
  const [viewport, setViewport] = useState<ViewportSize>("desktop");
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
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group card-glass overflow-hidden hover-lift"
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <button
                    onClick={() => { setPreviewProject(project); setViewport("desktop"); }}
                    className="px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    Live Preview <Monitor size={14} />
                  </button>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors"
                    title="Open in new tab"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-foreground mb-1">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-muted text-primary font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {!showAll && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 rounded-xl border border-primary/30 text-primary font-medium hover:bg-primary/10 transition-all"
            >
              View All Projects
            </button>
          </div>
        )}
      </div>

      {/* Live Preview Modal */}
      <AnimatePresence>
        {previewProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-sm"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-card/80 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-destructive/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{previewProject.title}</h3>
                <span className="text-xs text-muted-foreground hidden sm:inline">— {previewProject.desc}</span>
              </div>

              <div className="flex items-center gap-2">
                {/* Viewport toggles */}
                <div className="hidden sm:flex items-center gap-1 bg-muted rounded-lg p-1">
                  {([
                    { key: "desktop" as ViewportSize, icon: Monitor },
                    { key: "tablet" as ViewportSize, icon: Tablet },
                    { key: "mobile" as ViewportSize, icon: Smartphone },
                  ]).map(({ key, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setViewport(key)}
                      className={`p-1.5 rounded-md transition-colors ${viewport === key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      <Icon size={16} />
                    </button>
                  ))}
                </div>

                <a
                  href={previewProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                  title="Open in new tab"
                >
                  <ExternalLink size={16} />
                </a>
                <button
                  onClick={() => setPreviewProject(null)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* iframe container */}
            <div className="flex-1 flex items-start justify-center overflow-auto p-4 bg-muted/30">
              <motion.div
                layout
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-background rounded-lg overflow-hidden shadow-2xl border border-border"
                style={{
                  width: viewportWidths[viewport],
                  maxWidth: "100%",
                  height: viewport === "desktop" ? "100%" : "85vh",
                }}
              >
                <iframe
                  src={previewProject.url}
                  title={`Preview of ${previewProject.title}`}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;
