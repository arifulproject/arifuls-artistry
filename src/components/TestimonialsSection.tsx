import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

import sarahImg from "@/assets/testimonials/sarah.jpg";
import michaelImg from "@/assets/testimonials/michael.jpg";
import emilyImg from "@/assets/testimonials/emily.jpg";
import davidImg from "@/assets/testimonials/david.jpg";
import lisaImg from "@/assets/testimonials/lisa.jpg";
import jamesImg from "@/assets/testimonials/james.jpg";
import priyaImg from "@/assets/testimonials/priya.jpg";
import robertImg from "@/assets/testimonials/robert.jpg";
import amandaImg from "@/assets/testimonials/amanda.jpg";
import carlosImg from "@/assets/testimonials/carlos.jpg";
import natashaImg from "@/assets/testimonials/natasha.jpg";
import tomImg from "@/assets/testimonials/tom.jpg";
import sophieImg from "@/assets/testimonials/sophie.jpg";
import kevinImg from "@/assets/testimonials/kevin.jpg";
import mariaImg from "@/assets/testimonials/maria.jpg";
import alexImg from "@/assets/testimonials/alex.jpg";
import dianaImg from "@/assets/testimonials/diana.jpg";
import ryanImg from "@/assets/testimonials/ryan.jpg";
import jenniferImg from "@/assets/testimonials/jennifer.jpg";
import hassanImg from "@/assets/testimonials/hassan.jpg";
import oliviaImg from "@/assets/testimonials/olivia.jpg";
import erikImg from "@/assets/testimonials/erik.jpg";
import yukiImg from "@/assets/testimonials/yuki.jpg";

const testimonials = [
  { name: "Sarah Johnson", role: "CEO, TechVentures", text: "Ariful transformed our website into a conversion machine. Site speed improved by 300% and leads increased 45%.", rating: 5, image: sarahImg },
  { name: "Michael Chen", role: "Founder, ShopVista", text: "The WooCommerce store handles thousands of transactions daily without issues. Incredible attention to detail.", rating: 5, image: michaelImg },
  { name: "Emily Rodriguez", role: "Marketing Director", text: "Our SEO went from page 3 to top 3 results. His technical SEO knowledge is exceptional.", rating: 5, image: emilyImg },
  { name: "David Park", role: "CTO, EduBright", text: "Built our LMS from scratch handling 10,000+ students seamlessly. Custom plugin saved us thousands.", rating: 5, image: davidImg },
  { name: "Lisa Thompson", role: "Realtor, EliteHomes", text: "Our real estate website is now the best in our market. IDX integration is absolutely top-notch.", rating: 5, image: lisaImg },
  { name: "James Wilson", role: "Owner, FitZone Gym", text: "Booking system and membership portal work flawlessly. Our online sign-ups tripled in two months.", rating: 5, image: jamesImg },
  { name: "Priya Sharma", role: "Director, EduLearn", text: "The e-learning platform is intuitive and scales beautifully. Students love the seamless experience.", rating: 5, image: priyaImg },
  { name: "Robert King", role: "CEO, FinanceHub", text: "Secure, fast, and professional. Our financial dashboard handles complex data with ease.", rating: 5, image: robertImg },
  { name: "Amanda Lee", role: "Founder, StyleBox", text: "Our fashion e-commerce site looks stunning and converts like crazy. Best investment we made.", rating: 5, image: amandaImg },
  { name: "Carlos Mendez", role: "Manager, FoodieSpot", text: "Online ordering system boosted our revenue by 60%. The UX is smooth and customers love it.", rating: 5, image: carlosImg },
  { name: "Natasha Blake", role: "VP, MediaWave", text: "Complete rebrand and website overhaul delivered on time. The design is sleek and modern.", rating: 5, image: natashaImg },
  { name: "Tom Richards", role: "Founder, CodeCraft", text: "Built a SaaS dashboard that our users rave about. Performance and design are world-class.", rating: 5, image: tomImg },
  { name: "Sophie Turner", role: "CMO, GreenLeaf", text: "Our nonprofit site donations increased 80% after the redesign. Ariful truly understands UX.", rating: 5, image: sophieImg },
  { name: "Kevin O'Brien", role: "Owner, AutoElite", text: "Vehicle listing platform with advanced filters. Customers find exactly what they need in seconds.", rating: 5, image: kevinImg },
  { name: "Maria Santos", role: "Director, HealthPlus", text: "HIPAA-compliant patient portal built with care. Secure, reliable, and easy to use.", rating: 5, image: mariaImg },
  { name: "Alex Petrov", role: "CTO, DataSync", text: "API integrations were handled expertly. Complex workflows simplified into an elegant interface.", rating: 5, image: alexImg },
  { name: "Diana Foster", role: "Owner, PetPalace", text: "Our pet store e-commerce tripled sales. The product pages and checkout flow are perfect.", rating: 5, image: dianaImg },
  { name: "Ryan Mitchell", role: "Founder, TravelHub", text: "Travel booking platform with real-time availability. Users love how fast and intuitive it is.", rating: 5, image: ryanImg },
  { name: "Jennifer Adams", role: "CEO, LegalEase", text: "Client portal and document management system streamlined our entire practice. Highly recommend.", rating: 5, image: jenniferImg },
  { name: "Hassan Ali", role: "Manager, BuildRight", text: "Construction portfolio site with project galleries. We've landed 3 major contracts through the site.", rating: 5, image: hassanImg },
  { name: "Olivia Grant", role: "Creative Director, Pixelfy", text: "The portfolio site he built for us is a masterpiece. Clients are always impressed by the design.", rating: 5, image: oliviaImg },
  { name: "Erik Johansson", role: "CEO, NordTech", text: "Enterprise-level web app delivered on budget. The codebase is clean and incredibly maintainable.", rating: 5, image: erikImg },
  { name: "Yuki Tanaka", role: "Founder, ZenApps", text: "Mobile-first design that performs flawlessly. Our app engagement increased by 200% post-launch.", rating: 5, image: yukiImg },
  { name: "Carlos Mendez", role: "COO, LogiTrack", text: "Logistics dashboard with real-time tracking. Operations efficiency improved dramatically.", rating: 5, image: carlosImg },
];

const ReviewCard = ({ name, role, text, rating, image }: typeof testimonials[0]) => (
  <div className="card-glass p-5 rounded-xl shadow-[var(--shadow-card)] w-full mb-4">
    <div className="flex items-center gap-3 mb-3">
      <img
        src={image}
        alt={name}
        className="w-10 h-10 rounded-full object-cover border-2 border-primary/30"
        loading="lazy"
      />
      <div>
        <p className="font-semibold text-foreground text-sm">{name}</p>
        <p className="text-xs text-muted-foreground">{role}</p>
      </div>
    </div>
    <div className="flex gap-0.5 mb-2">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="fill-primary text-primary" size={12} />
      ))}
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed">
      <Quote className="inline-block mr-1 text-primary/30" size={12} />
      {text}
    </p>
  </div>
);

interface VerticalMarqueeProps {
  items: typeof testimonials;
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

  const col1 = testimonials.slice(0, 8);
  const col2 = testimonials.slice(8, 16);
  const col3 = testimonials.slice(16, 24);

  // Mobile: 2 columns, both scroll up
  const mobileCol1 = testimonials.slice(0, 12);
  const mobileCol2 = testimonials.slice(12, 24);

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

        {/* Desktop: 3 columns */}
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

        {/* Mobile: 2 columns, both scroll up */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 gap-3 md:hidden"
        >
          <VerticalMarquee items={mobileCol1} direction="up" />
          <VerticalMarquee items={mobileCol2} direction="up" />
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
