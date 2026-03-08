import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Sarah Johnson", role: "CEO, TechVentures", text: "Ariful transformed our website into a conversion machine. Site speed improved by 300% and leads increased 45%.", rating: 5, initials: "SJ" },
  { name: "Michael Chen", role: "Founder, ShopVista", text: "The WooCommerce store handles thousands of transactions daily without issues. Incredible attention to detail.", rating: 5, initials: "MC" },
  { name: "Emily Rodriguez", role: "Marketing Director", text: "Our SEO went from page 3 to top 3 results. His technical SEO knowledge is exceptional.", rating: 5, initials: "ER" },
  { name: "David Park", role: "CTO, EduBright", text: "Built our LMS from scratch handling 10,000+ students seamlessly. Custom plugin saved us thousands.", rating: 5, initials: "DP" },
  { name: "Lisa Thompson", role: "Realtor, EliteHomes", text: "Our real estate website is now the best in our market. IDX integration is absolutely top-notch.", rating: 5, initials: "LT" },
  { name: "James Wilson", role: "Owner, FitZone Gym", text: "Booking system and membership portal work flawlessly. Our online sign-ups tripled in two months.", rating: 5, initials: "JW" },
  { name: "Priya Sharma", role: "Director, EduLearn", text: "The e-learning platform is intuitive and scales beautifully. Students love the seamless experience.", rating: 5, initials: "PS" },
  { name: "Robert King", role: "CEO, FinanceHub", text: "Secure, fast, and professional. Our financial dashboard handles complex data with ease.", rating: 5, initials: "RK" },
  { name: "Amanda Lee", role: "Founder, StyleBox", text: "Our fashion e-commerce site looks stunning and converts like crazy. Best investment we made.", rating: 5, initials: "AL" },
  { name: "Carlos Mendez", role: "Manager, FoodieSpot", text: "Online ordering system boosted our revenue by 60%. The UX is smooth and customers love it.", rating: 5, initials: "CM" },
  { name: "Natasha Blake", role: "VP, MediaWave", text: "Complete rebrand and website overhaul delivered on time. The design is sleek and modern.", rating: 5, initials: "NB" },
  { name: "Tom Richards", role: "Founder, CodeCraft", text: "Built a SaaS dashboard that our users rave about. Performance and design are world-class.", rating: 5, initials: "TR" },
  { name: "Sophie Turner", role: "CMO, GreenLeaf", text: "Our nonprofit site donations increased 80% after the redesign. Ariful truly understands UX.", rating: 5, initials: "ST" },
  { name: "Kevin O'Brien", role: "Owner, AutoElite", text: "Vehicle listing platform with advanced filters. Customers find exactly what they need in seconds.", rating: 5, initials: "KO" },
  { name: "Maria Santos", role: "Director, HealthPlus", text: "HIPAA-compliant patient portal built with care. Secure, reliable, and easy to use.", rating: 5, initials: "MS" },
  { name: "Alex Petrov", role: "CTO, DataSync", text: "API integrations were handled expertly. Complex workflows simplified into an elegant interface.", rating: 5, initials: "AP" },
  { name: "Diana Foster", role: "Owner, PetPalace", text: "Our pet store e-commerce tripled sales. The product pages and checkout flow are perfect.", rating: 5, initials: "DF" },
  { name: "Ryan Mitchell", role: "Founder, TravelHub", text: "Travel booking platform with real-time availability. Users love how fast and intuitive it is.", rating: 5, initials: "RM" },
  { name: "Jennifer Adams", role: "CEO, LegalEase", text: "Client portal and document management system streamlined our entire practice. Highly recommend.", rating: 5, initials: "JA" },
  { name: "Hassan Ali", role: "Manager, BuildRight", text: "Construction portfolio site with project galleries. We've landed 3 major contracts through the site.", rating: 5, initials: "HA" },
];

const ReviewCard = ({ name, role, text, rating, initials }: typeof testimonials[0]) => (
  <div className="flex-shrink-0 w-[320px] md:w-[360px] card-glass p-6 rounded-xl shadow-[var(--shadow-card)]">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
        {initials}
      </div>
      <div>
        <p className="font-semibold text-foreground text-sm">{name}</p>
        <p className="text-xs text-muted-foreground">{role}</p>
      </div>
    </div>
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="fill-primary text-primary" size={14} />
      ))}
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed">
      <Quote className="inline-block mr-1 text-primary/30" size={14} />
      {text}
    </p>
  </div>
);

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const row1 = testimonials.slice(0, 10);
  const row2 = testimonials.slice(10, 20);

  return (
    <section id="testimonials" className="section-padding overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
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
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        {/* Row 1 - scrolls left */}
        <div className="relative">
          <div className="flex gap-6 animate-marquee" style={{ width: "max-content" }}>
            {[...row1, ...row1].map((t, i) => (
              <ReviewCard key={`r1-${i}`} {...t} />
            ))}
          </div>
        </div>

        {/* Row 2 - scrolls left slower */}
        <div className="relative">
          <div
            className="flex gap-6"
            style={{
              width: "max-content",
              animation: "marquee 45s linear infinite",
            }}
          >
            {[...row2, ...row2].map((t, i) => (
              <ReviewCard key={`r2-${i}`} {...t} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
