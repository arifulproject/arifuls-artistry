import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  { name: "Sarah Johnson", role: "CEO, TechVentures", text: "Ariful transformed our website into a conversion machine. His WordPress expertise is unmatched. Our site speed improved by 300% and we saw a 45% increase in leads.", rating: 5 },
  { name: "Michael Chen", role: "Founder, ShopVista", text: "The WooCommerce store Ariful built for us handles thousands of transactions daily without any issues. His attention to detail and performance optimization is incredible.", rating: 5 },
  { name: "Emily Rodriguez", role: "Marketing Director", text: "Working with Ariful on our SEO was a game-changer. We went from page 3 to the top 3 results for our key terms. His technical SEO knowledge is exceptional.", rating: 5 },
  { name: "David Park", role: "CTO, EduBright", text: "Ariful built our LMS platform from scratch. It handles 10,000+ students seamlessly. The custom plugin he developed saved us thousands in licensing fees.", rating: 5 },
  { name: "Lisa Thompson", role: "Realtor, EliteHomes", text: "Our real estate website is now the best in our market. The IDX integration and search functionality Ariful built are absolutely top-notch.", rating: 5 },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section id="testimonials" className="section-padding" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            What <span className="text-gradient">Clients</span> Say
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="card-glass p-8 md:p-10 text-center relative">
            <Quote className="mx-auto mb-6 text-primary/30" size={40} />
            <motion.p
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-foreground text-base md:text-lg leading-relaxed mb-6 italic"
            >
              "{t.text}"
            </motion.p>
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="fill-primary text-primary" size={16} />
              ))}
            </div>
            <p className="font-semibold text-foreground">{t.name}</p>
            <p className="text-sm text-muted-foreground">{t.role}</p>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? "bg-primary w-6" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
