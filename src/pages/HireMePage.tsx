import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const HireMePage = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <Navbar />
    <div className="pt-20">
      <div className="container mx-auto px-4 text-center mb-8">
        <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Let's Work Together</p>
        <h1 className="text-3xl md:text-4xl font-bold">
          <span className="text-gradient">Hire Me</span> for Your Next Project
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground mt-4">
          Ready to bring your ideas to life? Get in touch and let's discuss how I can help you achieve your goals.
        </p>
      </div>
      <ContactSection />
    </div>
    <Footer />
  </div>
);

export default HireMePage;
