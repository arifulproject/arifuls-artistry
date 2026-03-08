import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2, Pencil } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";

type Skill = Tables<"skills">;

const AdminSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const fetch = async () => {
    const { data } = await supabase.from("skills").select("*").order("sort_order");
    if (data) setSkills(data);
  };

  useEffect(() => { fetch(); }, []);

  const addSkill = async () => {
    if (!newSkill.trim()) return;
    await supabase.from("skills").insert({ name: newSkill.trim(), sort_order: skills.length });
    setNewSkill("");
    toast.success("Skill added");
    fetch();
  };

  const updateSkill = async (id: string) => {
    if (!editValue.trim()) return;
    await supabase.from("skills").update({ name: editValue.trim() }).eq("id", id);
    setEditingId(null);
    toast.success("Skill updated");
    fetch();
  };

  const deleteSkill = async (id: string) => {
    await supabase.from("skills").delete().eq("id", id);
    toast.success("Skill deleted");
    fetch();
  };

  const toggleActive = async (skill: Skill) => {
    await supabase.from("skills").update({ is_active: !skill.is_active }).eq("id", skill.id);
    fetch();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Skills</h1>

      <div className="flex gap-2 mb-6">
        <input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addSkill()}
          placeholder="Add a skill..."
          className="flex-1 px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50"
        />
        <Button onClick={addSkill}><Plus size={16} /> Add</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div key={skill.id} className={`card-glass px-3 py-2 flex items-center gap-2 ${!skill.is_active ? "opacity-50" : ""}`}>
            {editingId === skill.id ? (
              <input value={editValue} onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && updateSkill(skill.id)}
                onBlur={() => updateSkill(skill.id)}
                className="px-2 py-1 rounded bg-muted border border-border/30 text-sm text-foreground w-28 focus:outline-none"
                autoFocus />
            ) : (
              <span className="text-sm font-medium text-foreground">{skill.name}</span>
            )}
            <button onClick={() => toggleActive(skill)} className="text-xs text-muted-foreground hover:text-primary">
              {skill.is_active ? "✓" : "○"}
            </button>
            <button onClick={() => { setEditingId(skill.id); setEditValue(skill.name); }}>
              <Pencil size={12} className="text-muted-foreground hover:text-primary" />
            </button>
            <button onClick={() => deleteSkill(skill.id)}>
              <Trash2 size={12} className="text-muted-foreground hover:text-destructive" />
            </button>
          </div>
        ))}
      </div>
      {skills.length === 0 && <p className="text-muted-foreground text-center py-8">No skills yet.</p>}
    </div>
  );
};

export default AdminSkills;
