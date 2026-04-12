import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const ContactPage = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <Navbar />
    <div className="pt-20">
      <ContactSection />
    </div>
    <Footer />
  </div>
);

export default ContactPage;
