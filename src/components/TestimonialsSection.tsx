import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import ReviewSubmitForm from "./ReviewSubmitForm";
import { supabase } from "@/integrations/supabase/client";
import SectionEmptyState from "@/components/SectionEmptyState";

interface Review {
  id: string;
  name: string;
  role: string | null;
  review_text: string;
  rating: number;
  photo_url: string | null;
}

const ReviewCard = ({ name, role, review_text, rating, photo_url }: Review) => (
  <div className="card-glass p-5 rounded-xl shadow-[var(--shadow-card)] w-full mb-4">
    <div className="flex items-center gap-3 mb-3">
      {photo_url ? (
        <img src={photo_url} alt={name} className="w-10 h-10 rounded-full object-cover border-2 border-primary/30" loading="lazy" />
      ) : (
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/30">
          <span className="text-primary font-bold text-sm">{name.charAt(0)}</span>
        </div>
      )}
      <div>
        <p className="font-semibold text-foreground text-sm">{name}</p>
        {role && <p className="text-xs text-muted-foreground">{role}</p>}
      </div>
    </div>
    <div className="flex gap-0.5 mb-2">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="fill-primary text-primary" size={12} />
      ))}
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed">
      <Quote className="inline-block mr-1 text-primary/30" size={12} />
      {review_text}
    </p>
  </div>
);

interface VerticalMarqueeProps {
  items: Review[];
  direction: "up" | "down";
}

const VerticalMarquee = ({ items, direction }: VerticalMarqueeProps) => {
  const animClass = direction === "up" ? "animate-scroll-up" : "animate-scroll-down";

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
      <div className={`flex flex-col ${animClass}`} style={{ height: "max-content" }}>
        {[...items, ...items].map((t, i) => (
          <ReviewCard key={`${direction}-${i}`} {...t} />
        ))}
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    supabase.from("reviews").select("*").eq("status", "approved").order("created_at", { ascending: false })
      .then(({ data }) => { setReviews((data as Review[]) ?? []); });
  }, []);

  const third = Math.ceil(reviews.length / 3);
  const col1 = reviews.slice(0, third);
  const col2 = reviews.slice(third, third * 2);
  const col3 = reviews.slice(third * 2);

  const half = Math.ceil(reviews.length / 2);
  const mobileCol1 = reviews.slice(0, half);
  const mobileCol2 = reviews.slice(half);

  return (
    <section id="testimonials" className="section-padding overflow-hidden" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            What <span className="text-gradient">Clients</span> Say
          </h2>
        </motion.div>

        {reviews.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:grid md:grid-cols-3 gap-6"
            >
              <VerticalMarquee items={col1} direction="up" />
              <VerticalMarquee items={col2} direction="down" />
              <VerticalMarquee items={col3} direction="up" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-3 md:hidden"
            >
              <VerticalMarquee items={mobileCol1} direction="up" />
              <VerticalMarquee items={mobileCol2} direction="up" />
            </motion.div>
          </>
        ) : (
          <SectionEmptyState
            title="Client reviews will appear here"
            description="Approved reviews from the admin dashboard will show here automatically, and visitors can still submit new testimonials below."
          />
        )}

        <div className="text-center mt-10">
          <ReviewSubmitForm />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
