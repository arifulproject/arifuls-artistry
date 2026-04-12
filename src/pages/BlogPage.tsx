import Navbar from "@/components/Navbar";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";

const BlogPage = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <Navbar />
    <div className="pt-20">
      <BlogSection />
    </div>
    <Footer />
  </div>
);

export default BlogPage;
