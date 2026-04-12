import Navbar from "@/components/Navbar";
import SkillsSection from "@/components/SkillsSection";
import Footer from "@/components/Footer";

const SkillsPage = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <Navbar />
    <div className="pt-20">
      <SkillsSection />
    </div>
    <Footer />
  </div>
);

export default SkillsPage;
