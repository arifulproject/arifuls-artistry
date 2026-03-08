import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Service = Tables<"services">;

const iconOptions = ["Globe", "Puzzle", "ShoppingCart", "GraduationCap", "Building", "Home", "Mic", "Palette", "Zap", "Code2", "Wrench", "Database", "Shield", "Smartphone"];
const spanOptions = ["col-span-1", "col-span-1 md:col-span-2"];

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Partial<Service> | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchServices = async () => {
    const { data } = await supabase.from("services").select("*").order("sort_order");
    if (data) setServices(data);
  };

  useEffect(() => { fetchServices(); }, []);

  const handleSave = async () => {
    if (!editing?.title || !editing?.description) {
      toast.error("Title and description are required");
      return;
    }
    if (editing.id) {
      const { error } = await supabase.from("services").update({
        title: editing.title,
        description: editing.description,
        icon: editing.icon || "Globe",
        span: editing.span || "col-span-1",
        is_active: editing.is_active ?? true,
        sort_order: editing.sort_order ?? 0,
      }).eq("id", editing.id);
      if (error) toast.error(error.message);
      else toast.success("Service updated");
    } else {
      const { error } = await supabase.from("services").insert({
        title: editing.title,
        description: editing.description,
        icon: editing.icon || "Globe",
        span: editing.span || "col-span-1",
        sort_order: services.length,
      });
      if (error) toast.error(error.message);
      else toast.success("Service added");
    }
    setDialogOpen(false);
    setEditing(null);
    fetchServices();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    await supabase.from("services").delete().eq("id", id);
    toast.success("Service deleted");
    fetchServices();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Services</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditing({})}>
              <Plus size={16} /> Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editing?.id ? "Edit Service" : "Add Service"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Title</label>
                <input
                  value={editing?.title || ""}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Description</label>
                <textarea
                  value={editing?.description || ""}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50 resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">Icon</label>
                  <select
                    value={editing?.icon || "Globe"}
                    onChange={(e) => setEditing({ ...editing, icon: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50"
                  >
                    {iconOptions.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">Span</label>
                  <select
                    value={editing?.span || "col-span-1"}
                    onChange={(e) => setEditing({ ...editing, span: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-muted border border-border/30 text-foreground focus:outline-none focus:border-primary/50"
                  >
                    {spanOptions.map((s) => <option key={s} value={s}>{s === "col-span-1" ? "Normal" : "Wide"}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editing?.is_active ?? true}
                  onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })}
                  className="rounded"
                />
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
        {services.map((service) => (
          <div key={service.id} className="card-glass p-4 flex items-center gap-4">
            <GripVertical className="text-muted-foreground shrink-0" size={16} />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{service.title}</p>
              <p className="text-sm text-muted-foreground truncate">{service.description}</p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${service.is_active ? "bg-green-500/10 text-green-600" : "bg-muted text-muted-foreground"}`}>
              {service.is_active ? "Active" : "Inactive"}
            </span>
            <button onClick={() => { setEditing(service); setDialogOpen(true); }} className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Pencil size={14} className="text-muted-foreground" />
            </button>
            <button onClick={() => handleDelete(service.id)} className="p-2 hover:bg-destructive/10 rounded-lg transition-colors">
              <Trash2 size={14} className="text-destructive" />
            </button>
          </div>
        ))}
        {services.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No services yet. Add your first service.</p>
        )}
      </div>
    </div>
  );
};

export default AdminServices;
