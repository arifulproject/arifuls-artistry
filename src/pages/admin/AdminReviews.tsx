import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Check, X, Trash2, Star, Clock, CheckCircle, XCircle } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type Review = Tables<"reviews">;

const AdminReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [tab, setTab] = useState("pending");

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

  const filtered = reviews.filter((r) => r.status === tab);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Reviews</h1>

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
