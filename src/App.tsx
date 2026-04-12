import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ThemeLoader from "@/components/ThemeLoader";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminSetup from "./pages/AdminSetup";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminServices from "./pages/admin/AdminServices";
import AdminPortfolio from "./pages/admin/AdminPortfolio";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminSkills from "./pages/admin/AdminSkills";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminFaqs from "./pages/admin/AdminFaqs";
import AdminHero from "./pages/admin/AdminHero";
import AdminSettings from "./pages/admin/AdminSettings";
import AboutPage from "./pages/AboutPage";
import SkillsPage from "./pages/SkillsPage";
import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import HireMePage from "./pages/HireMePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeLoader />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/hire" element={<HireMePage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/setup" element={<AdminSetup />} />
            <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
            <Route path="/admin/services" element={<AdminLayout><AdminServices /></AdminLayout>} />
            <Route path="/admin/portfolio" element={<AdminLayout><AdminPortfolio /></AdminLayout>} />
            <Route path="/admin/reviews" element={<AdminLayout><AdminReviews /></AdminLayout>} />
            <Route path="/admin/messages" element={<AdminLayout><AdminMessages /></AdminLayout>} />
            <Route path="/admin/skills" element={<AdminLayout><AdminSkills /></AdminLayout>} />
            <Route path="/admin/blog" element={<AdminLayout><AdminBlog /></AdminLayout>} />
            <Route path="/admin/faqs" element={<AdminLayout><AdminFaqs /></AdminLayout>} />
            <Route path="/admin/hero" element={<AdminLayout><AdminHero /></AdminLayout>} />
            <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
