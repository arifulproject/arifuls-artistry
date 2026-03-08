import { Github, Linkedin, Twitter, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <a href="#home" className="text-xl font-bold text-gradient mb-3 block">
              &lt;Ariful /&gt;
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              WordPress Developer & SEO Expert crafting high-performance digital solutions.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Quick Links</h4>
            <div className="space-y-2">
              {["About", "Skills", "Services", "Portfolio"].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Services</h4>
            <div className="space-y-2">
              {["WordPress Dev", "WooCommerce", "SEO", "Speed Optimization"].map((s) => (
                <p key={s} className="text-sm text-muted-foreground">{s}</p>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Connect</h4>
            <div className="flex gap-3">
              {[Github, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all social-icon-hover">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-6 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            © 2025 Ariful. Built with <Heart size={14} className="text-primary" /> and code.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
