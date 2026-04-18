import Navbar from "@/components/Navbar";
import SkillsSection from "@/components/SkillsSection";
import Footer from "@/components/Footer";
import profilePhoto from "@/assets/profile-photo.jpg";

const SkillsPage = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <Navbar />
    <div className="pt-24">
      <div className="container mx-auto px-4 text-center mb-4">
        <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">
          Tools & Technologies
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          My <span className="text-gradient">Skills</span>
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground">
          A curated orbit of the tools and platforms I use to design, build, and ship
          seamless digital experiences.
        </p>
      </div>
      <SkillsSection centerImage={profilePhoto} centerImageAlt="Ariful — Profile" />
    </div>
    <Footer />
  </div>
);

export default SkillsPage;
