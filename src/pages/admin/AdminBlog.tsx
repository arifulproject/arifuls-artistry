import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Upload } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Post = Tables<"blog_posts">;

const AdminBlog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Partial<Post> | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetch = async () => {
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    if (data) setPosts(data);
  };

  useEffect(() => { fetch(); }, []);

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    const path = `blog/${Date.now()}.${file.name.split(".").pop()}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) { toast.error("Upload failed"); setUploading(false); return; }
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    setEditing({ ...editing, image_url: data.publicUrl });
    setUploading(false);
  };

  const handleSave = async () => {
    if (!editing?.title || !editing?.excerpt) { toast.error("Title and excerpt required"); return; }
    if (editing.id) {
      await supabase.from("blog_posts").update({
        title: editing.title, excerpt: editing.excerpt, image_url: editing.image_url,
        tag: editing.tag, is_active: editing.is_active ?? true,
      }).eq("id", editing.id);
      toast.success("Post updated");
    } else {
      await supabase.from("blog_posts").insert({
        title: editing.title, excerpt: editing.excerpt, image_url: editing.image_url,
        tag: editing.tag, published_at: new Date().toISOString(),
      });
      toast.success("Post added");
    }
    setDialogOpen(false); setEditing(null); fetch();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    toast.success("Post deleted"); fetch();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Blog Posts</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditing({})}><Plus size={16} /> Add Post</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing?.id ? "Edit Post" : "Add Post"}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Title</label>
                <input value={editing?.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Excerpt</label>
                <textarea value={editing?.excerpt || ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                  rows={3} className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50 resize-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Tag</label>
                <input value={editing?.tag || ""} onChange={(e) => setEditing({ ...editing, tag: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50" placeholder="e.g. Performance" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Image</label>
                {editing?.image_url && <img src={editing.image_url} alt="" className="w-full h-32 object-cover rounded-lg mb-2" />}
                <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted border border-dashed border-border cursor-pointer hover:border-primary/50">
                  <Upload size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{uploading ? "Uploading..." : "Upload image"}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} />
                </label>
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

      <div className="space-y-3">
        {posts.map((p) => (
          <div key={p.id} className="card-glass p-4 flex items-center gap-4">
            {p.image_url && <img src={p.image_url} alt="" className="w-16 h-12 rounded object-cover shrink-0" />}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{p.title}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {p.tag && <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary">{p.tag}</span>}
                <span>{new Date(p.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => { setEditing(p); setDialogOpen(true); }}><Pencil size={12} /></Button>
            <Button variant="outline" size="sm" onClick={() => handleDelete(p.id)} className="text-destructive"><Trash2 size={12} /></Button>
          </div>
        ))}
        {posts.length === 0 && <p className="text-muted-foreground text-center py-8">No blog posts yet.</p>}
      </div>
    </div>
  );
};

export default AdminBlog;
