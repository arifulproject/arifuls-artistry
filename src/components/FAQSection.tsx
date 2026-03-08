import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What types of WordPress websites do you build?",
    a: "I build custom WordPress sites including business websites, e-commerce stores (WooCommerce), membership & LMS platforms, portfolios, blogs, real estate sites, and more — all tailored to your specific needs.",
  },
  {
    q: "How long does a typical WordPress project take?",
    a: "A standard business website takes 2–4 weeks. E-commerce or membership sites with complex features typically take 4–8 weeks. Timelines depend on scope, content readiness, and feedback turnaround.",
  },
  {
    q: "What is your development process?",
    a: "I follow a four-step process: Discovery (understanding your goals), Design (wireframes & visuals), Development (clean, optimized code), and Launch (testing, optimization & deployment).",
  },
  {
    q: "Do you provide ongoing maintenance and support?",
    a: "Yes! I offer monthly maintenance plans that include updates, security monitoring, backups, performance optimization, and priority support to keep your site running smoothly.",
  },
  {
    q: "Can you optimize my existing WordPress site for speed?",
    a: "Absolutely. I perform in-depth audits covering hosting, caching, image optimization, code cleanup, and Core Web Vitals to dramatically improve load times and user experience.",
  },
  {
    q: "Do you build custom plugins and themes?",
    a: "Yes. I develop custom plugins for unique functionality and build bespoke themes from scratch — no bloated page builders — ensuring fast, maintainable, and scalable code.",
  },
  {
    q: "How do we communicate during the project?",
    a: "I keep communication transparent through regular updates via email or your preferred tool (Slack, Trello, etc.), with milestone check-ins so you're always in the loop.",
  },
  {
    q: "What do you need from me to get started?",
    a: "Typically I need your brand assets (logo, colors, fonts), content (text & images), examples of sites you like, and a clear outline of your goals. I'll guide you through everything during our discovery call.",
  },
];

const FAQSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="section-padding" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">
            Got Questions?
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="card-glass px-6 border-none"
              >
                <AccordionTrigger className="text-left text-foreground hover:no-underline hover:text-primary text-sm md:text-base">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
