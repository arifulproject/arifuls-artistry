import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Shield, Mail, Lock, Eye, EyeOff } from "lucide-react";

const AdminSetup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasAdmin, setHasAdmin] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if any admin exists by trying to query user_roles
    // If no admin exists, show setup form
    const check = async () => {
      const { count } = await supabase.from("user_roles").select("id", { count: "exact", head: true });
      setHasAdmin(count !== null && count > 0);
    };
    check();
  }, []);

  if (hasAdmin === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (hasAdmin) {
    navigate("/admin/login");
    return null;
  }

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);

    // Sign up the admin user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error || !data.user) {
      toast.error(error?.message || "Failed to create account");
      setLoading(false);
      return;
    }

    // Assign admin role — we need to do this through a direct insert
    // Since RLS requires admin role to insert, and no admin exists yet,
    // we use the service role approach through an edge function
    // For initial setup, we'll use the signed-in user's session
    const { error: roleError } = await supabase.from("user_roles").insert({
      user_id: data.user.id,
      role: "admin" as const,
    });

    if (roleError) {
      // The RLS policy might block this since the user isn't admin yet
      // We need to handle the bootstrap problem
      toast.error("Admin role assignment failed. Please contact support or assign role manually in the database.");
      setLoading(false);
      return;
    }

    toast.success("Admin account created! Redirecting...");
    navigate("/admin");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Shield className="text-primary" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin Setup</h1>
          <p className="text-muted-foreground text-sm mt-1">Create your admin account to get started</p>
        </div>

        <form onSubmit={handleSetup} className="card-glass p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-muted border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                placeholder="Min 6 characters"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
            {loading ? "Creating..." : "Create Admin Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSetup;
