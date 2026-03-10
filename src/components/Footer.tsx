import { useEffect, useState } from "react";
import { Linkedin, Twitter, Heart, Mail, Phone, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Footer = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from("site_settings").select("*");
      if (data) {
        const mapped: Record<string, string> = {};
        data.forEach((s) => { mapped[s.key] = s.value; });
        setSettings(mapped);
      }
    };
    fetchSettings();
  }, []);

  const email = settings.email || "arifullislam1312@gmail.com";
  const phone = settings.phone || "+8801743566895";
  const fiverr = settings.fiverr_url || "https://www.fiverr.com/arifullislam572";
  const linkedin = settings.linkedin_url || "https://www.linkedin.com/in/ariful-wp-39174b3b5/";
  const twitter = settings.twitter_url || "https://x.com/arif_ahmed_wp";
  const tagline = settings.footer_tagline || "WordPress Developer & SEO Expert crafting high-performance digital solutions.";

  return (
    <footer className="border-t border-border/50 py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <a href="#home" className="text-xl font-bold text-gradient mb-3 block">&lt;Ariful /&gt;</a>
            <p className="text-sm text-muted-foreground leading-relaxed">{tagline}</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Quick Links</h4>
            <div className="space-y-2">
              {["About", "Skills", "Services", "Portfolio"].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="block text-sm text-muted-foreground hover:text-primary transition-colors">{link}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Contact</h4>
            <div className="space-y-2">
              <a href={`mailto:${email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail size={14} className="shrink-0" /><span className="truncate">{email}</span>
              </a>
              <a href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone size={14} className="shrink-0" />{phone}
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Connect</h4>
            <div className="flex gap-3">
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all social-icon-hover" aria-label="LinkedIn"><Linkedin size={16} /></a>
              <a href={twitter} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all social-icon-hover" aria-label="Twitter / X"><Twitter size={16} /></a>
              <a href={fiverr} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all social-icon-hover" aria-label="Fiverr"><ExternalLink size={16} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-border/50 pt-6 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">© 2025 Ariful. Built with <Heart size={14} className="text-primary" /> and code.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
