import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Save, Palette, Settings2, Type } from "lucide-react";

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

const defaultTheme: Record<string, string> = {
  theme_light_primary: "#c2e8e8",
  theme_light_secondary: "#0d2626",
  theme_light_tertiary: "#0a1066",
  theme_light_accent: "#0a6612",
  theme_dark_primary: "#0d2626",
  theme_dark_secondary: "#c2e8e8",
  theme_dark_tertiary: "#9999ff",
  theme_dark_accent: "#66ff80",
  theme_font_heading: "Space Grotesk",
  theme_font_body: "Space Grotesk",
};

const themeColorLabels: Record<string, string> = {
  theme_light_primary: "Background",
  theme_light_secondary: "Text",
  theme_light_tertiary: "Primary Accent",
  theme_light_accent: "Secondary Accent",
};

const darkThemeColorLabels: Record<string, string> = {
  theme_dark_primary: "Background",
  theme_dark_secondary: "Text",
  theme_dark_tertiary: "Primary Accent",
  theme_dark_accent: "Secondary Accent",
};

const popularFonts = [
  "Space Grotesk",
  "Inter",
  "Poppins",
  "Roboto",
  "Montserrat",
  "Playfair Display",
  "Raleway",
  "Outfit",
  "DM Sans",
  "Nunito",
  "Lato",
  "Open Sans",
  "Sora",
  "Manrope",
  "Plus Jakarta Sans",
  "Bricolage Grotesque",
];

const AdminSettings = () => {
  const [settings, setSettings] = useState<Record<string, string>>(defaultSettings);
  const [theme, setTheme] = useState<Record<string, string>>(defaultTheme);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "theme">("general");

  useEffect(() => {
    const fetchAll = async () => {
      const { data } = await supabase.from("site_settings").select("*");
      if (data) {
        const mappedSettings = { ...defaultSettings };
        const mappedTheme = { ...defaultTheme };
        data.forEach((s) => {
          if (s.key.startsWith("theme_")) {
            mappedTheme[s.key] = s.value;
          } else {
            mappedSettings[s.key] = s.value;
          }
        });
        setSettings(mappedSettings);
        setTheme(mappedTheme);
      }
    };
    fetchAll();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    const allEntries = activeTab === "general"
      ? Object.entries(settings)
      : Object.entries(theme);

    for (const [key, value] of allEntries) {
      await supabase.from("site_settings").upsert({ key, value }, { onConflict: "key" });
    }
    toast.success(activeTab === "general" ? "Settings saved!" : "Theme saved! Reload to see changes.");
    setLoading(false);
  };

  const ColorPicker = ({ label, themeKey }: { label: string; themeKey: string }) => (
    <div className="flex items-center gap-3">
      <div className="relative">
        <input
          type="color"
          value={theme[themeKey] || "#000000"}
          onChange={(e) => setTheme({ ...theme, [themeKey]: e.target.value })}
          className="w-10 h-10 rounded-lg border border-border/30 cursor-pointer bg-transparent p-0.5"
        />
      </div>
      <div className="flex-1">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <input
          value={theme[themeKey] || ""}
          onChange={(e) => setTheme({ ...theme, [themeKey]: e.target.value })}
          className="w-full px-2 py-1 mt-0.5 text-xs rounded bg-muted border border-border/30 text-foreground font-mono"
          placeholder="#000000"
        />
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <Button onClick={handleSave} disabled={loading}>
          <Save size={16} /> {loading ? "Saving..." : "Save"}
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("general")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "general"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          <Settings2 size={16} /> General
        </button>
        <button
          onClick={() => setActiveTab("theme")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "theme"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          <Palette size={16} /> Theme
        </button>
      </div>

      {activeTab === "general" && (
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
      )}

      {activeTab === "theme" && (
        <div className="space-y-6 max-w-3xl">
          {/* Preview strip */}
          <div className="card-glass p-4">
            <p className="text-sm text-muted-foreground mb-3">Live Preview</p>
            <div className="flex gap-2 items-center">
              {Object.keys(themeColorLabels).map((key) => (
                <div
                  key={key}
                  className="h-10 flex-1 rounded-lg border border-border/20"
                  style={{ backgroundColor: theme[key] || "#000" }}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">Light Mode Preview</p>
            <div className="flex gap-2 items-center mt-2">
              {Object.keys(darkThemeColorLabels).map((key) => (
                <div
                  key={key}
                  className="h-10 flex-1 rounded-lg border border-border/20"
                  style={{ backgroundColor: theme[key] || "#000" }}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">Dark Mode Preview</p>
          </div>

          {/* Light Mode Colors */}
          <div className="card-glass p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-yellow-400" /> Light Mode Colors
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(themeColorLabels).map(([key, label]) => (
                <ColorPicker key={key} themeKey={key} label={label} />
              ))}
            </div>
          </div>

          {/* Dark Mode Colors */}
          <div className="card-glass p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-500" /> Dark Mode Colors
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(darkThemeColorLabels).map(([key, label]) => (
                <ColorPicker key={key} themeKey={key} label={label} />
              ))}
            </div>
          </div>

          {/* Fonts */}
          <div className="card-glass p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Type size={18} /> Fonts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Heading Font</label>
                <select
                  value={theme.theme_font_heading || "Space Grotesk"}
                  onChange={(e) => setTheme({ ...theme, theme_font_heading: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none"
                >
                  {popularFonts.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Body Font</label>
                <select
                  value={theme.theme_font_body || "Space Grotesk"}
                  onChange={(e) => setTheme({ ...theme, theme_font_body: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none"
                >
                  {popularFonts.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Reset */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setTheme(defaultTheme)}
              className="text-sm"
            >
              Reset to Default
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;
