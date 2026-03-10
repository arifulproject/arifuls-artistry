import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";

const FAQSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [faqs, setFaqs] = useState<any[]>([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      const { data } = await supabase
        .from("faqs")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (data) setFaqs(data);
    };
    fetchFaqs();
  }, []);

  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="section-padding" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Got Questions?</p>
          <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked <span className="text-gradient">Questions</span></h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }} className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="card-glass px-6 border-none shine-border">
                <AccordionTrigger className="text-left text-foreground hover:no-underline hover:text-primary text-sm md:text-base">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
