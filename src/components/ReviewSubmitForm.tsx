import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Star, Upload, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const ReviewSubmitForm = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", review_text: "", rating: 5 });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const handlePhotoChange = (file: File) => {
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.review_text.trim()) {
      toast.error("Name and review are required");
      return;
    }
    setSending(true);

    let photo_url: string | null = null;
    if (photoFile) {
      const path = `reviews/${Date.now()}.${photoFile.name.split(".").pop()}`;
      const { error } = await supabase.storage.from("review-photos").upload(path, photoFile);
      if (!error) {
        const { data } = supabase.storage.from("review-photos").getPublicUrl(path);
        photo_url = data.publicUrl;
      }
    }

    const { error } = await supabase.from("reviews").insert({
      name: form.name.trim(),
      role: form.role.trim() || null,
      review_text: form.review_text.trim(),
      rating: form.rating,
      photo_url,
    });

    if (error) {
      toast.error("Failed to submit review");
    } else {
      toast.success("Review submitted! It will appear after approval.");
      setForm({ name: "", role: "", review_text: "", rating: 5 });
      setPhotoFile(null);
      setPhotoPreview(null);
      setOpen(false);
    }
    setSending(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="px-6 py-3 rounded-xl border border-primary/30 text-primary font-medium hover:bg-primary/10 transition-all btn-premium">
          Leave a Review
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Experience</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Your Name *</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              maxLength={100}
              className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Your Role / Company</label>
            <input
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              maxLength={100}
              className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50"
              placeholder="CEO, TechCo"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setForm({ ...form, rating: n })}
                  className="p-1"
                >
                  <Star
                    size={24}
                    className={`transition-colors ${n <= form.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Your Review *</label>
            <textarea
              value={form.review_text}
              onChange={(e) => setForm({ ...form, review_text: e.target.value })}
              required
              rows={4}
              maxLength={500}
              className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50 resize-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Photo (optional)</label>
            {photoPreview ? (
              <div className="relative w-16 h-16">
                <img src={photoPreview} alt="" className="w-16 h-16 rounded-full object-cover" />
                <button
                  type="button"
                  onClick={() => { setPhotoFile(null); setPhotoPreview(null); }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted border border-dashed border-border cursor-pointer hover:border-primary/50">
                <Upload size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Upload photo</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handlePhotoChange(e.target.files[0])} />
              </label>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={sending}>
            {sending ? "Submitting..." : "Submit Review"} <Send size={14} />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewSubmitForm;
