import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Calendar } from "lucide-react";

const posts = [
  { title: "How to Optimize WordPress for Core Web Vitals in 2025", excerpt: "A comprehensive guide to achieving perfect performance scores on your WordPress site.", date: "Feb 20, 2025", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop", tag: "Performance" },
  { title: "Building Custom WordPress Plugins: A Developer's Guide", excerpt: "Learn the best practices for developing maintainable and secure WordPress plugins.", date: "Jan 15, 2025", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop", tag: "Development" },
  { title: "Advanced SEO Techniques for WordPress Websites", excerpt: "Go beyond basics with technical SEO strategies that actually move the needle.", date: "Dec 10, 2024", image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=400&fit=crop", tag: "SEO" },
];

const BlogSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

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
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card-glass overflow-hidden group hover-lift cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-video">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <span className="absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full bg-primary/20 text-primary backdrop-blur-sm font-mono">
                  {post.tag}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Calendar size={12} /> {post.date}
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
