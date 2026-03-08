import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

const AdminHero = () => {
  const [hero, setHero] = useState({
    id: "",
    greeting: "Welcome to my portfolio",
    name: "Ariful",
    titles: ["WordPress Developer"],
    description: "",
    cta_primary_text: "View Work",
    cta_primary_url: "#portfolio",
    cta_secondary_text: "Hire Me",
    cta_secondary_url: "#contact",
  });
  const [titlesInput, setTitlesInput] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("hero_content").select("*").limit(1).single();
      if (data) {
        setHero(data);
        setTitlesInput(data.titles.join(", "));
      }
    };
    fetch();
  }, []);

  const handleSave = async () => {
    const titles = titlesInput.split(",").map((t) => t.trim()).filter(Boolean);
    const payload = { ...hero, titles };

    if (hero.id) {
      await supabase.from("hero_content").update(payload).eq("id", hero.id);
    } else {
      await supabase.from("hero_content").insert(payload);
    }
    toast.success("Hero section updated");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Hero Section</h1>
        <Button onClick={handleSave}><Save size={16} /> Save</Button>
      </div>

      <div className="card-glass p-6 space-y-4 max-w-2xl">
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Greeting</label>
          <input value={hero.greeting} onChange={(e) => setHero({ ...hero, greeting: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Name</label>
          <input value={hero.name} onChange={(e) => setHero({ ...hero, name: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Rotating Titles (comma-separated)</label>
          <input value={titlesInput} onChange={(e) => setTitlesInput(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50"
            placeholder="WordPress Developer, SEO Expert, ..." />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Description</label>
          <textarea value={hero.description} onChange={(e) => setHero({ ...hero, description: e.target.value })}
            rows={3} className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50 resize-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Primary CTA Text</label>
            <input value={hero.cta_primary_text} onChange={(e) => setHero({ ...hero, cta_primary_text: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Primary CTA URL</label>
            <input value={hero.cta_primary_url} onChange={(e) => setHero({ ...hero, cta_primary_url: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Secondary CTA Text</label>
            <input value={hero.cta_secondary_text} onChange={(e) => setHero({ ...hero, cta_secondary_text: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Secondary CTA URL</label>
            <input value={hero.cta_secondary_url} onChange={(e) => setHero({ ...hero, cta_secondary_url: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHero;
