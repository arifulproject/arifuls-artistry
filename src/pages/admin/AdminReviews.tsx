import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Check, X, Trash2, Star, Clock, CheckCircle, XCircle, Pencil, Upload } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Review = Tables<"reviews">;

const AdminReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [tab, setTab] = useState("pending");
  const [editing, setEditing] = useState<Partial<Review> | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchReviews = async () => {
    const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
    if (data) setReviews(data);
  };

  useEffect(() => { fetchReviews(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("reviews").update({ status }).eq("id", id);
    toast.success(`Review ${status}`);
    fetchReviews();
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Delete this review permanently?")) return;
    await supabase.from("reviews").delete().eq("id", id);
    toast.success("Review deleted");
    fetchReviews();
  };

  const handlePhotoUpload = async (file: File) => {
    setUploading(true);
    const path = `reviews/${Date.now()}.${file.name.split(".").pop()}`;
    const { error } = await supabase.storage.from("review-photos").upload(path, file);
    if (error) { toast.error("Upload failed"); setUploading(false); return; }
    const { data } = supabase.storage.from("review-photos").getPublicUrl(path);
    setEditing({ ...editing, photo_url: data.publicUrl });
    setUploading(false);
  };

  const handleSave = async () => {
    if (!editing?.name || !editing?.review_text) { toast.error("Name and review text required"); return; }
    if (editing.id) {
      await supabase.from("reviews").update({
        name: editing.name, role: editing.role, rating: editing.rating ?? 5,
        review_text: editing.review_text, photo_url: editing.photo_url, status: editing.status ?? "pending",
      }).eq("id", editing.id);
      toast.success("Review updated");
    } else {
      await supabase.from("reviews").insert({
        name: editing.name, role: editing.role, rating: editing.rating ?? 5,
        review_text: editing.review_text, photo_url: editing.photo_url, status: editing.status ?? "approved",
      });
      toast.success("Review added");
    }
    setDialogOpen(false); setEditing(null); fetchReviews();
  };

  const filtered = reviews.filter((r) => r.status === tab);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Reviews</h1>
        <Button onClick={() => { setEditing({}); setDialogOpen(true); }}>
          <Star size={16} /> Add Review
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing?.id ? "Edit Review" : "Add Review"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Name</label>
              <input value={editing?.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Role / Title</label>
              <input value={editing?.role || ""} onChange={(e) => setEditing({ ...editing, role: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50" placeholder="e.g. CEO at Company" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((r) => (
                  <button key={r} onClick={() => setEditing({ ...editing, rating: r })} className="p-1">
                    <Star size={20} className={r <= (editing?.rating ?? 5) ? "fill-primary text-primary" : "text-muted-foreground"} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Review Text</label>
              <textarea value={editing?.review_text || ""} onChange={(e) => setEditing({ ...editing, review_text: e.target.value })}
                rows={4} className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50 resize-none" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Photo</label>
              {editing?.photo_url && <img src={editing.photo_url} alt="" className="w-16 h-16 rounded-full object-cover mb-2" />}
              <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted border border-dashed border-border cursor-pointer hover:border-primary/50">
                <Upload size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{uploading ? "Uploading..." : "Upload photo"}</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handlePhotoUpload(e.target.files[0])} />
              </label>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Status</label>
              <select value={editing?.status || "pending"} onChange={(e) => setEditing({ ...editing, status: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50">
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => { setDialogOpen(false); setEditing(null); }}>Cancel</Button>
              <Button onClick={handleSave} disabled={uploading}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="pending" className="gap-1">
            <Clock size={14} /> Pending ({reviews.filter((r) => r.status === "pending").length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="gap-1">
            <CheckCircle size={14} /> Approved ({reviews.filter((r) => r.status === "approved").length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="gap-1">
            <XCircle size={14} /> Rejected ({reviews.filter((r) => r.status === "rejected").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={tab}>
          <div className="space-y-3">
            {filtered.map((review) => (
              <div key={review.id} className="card-glass p-4">
                <div className="flex items-start gap-4">
                  {review.photo_url ? (
                    <img src={review.photo_url} alt={review.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <span className="text-lg font-bold text-muted-foreground">{review.name[0]}</span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-foreground">{review.name}</p>
                      {review.role && <span className="text-xs text-muted-foreground">• {review.role}</span>}
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="fill-primary text-primary" size={12} />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{review.review_text}</p>
                    <p className="text-xs text-muted-foreground mt-2">{new Date(review.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    {review.status !== "approved" && (
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateStatus(review.id, "approved")}>
                        <Check size={14} className="text-green-600" />
                      </Button>
                    )}
                    {review.status !== "rejected" && (
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateStatus(review.id, "rejected")}>
                        <X size={14} className="text-orange-500" />
                      </Button>
                    )}
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => { setEditing(review); setDialogOpen(true); }}>
                      <Pencil size={14} />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => deleteReview(review.id)}>
                      <Trash2 size={14} className="text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No {tab} reviews.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminReviews;
