import Navbar from "@/components/Navbar";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const TestimonialsPage = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <Navbar />
    <div className="pt-20">
      <TestimonialsSection />
    </div>
    <Footer />
  </div>
);

export default TestimonialsPage;
