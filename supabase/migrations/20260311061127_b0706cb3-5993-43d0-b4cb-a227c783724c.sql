
-- Drop ALL restrictive policies and recreate as PERMISSIVE

-- about_content
DROP POLICY IF EXISTS "Admins can manage about" ON public.about_content;
DROP POLICY IF EXISTS "Anyone can view about" ON public.about_content;
CREATE POLICY "Admins can manage about" ON public.about_content FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can view about" ON public.about_content FOR SELECT TO anon, authenticated USING (true);

-- blog_posts
DROP POLICY IF EXISTS "Admins can manage posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Anyone can view active posts" ON public.blog_posts;
CREATE POLICY "Admins can manage posts" ON public.blog_posts FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can view active posts" ON public.blog_posts FOR SELECT TO anon, authenticated USING (is_active = true);

-- contact_messages
DROP POLICY IF EXISTS "Admins can manage messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Anyone can submit messages" ON public.contact_messages;
CREATE POLICY "Admins can manage messages" ON public.contact_messages FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can submit messages" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);

-- faqs
DROP POLICY IF EXISTS "Admins can manage faqs" ON public.faqs;
DROP POLICY IF EXISTS "Anyone can view active faqs" ON public.faqs;
CREATE POLICY "Admins can manage faqs" ON public.faqs FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can view active faqs" ON public.faqs FOR SELECT TO anon, authenticated USING (is_active = true);

-- hero_content
DROP POLICY IF EXISTS "Admins can manage hero" ON public.hero_content;
DROP POLICY IF EXISTS "Anyone can view hero" ON public.hero_content;
CREATE POLICY "Admins can manage hero" ON public.hero_content FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can view hero" ON public.hero_content FOR SELECT TO anon, authenticated USING (true);

-- portfolio_projects
DROP POLICY IF EXISTS "Admins can manage projects" ON public.portfolio_projects;
DROP POLICY IF EXISTS "Anyone can view active projects" ON public.portfolio_projects;
CREATE POLICY "Admins can manage projects" ON public.portfolio_projects FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can view active projects" ON public.portfolio_projects FOR SELECT TO anon, authenticated USING (is_active = true);

-- reviews
DROP POLICY IF EXISTS "Admins can manage all reviews" ON public.reviews;
DROP POLICY IF EXISTS "Anyone can submit reviews" ON public.reviews;
DROP POLICY IF EXISTS "Anyone can view approved reviews" ON public.reviews;
CREATE POLICY "Admins can manage all reviews" ON public.reviews FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can submit reviews" ON public.reviews FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can view approved reviews" ON public.reviews FOR SELECT TO anon, authenticated USING (status = 'approved');

-- services
DROP POLICY IF EXISTS "Admins can manage services" ON public.services;
DROP POLICY IF EXISTS "Anyone can view active services" ON public.services;
CREATE POLICY "Admins can manage services" ON public.services FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can view active services" ON public.services FOR SELECT TO anon, authenticated USING (is_active = true);

-- site_settings
DROP POLICY IF EXISTS "Admins can manage settings" ON public.site_settings;
DROP POLICY IF EXISTS "Anyone can view settings" ON public.site_settings;
CREATE POLICY "Admins can manage settings" ON public.site_settings FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can view settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);

-- skills
DROP POLICY IF EXISTS "Admins can manage skills" ON public.skills;
DROP POLICY IF EXISTS "Anyone can view active skills" ON public.skills;
CREATE POLICY "Admins can manage skills" ON public.skills FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can view active skills" ON public.skills FOR SELECT TO anon, authenticated USING (is_active = true);

-- user_roles
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "First admin can self-assign" ON public.user_roles;
DROP POLICY IF EXISTS "Users can read own role" ON public.user_roles;
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "First admin can self-assign" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (is_first_admin_setup() AND user_id = auth.uid() AND role = 'admin'::app_role);
CREATE POLICY "Users can read own role" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
