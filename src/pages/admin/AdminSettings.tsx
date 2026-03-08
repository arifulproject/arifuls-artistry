import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

const defaultSettings: Record<string, string> = {
  email: "arifullislam1312@gmail.com",
  phone: "+8801743566895",
  fiverr_url: "https://www.fiverr.com/arifullislam572",
  linkedin_url: "https://www.linkedin.com/in/ariful-wp-39174b3b5/",
  twitter_url: "https://x.com/arif_ahmed_wp",
  footer_tagline: "WordPress Developer & SEO Expert crafting high-performance digital solutions.",
  about_description: "",
};

const settingLabels: Record<string, string> = {
  email: "Email Address",
  phone: "Phone / WhatsApp",
  fiverr_url: "Fiverr Profile URL",
  linkedin_url: "LinkedIn URL",
  twitter_url: "Twitter (X) URL",
  footer_tagline: "Footer Tagline",
  about_description: "About Description",
};

const AdminSettings = () => {
  const [settings, setSettings] = useState<Record<string, string>>(defaultSettings);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("site_settings").select("*");
      if (data) {
        const mapped = { ...defaultSettings };
        data.forEach((s) => { mapped[s.key] = s.value; });
        setSettings(mapped);
      }
    };
    fetch();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    for (const [key, value] of Object.entries(settings)) {
      await supabase.from("site_settings").upsert({ key, value }, { onConflict: "key" });
    }
    toast.success("Settings saved");
    setLoading(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <Button onClick={handleSave} disabled={loading}><Save size={16} /> {loading ? "Saving..." : "Save"}</Button>
      </div>

      <div className="card-glass p-6 space-y-4 max-w-2xl">
        {Object.entries(settingLabels).map(([key, label]) => (
          <div key={key}>
            <label className="text-sm font-medium text-foreground block mb-1">{label}</label>
            {key === "footer_tagline" || key === "about_description" ? (
              <textarea
                value={settings[key] || ""}
                onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50 resize-none"
              />
            ) : (
              <input
                value={settings[key] || ""}
                onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSettings;
