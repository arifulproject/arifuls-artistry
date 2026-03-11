import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const BlogSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("blog_posts").select("*").eq("is_active", true).order("published_at", { ascending: false }).limit(3)
      .then(({ data }) => { if (data) setPosts(data); });
  }, []);

  return (
    <section id="blog" className="section-padding" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">Blog</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Developer <span className="text-gradient">Insights</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card-glass overflow-hidden group hover-lift shine-border cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-video">
                <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                {post.tag && (
                  <span className="absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full bg-primary/20 text-primary backdrop-blur-sm font-mono">
                    {post.tag}
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Calendar size={12} /> {post.published_at ? format(new Date(post.published_at), "MMM d, yyyy") : "Draft"}
                </div>
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
                <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read More <ArrowRight size={14} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
