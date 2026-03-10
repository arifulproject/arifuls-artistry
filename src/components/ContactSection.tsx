import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Mail, MapPin, Send, Phone, Linkedin, Twitter, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) { toast.error("Please fill all fields"); return; }
    setSending(true);
    const { error } = await supabase.from("contact_messages").insert({ name: form.name.trim(), email: form.email.trim(), message: form.message.trim() });
    if (error) toast.error("Failed to send message. Please try again.");
    else { toast.success("Message sent! I'll get back to you soon."); setForm({ name: "", email: "", message: "" }); }
    setSending(false);
  };

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl font-bold">Let's <span className="text-gradient">Connect</span></h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }}>
            <h3 className="text-xl font-semibold text-foreground mb-4">Let's build something amazing together</h3>
            <p className="text-muted-foreground mb-8">Have a project in mind? I'd love to hear about it. Drop me a message and I'll get back to you within 24 hours.</p>
            <div className="space-y-4">
              <a href={`mailto:${email}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"><Mail className="text-primary shrink-0" size={20} /><span>{email}</span></a>
              <a href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"><Phone className="text-primary shrink-0" size={20} /><span>{phone} (WhatsApp)</span></a>
              <div className="flex items-center gap-3 text-muted-foreground"><MapPin className="text-primary shrink-0" size={20} /><span>Available Worldwide (Remote)</span></div>
            </div>
            <div className="flex gap-3 mt-8">
              <a href={fiverr} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all social-icon-hover" aria-label="Fiverr"><ExternalLink size={18} /></a>
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all social-icon-hover" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href={twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all social-icon-hover" aria-label="Twitter / X"><Twitter size={18} /></a>
            </div>
          </motion.div>

          <motion.form initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required maxLength={100}
              className="w-full px-4 py-3 rounded-lg bg-muted border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all" />
            <input type="email" placeholder="Your Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required maxLength={255}
              className="w-full px-4 py-3 rounded-lg bg-muted border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all" />
            <textarea placeholder="Your Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={5} maxLength={1000}
              className="w-full px-4 py-3 rounded-lg bg-muted border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none" />
            <button type="submit" disabled={sending} className="w-full py-3.5 rounded-lg bg-accent text-accent-foreground font-medium flex items-center justify-center gap-2 btn-premium hover:scale-[1.02] disabled:opacity-50">
              {sending ? "Sending..." : "Send Message"} <Send size={16} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
