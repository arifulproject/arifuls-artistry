import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FolderOpen, Wrench, Star, MessageSquare, Newspaper, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface Stats {
  services: number;
  projects: number;
  reviews: number;
  pendingReviews: number;
  messages: number;
  unreadMessages: number;
  blogPosts: number;
  faqs: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({ services: 0, projects: 0, reviews: 0, pendingReviews: 0, messages: 0, unreadMessages: 0, blogPosts: 0, faqs: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [services, projects, reviews, pendingReviews, messages, unreadMessages, blogPosts, faqs] = await Promise.all([
        supabase.from("services").select("id", { count: "exact", head: true }),
        supabase.from("portfolio_projects").select("id", { count: "exact", head: true }),
        supabase.from("reviews").select("id", { count: "exact", head: true }),
        supabase.from("reviews").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("is_read", false),
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("faqs").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        services: services.count ?? 0,
        projects: projects.count ?? 0,
        reviews: reviews.count ?? 0,
        pendingReviews: pendingReviews.count ?? 0,
        messages: messages.count ?? 0,
        unreadMessages: unreadMessages.count ?? 0,
        blogPosts: blogPosts.count ?? 0,
        faqs: faqs.count ?? 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Services", value: stats.services, icon: Wrench, link: "/admin/services", color: "text-blue-500" },
    { label: "Projects", value: stats.projects, icon: FolderOpen, link: "/admin/portfolio", color: "text-green-500" },
    { label: "Reviews", value: stats.reviews, badge: stats.pendingReviews > 0 ? `${stats.pendingReviews} pending` : undefined, icon: Star, link: "/admin/reviews", color: "text-yellow-500" },
    { label: "Messages", value: stats.messages, badge: stats.unreadMessages > 0 ? `${stats.unreadMessages} unread` : undefined, icon: MessageSquare, link: "/admin/messages", color: "text-purple-500" },
    { label: "Blog Posts", value: stats.blogPosts, icon: Newspaper, link: "/admin/blog", color: "text-pink-500" },
    { label: "FAQs", value: stats.faqs, icon: HelpCircle, link: "/admin/faqs", color: "text-orange-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.link}
            className="card-glass p-6 hover:border-primary/30 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <card.icon className={`${card.color} group-hover:scale-110 transition-transform`} size={24} />
              {card.badge && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-destructive/10 text-destructive font-medium">
                  {card.badge}
                </span>
              )}
            </div>
            <p className="text-3xl font-bold text-foreground">{card.value}</p>
            <p className="text-sm text-muted-foreground">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
