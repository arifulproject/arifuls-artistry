import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type FAQ = Tables<"faqs">;

const AdminFaqs = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [editing, setEditing] = useState<Partial<FAQ> | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetch = async () => {
    const { data } = await supabase.from("faqs").select("*").order("sort_order");
    if (data) setFaqs(data);
  };

  useEffect(() => { fetch(); }, []);

  const handleSave = async () => {
    if (!editing?.question || !editing?.answer) { toast.error("Both fields required"); return; }
    if (editing.id) {
      await supabase.from("faqs").update({ question: editing.question, answer: editing.answer, is_active: editing.is_active ?? true }).eq("id", editing.id);
      toast.success("FAQ updated");
    } else {
      await supabase.from("faqs").insert({ question: editing.question, answer: editing.answer, sort_order: faqs.length });
      toast.success("FAQ added");
    }
    setDialogOpen(false); setEditing(null); fetch();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    await supabase.from("faqs").delete().eq("id", id);
    toast.success("FAQ deleted"); fetch();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">FAQs</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditing({})}><Plus size={16} /> Add FAQ</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>{editing?.id ? "Edit FAQ" : "Add FAQ"}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Question</label>
                <input value={editing?.question || ""} onChange={(e) => setEditing({ ...editing, question: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Answer</label>
                <textarea value={editing?.answer || ""} onChange={(e) => setEditing({ ...editing, answer: e.target.value })}
                  rows={4} className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50 resize-none" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={editing?.is_active ?? true} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} className="rounded" />
                <label className="text-sm text-foreground">Active</label>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => { setDialogOpen(false); setEditing(null); }}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-2">
        {faqs.map((faq) => (
          <div key={faq.id} className="card-glass p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="font-medium text-foreground">{faq.question}</p>
                <p className="text-sm text-muted-foreground mt-1">{faq.answer}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => { setEditing(faq); setDialogOpen(true); }}><Pencil size={12} /></Button>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleDelete(faq.id)}><Trash2 size={12} className="text-destructive" /></Button>
              </div>
            </div>
          </div>
        ))}
        {faqs.length === 0 && <p className="text-muted-foreground text-center py-8">No FAQs yet.</p>}
      </div>
    </div>
  );
};

export default AdminFaqs;
