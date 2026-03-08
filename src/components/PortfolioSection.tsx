import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

const projects = [
  { title: "Elite Real Estate", desc: "Premium property listing platform with IDX integration", tech: ["WordPress", "Elementor", "IDX"], url: "https://www.zillow.com", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop" },
  { title: "ShopVista Commerce", desc: "Full-scale WooCommerce store with custom checkout", tech: ["WooCommerce", "PHP", "JS"], url: "https://woocommerce.com", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop" },
  { title: "LearnHub LMS", desc: "Comprehensive online learning management system", tech: ["WordPress", "LearnDash", "BuddyBoss"], url: "https://www.learndash.com", image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop" },
  { title: "TechCorp Business", desc: "Corporate website with advanced animations", tech: ["WordPress", "Elementor", "GSAP"], url: "https://developer.mozilla.org", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop" },
  { title: "SoundWave Podcast", desc: "Podcast hosting and streaming platform", tech: ["WordPress", "Custom Plugin", "API"], url: "https://www.buzzsprout.com", image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&h=400&fit=crop" },
  { title: "FitPro Membership", desc: "Fitness membership site with scheduling system", tech: ["WordPress", "MemberPress", "WooCommerce"], url: "https://www.mindbodyonline.com", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop" },
  { title: "CreativeFlow Portfolio", desc: "Photographer portfolio with lightbox gallery", tech: ["WordPress", "Divi", "JS"], url: "https://www.behance.net", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop" },
  { title: "GreenLeaf Organics", desc: "Organic food e-commerce with subscription model", tech: ["WooCommerce", "Subscriptions", "Stripe"], url: "https://thrivemarket.com", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop" },
  { title: "AutoDrive Motors", desc: "Car dealership website with inventory management", tech: ["WordPress", "Custom Plugin", "API"], url: "https://www.carvana.com", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop" },
  { title: "MedCare Health", desc: "Medical practice website with appointment booking", tech: ["WordPress", "Crocoblock", "Elementor"], url: "https://www.zocdoc.com", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop" },
  { title: "TravelGo Adventures", desc: "Travel agency with booking integration", tech: ["WordPress", "WooCommerce", "API"], url: "https://www.lonelyplanet.com", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop" },
  { title: "UrbanBite Restaurant", desc: "Restaurant website with online ordering system", tech: ["WordPress", "WooCommerce", "Custom Plugin"], url: "https://www.opentable.com", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop" },
  { title: "LegalEdge Law Firm", desc: "Professional law firm website with case management", tech: ["WordPress", "Elementor", "PHP"], url: "https://www.avvo.com", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop" },
  { title: "EventPro Planner", desc: "Event management platform with ticket booking", tech: ["WordPress", "Custom Plugin", "Stripe"], url: "https://www.eventbrite.com", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop" },
  { title: "EduBright Academy", desc: "Multi-instructor online course marketplace", tech: ["WordPress", "LearnDash", "WooCommerce"], url: "https://www.udemy.com", image: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=600&h=400&fit=crop" },
];

const PortfolioSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [showAll, setShowAll] = useState(false);
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
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-lg bg-accent text-accent-foreground font-medium text-sm flex items-center gap-2 hover:opacity-90"
                  >
                    Live Preview <ExternalLink size={14} />
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
    </section>
  );
};

export default PortfolioSection;
