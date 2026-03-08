import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Upload } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Project = Tables<"portfolio_projects">;

const AdminPortfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [techInput, setTechInput] = useState("");
  const [uploading, setUploading] = useState(false);

  const fetch = async () => {
    const { data } = await supabase.from("portfolio_projects").select("*").order("sort_order");
    if (data) setProjects(data);
  };

  useEffect(() => { fetch(); }, []);

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `portfolio/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) { toast.error("Upload failed"); setUploading(false); return; }
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    setEditing({ ...editing, image_url: data.publicUrl });
    setUploading(false);
  };

  const handleSave = async () => {
    if (!editing?.title || !editing?.description || !editing?.image_url) {
      toast.error("Title, description and image are required");
      return;
    }
    const techStack = techInput ? techInput.split(",").map((t) => t.trim()).filter(Boolean) : editing.tech_stack || [];
    if (editing.id) {
      await supabase.from("portfolio_projects").update({
        title: editing.title, description: editing.description, image_url: editing.image_url,
        project_url: editing.project_url, tech_stack: techStack, is_active: editing.is_active ?? true,
        sort_order: editing.sort_order ?? 0,
      }).eq("id", editing.id);
      toast.success("Project updated");
    } else {
      await supabase.from("portfolio_projects").insert({
        title: editing.title, description: editing.description, image_url: editing.image_url,
        project_url: editing.project_url, tech_stack: techStack, sort_order: projects.length,
      });
      toast.success("Project added");
    }
    setDialogOpen(false); setEditing(null); setTechInput(""); fetch();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await supabase.from("portfolio_projects").delete().eq("id", id);
    toast.success("Project deleted"); fetch();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Portfolio</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditing({}); setTechInput(""); }}>
              <Plus size={16} /> Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing?.id ? "Edit Project" : "Add Project"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Title</label>
                <input value={editing?.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Description</label>
                <textarea value={editing?.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  rows={3} className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50 resize-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Image</label>
                {editing?.image_url && <img src={editing.image_url} alt="" className="w-full h-32 object-cover rounded-lg mb-2" />}
                <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted border border-dashed border-border cursor-pointer hover:border-primary/50 transition-colors">
                  <Upload size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{uploading ? "Uploading..." : "Upload image"}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} />
                </label>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Project URL</label>
                <input value={editing?.project_url || ""} onChange={(e) => setEditing({ ...editing, project_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50" placeholder="https://..." />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Tech Stack (comma-separated)</label>
                <input value={techInput || (editing?.tech_stack?.join(", ") || "")}
                  onChange={(e) => setTechInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50"
                  placeholder="WordPress, PHP, WooCommerce" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={editing?.is_active ?? true} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} className="rounded" />
                <label className="text-sm text-foreground">Active</label>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => { setDialogOpen(false); setEditing(null); }}>Cancel</Button>
                <Button onClick={handleSave} disabled={uploading}>Save</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => (
          <div key={p.id} className="card-glass overflow-hidden">
            <img src={p.image_url} alt={p.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-foreground truncate">{p.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${p.is_active ? "bg-green-500/10 text-green-600" : "bg-muted text-muted-foreground"}`}>
                  {p.is_active ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{p.description}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => { setEditing(p); setTechInput(p.tech_stack.join(", ")); setDialogOpen(true); }}>
                  <Pencil size={12} /> Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(p.id)} className="text-destructive hover:bg-destructive/10">
                  <Trash2 size={12} /> Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="text-muted-foreground col-span-full text-center py-8">No projects yet.</p>}
      </div>
    </div>
  );
};

export default AdminPortfolio;
