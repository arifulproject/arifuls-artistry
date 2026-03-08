import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What services do you offer as a freelance web developer?",
    answer:
      "I specialize in full-stack web development including custom websites, web applications, e-commerce solutions, API integrations, and UI/UX design implementation. I work with modern technologies like React, TypeScript, Node.js, and more.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines vary by scope. A landing page takes 1–2 weeks, a multi-page website 3–5 weeks, and a full web application 6–12 weeks. I provide a detailed timeline estimate after understanding your requirements.",
  },
  {
    question: "What is your development process?",
    answer:
      "My process follows four phases: Discovery (understanding your goals), Design (wireframes & prototypes), Development (building with clean, scalable code), and Delivery (testing, launch, and handoff). You're kept in the loop at every stage.",
  },
  {
    question: "Do you offer ongoing maintenance and support?",
    answer:
      "Yes! I offer post-launch maintenance packages that include bug fixes, performance monitoring, content updates, and feature enhancements to keep your site running smoothly.",
  },
  {
    question: "How do we communicate during the project?",
    answer:
      "I use a combination of scheduled check-ins, async updates, and tools like Slack or email. You'll have visibility into progress through regular demos and a shared project board.",
  },
  {
    question: "Can you work with my existing team or codebase?",
    answer:
      "Absolutely. I'm experienced in collaborating with designers, project managers, and other developers. I can integrate into your existing workflow and contribute to an established codebase.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="section-padding">
      <div className="max-w-3xl mx-auto px-6 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-mono text-primary tracking-wider uppercase">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-foreground">
            Frequently Asked{" "}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Quick answers to common questions about working with me.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-border/40"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
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
