import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";

type Message = Tables<"contact_messages">;

const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = async () => {
    const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    if (data) setMessages(data);
  };

  useEffect(() => { fetchMessages(); }, []);

  const toggleRead = async (msg: Message) => {
    await supabase.from("contact_messages").update({ is_read: !msg.is_read }).eq("id", msg.id);
    fetchMessages();
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await supabase.from("contact_messages").delete().eq("id", id);
    toast.success("Message deleted");
    fetchMessages();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Messages</h1>
      <div className="space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`card-glass p-4 ${!msg.is_read ? "border-primary/30" : ""}`}>
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${!msg.is_read ? "bg-primary/10" : "bg-muted"}`}>
                {msg.is_read ? <MailOpen size={16} className="text-muted-foreground" /> : <Mail size={16} className="text-primary" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className={`font-medium ${!msg.is_read ? "text-foreground" : "text-muted-foreground"}`}>{msg.name}</p>
                  <span className="text-xs text-muted-foreground">{msg.email}</span>
                </div>
                <p className="text-sm text-muted-foreground">{msg.message}</p>
                <p className="text-xs text-muted-foreground mt-2">{new Date(msg.created_at).toLocaleString()}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button variant="outline" size="sm" onClick={() => toggleRead(msg)}>
                  {msg.is_read ? "Unread" : "Read"}
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => deleteMessage(msg.id)}>
                  <Trash2 size={14} className="text-destructive" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        {messages.length === 0 && <p className="text-center text-muted-foreground py-8">No messages yet.</p>}
      </div>
    </div>
  );
};

export default AdminMessages;
