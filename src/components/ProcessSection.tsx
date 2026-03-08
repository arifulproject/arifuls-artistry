import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, PenTool, Code, Rocket } from "lucide-react";

const steps = [
  { icon: Search, title: "Discovery", desc: "Understanding your needs, goals, and target audience." },
  { icon: PenTool, title: "Design", desc: "Creating wireframes and stunning visual designs." },
  { icon: Code, title: "Development", desc: "Building with clean, optimized, and scalable code." },
  { icon: Rocket, title: "Launch", desc: "Testing, optimization, and deployment." },
];

const ProcessSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">How I Work</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            My <span className="text-gradient">Process</span>
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Beam line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/30 hidden md:block" />
          <motion.div
            className="absolute left-1/2 top-0 w-px hidden md:block"
            style={{ background: "linear-gradient(to bottom, hsl(var(--color-tertiary)), hsl(var(--color-accent)))" }}
            initial={{ height: 0 }}
            animate={inView ? { height: "100%" } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          <div className="grid gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className={`flex items-center gap-6 md:gap-12 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
                <div className="relative z-10 w-14 h-14 rounded-full bg-muted border-2 border-primary/50 flex items-center justify-center shrink-0 social-icon-hover">
                  <step.icon className="text-primary" size={22} />
                </div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
